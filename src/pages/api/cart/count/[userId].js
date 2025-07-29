// pages/api/cart/count/[userId].js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const count = await prisma.cartItem.aggregate({
      where: { userId: parseInt(userId) },
      _sum: { quantity: true },
    });

    return res.status(200).json({ count: count._sum.quantity || 0 });
  } catch (error) {
    console.error('Gagal hitung item keranjang:', error);
    return res.status(500).json({ error: 'Gagal hitung item keranjang' });
  }
}
