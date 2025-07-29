import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../../../lib/mailer'; // ⬅️ import di sini

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email sudah terdaftar' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Kirim email setelah berhasil registrasi
  try {
    await sendWelcomeEmail(email, name);
  } catch (err) {
    console.error('Gagal kirim email:', err);
  }

  return res.status(201).json({ message: 'Registrasi berhasil', user });
}
