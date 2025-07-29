import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('🔍 GET /api/products');
      const { category } = req.query;

      const products = await prisma.product.findMany({
  where: category
    ? {
        categories: {
          some: { name: { equals: category, mode: 'insensitive' } },
        },
      }
    : undefined,
  include: {
    categories: true,
    variants: true, // ✅ tambahkan ini agar data varian ikut dikirim ke FE
  },
  orderBy: { createdAt: 'desc' },
});


      console.log(`✅ ${products.length} produk ditemukan`);
      return res.status(200).json({ products });
    } catch (error) {
      console.error('❌ Error GET /api/products:', error);
      return res.status(500).json({ message: 'Gagal mengambil produk' });
    }
  }

  if (req.method === 'POST') {
    try {
      console.log('📦 Mulai parse form...');
      const { fields, files } = await parseForm(req);
      console.log('✅ Form parsed:', Object.keys(fields));

      const name = fields.name?.toString().trim();
      const description = fields.description?.toString().trim();
      const rating = parseInt(fields.rating) || 0;
      const isSale = fields.isSale === 'true';
      const purchaseCount = parseInt(fields.purchaseCount) || 0;

      if (!name || !description) {
        console.warn('⚠️ Nama atau deskripsi tidak ditemukan');
        return res.status(400).json({
          success: false,
          message: 'Field wajib: nama dan deskripsi harus diisi.',
        });
      }

      console.log(`📝 Nama: ${name}, Rating: ${rating}, isSale: ${isSale}`);

      const rawCategory = fields.category;
      const categoryArray = typeof rawCategory === 'string'
        ? rawCategory.split(',').map(c => c.trim()).filter(Boolean)
        : [];
      console.log('📂 Kategori:', categoryArray);

      const imageUrls = [];
      for (let i = 1; i <= 5; i++) {
        const file = files[`image${i}`];
        const currentFile = Array.isArray(file) ? file[0] : file;
        if (currentFile?.size > 0) {
          try {
            console.log(`📤 Upload gambar utama ${i}`);
            const result = await cloudinary.uploader.upload(currentFile.filepath, {
              folder: 'liiystore-products',
            });
            imageUrls.push({ url: result.secure_url, public_id: result.public_id });
            console.log(`✅ Gambar utama ${i} diunggah`);
          } catch (err) {
            console.error(`❌ Gagal upload image${i}:`, err);
          }
        }
      }

      if (imageUrls.length === 0) {
        console.warn('⚠️ Tidak ada gambar utama yang berhasil diunggah');
        return res.status(400).json({
          success: false,
          message: 'Minimal 1 gambar produk harus diunggah.',
        });
      }

      const rawUlasan = [];
      for (let i = 0; fields[`ulasan[${i}][nama]`]; i++) {
        const nama = fields[`ulasan[${i}][nama]`];
        const isi = fields[`ulasan[${i}][isi]`];
        const gambar = [];

        for (let j = 1; j <= 3; j++) {
          const file = files[`ulasan[${i}][gambar${j}]`];
          const currentFile = Array.isArray(file) ? file[0] : file;
          if (currentFile?.size > 0) {
            try {
              const result = await cloudinary.uploader.upload(currentFile.filepath, {
                folder: 'liiystore-reviews',
              });
              gambar.push({ url: result.secure_url, public_id: result.public_id });
            } catch (err) {
              console.error(`❌ Gagal upload gambar ulasan ${i}-${j}:`, err);
            }
          }
        }

        rawUlasan.push({ nama, isi, gambar });
        console.log(`🧾 Ulasan ke-${i} ditambahkan: ${nama}`);
      }

      let variantsRaw = [];
      try {
        variantsRaw = JSON.parse(fields.variants || '[]');
        console.log(`🎨 Jumlah varian: ${variantsRaw.length}`);
      } catch (err) {
        console.warn('⚠️ Gagal parse fields.variants:', fields.variants);
        return res.status(400).json({
          success: false,
          message: 'Format varian tidak valid.',
        });
      }

      const variantList = [];
      for (const [i, variant] of variantsRaw.entries()) {
        const { color, size, price, discountPrice, stock, sku, imageIndex } = variant;

        if (!color || !size || price == null || stock == null || imageIndex == null) {
          console.warn(`⚠️ Varian ${i} tidak lengkap:`, variant);
          continue;
        }

        console.log(`📦 Proses varian ${i}: ${color} - ${size}`);
        const variantFile = files[`variantImage_${imageIndex}`];
        const fileToUpload = Array.isArray(variantFile) ? variantFile[0] : variantFile;

        let uploadedImage = null;
        if (fileToUpload?.size > 0) {
          try {
            const result = await cloudinary.uploader.upload(fileToUpload.filepath, {
              folder: 'liiystore-variants',
            });
            uploadedImage = { url: result.secure_url, public_id: result.public_id };
            console.log(`✅ Gambar varian ${i} diunggah`);
          } catch (err) {
            console.error(`❌ Gagal upload varian ${i}:`, err);
          }
        }

        const variantData = {
          color,
          size,
          price: parseInt(price),
          discountPrice: discountPrice ? parseInt(discountPrice) : null,
          stock: parseInt(stock),
          sku,
          imageUrls: uploadedImage ? [uploadedImage] : [],
          variantName: `${color} - ${size}`,
        };

        console.log(`🧩 Data varian ${i} yang disimpan:`, variantData);
        variantList.push(variantData);
      }

      if (variantList.length === 0) {
        console.error('❌ Semua varian gagal diproses');
        return res.status(400).json({ success: false, message: 'Varian tidak valid' });
      }

      const minPrice = Math.min(...variantList.map(v => v.price));
      const totalStock = variantList.reduce((sum, v) => sum + (v.stock || 0), 0);
      console.log(`💰 Harga minimum: ${minPrice}, Total stok: ${totalStock}`);

      console.log('📦 Data produk yang dikirim ke DB:', {
        name, description, rating, isSale, purchaseCount, imageUrls, minPrice, totalStock, ulasan: rawUlasan.length
      });

      const createdProduct = await prisma.product.create({
        data: {
          name,
          description,
          rating,
          isSale,
          purchaseCount,
          imageUrls,
          price: minPrice,
          stock: totalStock,
          reviews: rawUlasan,
        },
      });
      console.log(`📌 Produk dibuat: ID ${createdProduct.id}`);

      if (categoryArray.length > 0) {
        await prisma.product.update({
          where: { id: createdProduct.id },
          data: {
            categories: {
              connectOrCreate: categoryArray.map(cat => ({
                where: { name: cat },
                create: { name: cat },
              })),
            },
          },
        });
        console.log('🏷️ Kategori berhasil dikaitkan');
      }

      for (const [i, variant] of variantList.entries()) {
        await prisma.productVariant.create({
          data: { ...variant, productId: createdProduct.id },
        });
        console.log(`✅ Varian ${i} berhasil disimpan`);
      }

      console.log('🎯 Response akan dikirim ke client:', {
        success: true,
        productId: createdProduct.id,
        variantCount: variantList.length,
      });

      return res.status(200).json({ success: true, product: createdProduct });
    } catch (error) {
      console.error('❌ POST /api/products failed:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat upload produk',
        error: error.message,
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
