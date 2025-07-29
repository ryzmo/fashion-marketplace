import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { password, token } = req.body;
  if (!password || !token) return res.status(400).json({ message: 'Password dan token wajib diisi' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: 'Password berhasil direset' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    return res.status(400).json({ message: 'Token tidak valid atau kadaluarsa' });
  }
}
