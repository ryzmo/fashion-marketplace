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
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { fields, files } = await parseForm(req);
      console.log('✏️ Update Fields:', fields);
      console.log('🖼️ Update Files:', Object.keys(files));
  
      const id = parseInt(req.query.id);
  
      const oldProduct = await prisma.product.findUnique({
  where: { id },
  include: {
    variants: true,
    categories: true,
  },
});

  
      if (!oldProduct) {
        return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
      }
  
      // --- 🚀 Handle Gambar Produk ---
      const imageUrls = oldProduct.imageUrls ? [...oldProduct.imageUrls] : [];
  
      for (let i = 1; i <= 5; i++) {
        const fileKey = `image${i}`;
        const file = files[fileKey];
        const currentFile = Array.isArray(file) ? file[0] : file;
  
        if (currentFile && currentFile.size > 0) {
          const uploadResult = await cloudinary.uploader.upload(currentFile.filepath, {
            folder: 'liiystore-products',
          });
          imageUrls[i - 1] = {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          };
        }
      }
  
      // --- 🚀 Handle Ulasan ---
      const updatedReviews = [];
      for (let i = 0; fields[`ulasan[${i}][nama]`]; i++) {
        const nama = fields[`ulasan[${i}][nama]`];
        const isi = fields[`ulasan[${i}][isi]`];
        const gambar = [];
  
        for (let j = 1; j <= 3; j++) {
          const fileKey = `ulasan[${i}][gambar${j}]`;
          const file = files[fileKey];
          const currentFile = Array.isArray(file) ? file[0] : file;
  
          if (currentFile && currentFile.size > 0) {
            const result = await cloudinary.uploader.upload(currentFile.filepath, {
              folder: 'liiystore-reviews',
            });
            gambar.push({ url: result.secure_url, public_id: result.public_id });
          } else {
            // 🔥 Pakai gambar lama kalau tidak upload baru
            const oldReview = oldProduct.reviews?.[i];
            if (oldReview && oldReview.gambar?.[j - 1]) {
              gambar.push(oldReview.gambar[j - 1]);
            } else {
              gambar.push({});
            }
          }
        }
  
        updatedReviews.push({ nama, isi, gambar });
      }
  
      // Kalau admin tidak edit ulasan sama sekali, pakai review lama
      const finalReviews = updatedReviews.length > 0
  ? updatedReviews
  : Array.isArray(oldProduct.reviews)
    ? oldProduct.reviews
    : [];


  
      // --- 🚀 Siapkan Data Update ---
      const name = fields.name?.toString().trim();
      const price = parseInt(fields.price);
      const discountPrice = fields.discountPrice ? parseInt(fields.discountPrice) : null;
      const stock = parseInt(fields.stock);
      const size = fields.size?.toString().trim();
      const description = fields.description?.toString().trim();
      const rating = parseInt(fields.rating) || 0;
      const isSale = Array.isArray(fields.isSale)
        ? fields.isSale[0] === 'true'
        : fields.isSale === 'true';
      const purchaseCount = parseInt(fields.purchaseCount) || 0;
  
      const rawCategory = fields.category;
      const categoryArray = typeof rawCategory === 'string'
        ? rawCategory.split(',').map((c) => c.trim()).filter(Boolean)
        : Array.isArray(rawCategory)
          ? rawCategory.flatMap((c) => c.split(',').map((x) => x.trim()))
          : [];

      // --- 🚀 Handle Variants ---
let variantsRaw = [];
try {
  variantsRaw = JSON.parse(fields.variants || '[]');
  console.log(`🎨 Jumlah varian (PUT): ${variantsRaw.length}`);
} catch (err) {
  console.warn('⚠️ Gagal parse fields.variants:', fields.variants);
}

const variantList = [];
for (const [i, variant] of variantsRaw.entries()) {
  const { color, size, price, discountPrice, stock, sku, imageIndex } = variant;

  if (!color || !size || price == null || stock == null || imageIndex == null) {
    console.warn(`⚠️ Varian ${i} tidak lengkap:`, variant);
    continue;
  }

  const variantFile = files[`variantImage_${imageIndex}`];
  const fileToUpload = Array.isArray(variantFile) ? variantFile[0] : variantFile;

  const oldVariant = oldProduct.variants?.find((v) => v.sku === sku);
let uploadedImage = null;

if (fileToUpload?.size > 0) {
  try {
    const result = await cloudinary.uploader.upload(fileToUpload.filepath, {
      folder: 'liiystore-variants',
    });
    uploadedImage = { url: result.secure_url, public_id: result.public_id };
  } catch (err) {
    console.error(`❌ Gagal upload varian ${i}:`, err);
  }
} else if (oldVariant?.imageUrls?.[0]) {
  uploadedImage = oldVariant.imageUrls[0];
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

  variantList.push(variantData);
}

// 🔁 Hapus semua varian lama
await prisma.productVariant.deleteMany({
  where: { productId: id },
});

// 💾 Simpan ulang varian baru
for (const [i, variant] of variantList.entries()) {
  await prisma.productVariant.create({
    data: { ...variant, productId: id },
  });
  console.log(`✅ Varian ${i} berhasil diperbarui`);
}

// 🔢 Hitung ulang harga dan stok
const minPrice = Math.min(...variantList.map(v => v.price));
const totalStock = variantList.reduce((sum, v) => sum + (v.stock || 0), 0);

  
      const updateData = {
  name,
  description,
  rating,
  isSale,
  purchaseCount,
  imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
  price: minPrice,
  stock: totalStock,
  reviews: Array.isArray(finalReviews) ? finalReviews : [],
  categories: {
    set: [],
    connectOrCreate: categoryArray.map((cat) => ({
      where: { name: cat },
      create: { name: cat },
    })),
  },
};


  
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: updateData,
        include: { categories: true },
      });
  
      return res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error('PUT /api/products/[id] error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  
  

  // 🛡️ Yang lain masih GET, DELETE sama kaya sebelumnya
  if (req.method === 'GET') {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: true,
        variants: true, // ✅ sudah benar
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    console.log('🔎 GET Produk:', {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      discountPrice: product?.discountPrice,
      stock: product?.stock,
      variants: product?.variants?.map(v => ({
        id: v.id,
        color: v.color,
        size: v.size,
        price: v.price,
        discountPrice: v.discountPrice,
        stock: v.stock,
      })),
    });

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


  if (req.method === 'DELETE') {
  try {
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return res.status(400).json({ success: false, message: 'ID produk tidak valid' });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    // 🧹 1. Hapus semua gambar utama dari Cloudinary
    if (Array.isArray(product.imageUrls)) {
      for (const img of product.imageUrls) {
        if (img?.public_id) {
          await cloudinary.uploader.destroy(img.public_id).catch(console.warn);
        }
      }
    }

    // 🧹 2. Hapus gambar ulasan (jika ada)
    if (Array.isArray(product.reviews)) {
      for (const review of product.reviews) {
        if (Array.isArray(review.gambar)) {
          for (const g of review.gambar) {
            if (g?.public_id) {
              await cloudinary.uploader.destroy(g.public_id).catch(console.warn);
            }
          }
        }
      }
    }

    // 🧹 3. Hapus gambar varian
    for (const variant of product.variants) {
      if (Array.isArray(variant.imageUrls)) {
        for (const img of variant.imageUrls) {
          if (img?.public_id) {
            await cloudinary.uploader.destroy(img.public_id).catch(console.warn);
          }
        }
      }
    }

    // 🧼 4. Kosongkan relasi sebelum hapus
    await prisma.product.update({
      where: { id: productId },
      data: {
        categories: { set: [] },
        cartItems: { deleteMany: {} },
        wishlistItems: { deleteMany: {} },
        orderItems: { deleteMany: {} },
        variants: { deleteMany: {} },
        reviews: [],
      },
    });

    // 🗑️ 5. Hapus produk utama
    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({ success: true, message: 'Produk berhasil dihapus.' });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menghapus produk.' });
  }
}


  return res.status(405).json({ message: 'Method not allowed' });
}
