import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const products = await prisma.product.findMany({
      orderBy: { purchaseCount: 'desc' },
      take: 10,
      include: {
        variants: true, // ✅ Tambahkan ini untuk menyertakan harga
      },
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
