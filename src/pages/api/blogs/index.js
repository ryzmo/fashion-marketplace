// /pages/api/blogs/index.js

import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import slugify from 'slugify';

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
    const form = new IncomingForm({
        multiples: true,
        keepExtensions: true,
        allowEmptyFiles: true,
        minFileSize: 0,    // ⬅️ Tambahkan ini
      });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);
      const title = fields.title?.toString().trim();
const summary = fields.summary?.toString().trim();
const content = fields.content?.toString().trim();
const date = fields.date?.toString().trim();


      if (!title || !summary || !date || !content) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
      }

      const slug = slugify(title, { lower: true });

      // Upload gambar utama
      const mainImage = Array.isArray(files.mainImage) ? files.mainImage[0] : files.mainImage;

if (!mainImage || mainImage.size === 0) {
  return res.status(400).json({ message: 'Gambar utama tidak boleh kosong' });
}

const mainResult = await cloudinary.uploader.upload(mainImage.filepath, {
  folder: 'liiystore-blogs',
});


      // Upload gambar tambahan (maks 3)
      const otherImages = [];
      for (let i = 1; i <= 3; i++) {
        const imgFile = files[`otherImage${i}`];
        const file = Array.isArray(imgFile) ? imgFile[0] : imgFile;

        if (file && file.size > 0) {
            const uploaded = await cloudinary.uploader.upload(file.filepath, {
              folder: 'liiystore-blogs',
            });
            otherImages.push(uploaded.secure_url);
          }
          
      }

      const newBlog = await prisma.blog.create({
        data: {
          title,
          slug,
          summary,
          content,
          date: new Date(date),
          mainImage: mainResult.secure_url,
          otherImages,
        },
      });

      return res.status(200).json({ success: true, blog: newBlog });
    } catch (error) {
      console.error('POST /api/blogs error:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan saat simpan blog.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(blogs);
    } catch (error) {
      console.error('GET /api/blogs error:', error);
      return res.status(500).json({ message: 'Gagal mengambil data blog.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
