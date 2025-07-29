import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { verifyUser } from '../../../../lib/auth'; // path disesuaikan

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = verifyUser(req);
  if (!user?.id) return res.status(401).json({ message: 'Unauthorized (no token or invalid)' });

  const { password, newPin } = req.body;

  if (!password || !newPin || newPin.length !== 6) {
    return res.status(400).json({ message: 'Password dan PIN baru wajib diisi, PIN harus 6 digit' });
  }

  try {
    const foundUser = await prisma.user.findUnique({ where: { id: user.id } });
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { pin: newPin },
    });

    return res.status(200).json({ message: 'PIN berhasil diubah' });
  } catch (err) {
    console.error('Gagal update PIN:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}
