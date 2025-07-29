// File: pages/api/user/change-password.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end('Method Not Allowed');

  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    return res.status(200).json({ message: 'Password berhasil diganti' });
  } catch (err) {
    console.error('Gagal ganti password:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengganti password' });
  }
}
