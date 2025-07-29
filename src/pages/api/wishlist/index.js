import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId, productId } = req.body;

  if (req.method === 'POST') {
    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId dan productId wajib diisi' });
    }

    try {
      const existing = await prisma.wishlistItem.findFirst({
        where: { userId: parseInt(userId), productId: parseInt(productId) },
      });

      if (existing) {
        return res.status(200).json({ message: 'Produk sudah di wishlist' });
      }

      const newItem = await prisma.wishlistItem.create({
        data: {
          userId: parseInt(userId),
          productId: parseInt(productId),
        },
      });

      return res.status(201).json(newItem);
    } catch (err) {
      console.error('Gagal tambah wishlist:', err);
      return res.status(500).json({ error: 'Gagal menambahkan ke wishlist' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
