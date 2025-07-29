import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('📥 Request diterima ke /api/wallet/verify-pin');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, pin } = req.body;

  // Validasi format
  if (!userId || !pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    return res.status(400).json({ message: 'PIN tidak valid. Harus 6 digit angka.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { pin: true },
    });

    if (!user || !user.pin) {
      return res.status(403).json({ message: 'User atau PIN tidak ditemukan' });
    }

    const match = pin === user.pin;
    console.log('🔍 Verifikasi PIN:', match);

    if (!match) {
      return res.status(401).json({ message: 'PIN salah' });
    }

    return res.status(200).json({ success: true, message: 'PIN cocok' });
  } catch (err) {
    console.error('❌ Error saat verifikasi PIN:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}
