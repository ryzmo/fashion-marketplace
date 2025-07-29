// pages/api/cart/index.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, productId, size, color, quantity, price } = req.body;

    if (!userId || !productId || !size || !color || !quantity || !price) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }

    try {
      const existing = await prisma.cartItem.findFirst({
        where: {
          userId: parseInt(userId),
          productId: parseInt(productId),
          size: size,
          color: color,
        },
      });

      if (existing) {
        // Jika sudah ada item dengan ukuran sama, update quantity
        const updated = await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + parseInt(quantity) },
        });
        return res.status(200).json(updated);
      }

      // Jika belum ada, buat baru
      const newItem = await prisma.cartItem.create({
        data: {
          userId: parseInt(userId),
          productId: parseInt(productId),
          size: size,
          color: color,
          quantity: parseInt(quantity),
          price: parseInt(price),
        },
      });

      return res.status(201).json(newItem);
    } catch (error) {
      console.error('Gagal tambah ke keranjang:', error);
      return res.status(500).json({ error: 'Gagal tambah ke keranjang' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
