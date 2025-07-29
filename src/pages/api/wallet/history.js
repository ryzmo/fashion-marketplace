import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const history = await prisma.walletTransaction.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal ambil riwayat' });
  }
}
