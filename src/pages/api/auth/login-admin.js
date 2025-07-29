import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email dan password wajib diisi' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Akun tidak ditemukan atau bukan admin' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        sameSite: 'lax',
        path: '/',
      })
    );

    return res.status(200).json({ success: true, role: user.role });
  } catch (err) {
    console.error('Login Admin Error:', err);
    return res.status(500).json({ message: 'Login gagal, coba lagi nanti' });
  }
}
