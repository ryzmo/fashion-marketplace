import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs'; // buat cek apakah file

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);

    const nama = fields.nama?.toString().trim();
    const komentar = fields.komentar?.toString().trim();

    if (!nama || !komentar) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan komentar wajib diisi.',
      });
    }

    const gambar = [];

    for (let i = 1; i <= 3; i++) {
      const fileOrUrl = files[`gambar${i}`];
      const current = Array.isArray(fileOrUrl) ? fileOrUrl[0] : fileOrUrl;

      if (current) {
        const filepath = current.filepath;
        const filename = current.originalFilename;

        if (filepath && fs.existsSync(filepath)) {
          // Kalau ada file di upload folder ➔ upload ke Cloudinary
          const result = await cloudinary.uploader.upload(filepath, {
            folder: 'liiystore-reviews',
          });
          gambar.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        } else if (filename?.startsWith('http')) {
          // Kalau filename adalah URL lama ➔ pakai saja
          gambar.push({
            url: filename,
          });
        }
      }
    }

    // Ambil semua review lama
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    const oldReviews = Array.isArray(product.reviews) ? product.reviews : [];

    const newReview = {
      nama: [nama],
      isi: [komentar],
      gambar,
    };

    let updatedReviews;
    if (oldReviews.length > 0) {
      // Replace ulasan terakhir
      updatedReviews = [...oldReviews];
      updatedReviews[updatedReviews.length - 1] = newReview;
    } else {
      // Ulasan pertama
      updatedReviews = [newReview];
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        reviews: updatedReviews,
      },
    });

    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error('POST /api/product/[id]/review error:', err);
    return res.status(500).json({ success: false, message: 'Gagal menyimpan ulasan', error: err.message });
  }
}
