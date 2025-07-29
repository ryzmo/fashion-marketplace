import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, password } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ message: 'Semua field wajib diisi' });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashed = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: 'admin',
      },
    });

    // ✅ Hanya buat token kalau user berhasil dibuat
    const token = jwt.sign(
      { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/',
      })
    );

    return res.status(201).json({ success: true, role: newAdmin.role });
  } catch (err) {
    console.error('Register Admin Error:', err);
    return res.status(500).json({ message: 'Gagal mendaftarkan admin' });
  }
}
