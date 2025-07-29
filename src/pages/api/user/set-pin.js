import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, pin } = req.body;

  if (!userId || !pin || pin.length !== 6) {
    return res.status(400).json({ message: 'Data tidak valid' });
  }

  try {
    const hashedPin = await bcrypt.hash(pin, 10); // 🔒 Enkripsi PIN
    await prisma.user.update({
      where: { id: userId },
      data: { pin: hashedPin },
    });

    return res.status(200).json({ message: 'PIN berhasil diperbarui' });
  } catch (err) {
    console.error('❌ Gagal memperbarui PIN:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan' });
  }
}
