import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: { walletBalance: true },
      });
      if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

      return res.status(200).json({ walletBalance: user.walletBalance });
    } catch (err) {
      console.error('Gagal ambil wallet:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Metode ${req.method} tidak diizinkan`);
  }
}