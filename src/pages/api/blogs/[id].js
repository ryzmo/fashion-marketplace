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
      minFileSize: 0,
    });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { fields, files } = await parseForm(req);
      const title = fields.title?.toString().trim();
      const summary = fields.summary?.toString().trim();
      const content = fields.content?.toString().trim();
      const date = fields.date?.toString().trim();
  
      if (!title || !summary || !content || !date) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
      }
  
      const slug = slugify(title, { lower: true });
  
      // Ambil data blog lama untuk akses gambar existing
      const existingBlog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingBlog) {
        return res.status(404).json({ message: 'Blog tidak ditemukan' });
      }
  
      // Upload gambar utama jika ada
      let mainImageUrl = null;
      const mainImage = Array.isArray(files.mainImage) ? files.mainImage[0] : files.mainImage;
      if (mainImage && mainImage.size > 0) {
        const uploaded = await cloudinary.uploader.upload(mainImage.filepath, {
          folder: 'liiystore-blogs',
        });
        mainImageUrl = uploaded.secure_url;
      }
  
      // Upload gambar tambahan baru (maks 3)
      const newOtherImages = [];
      for (let i = 1; i <= 3; i++) {
        const imgFile = files[`otherImage${i}`];
        const file = Array.isArray(imgFile) ? imgFile[0] : imgFile;
  
        if (file && file.size > 0) {
          const uploaded = await cloudinary.uploader.upload(file.filepath, {
            folder: 'liiystore-blogs',
          });
          newOtherImages.push(uploaded.secure_url);
        }
      }
  
      // Gabungkan gambar lama dan baru (maks total 3)
      const combinedOtherImages = [
        ...(existingBlog.otherImages || []),
        ...newOtherImages,
      ].slice(0, 3); // max 3 gambar
  
      const updated = await prisma.blog.update({
        where: { id: parseInt(id) },
        data: {
          title,
          slug,
          summary,
          content,
          date: new Date(date),
          ...(mainImageUrl && { mainImage: mainImageUrl }),
          otherImages: combinedOtherImages,
        },
      });
  
      return res.status(200).json({ success: true, blog: updated });
    } catch (err) {
      console.error('PUT /api/blogs/[id] error:', err);
      return res.status(500).json({ message: 'Gagal update blog' });
    }
  }
  

  return res.status(405).json({ message: 'Method not allowed' });
}
