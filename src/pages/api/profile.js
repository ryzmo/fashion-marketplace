import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie'; // ✔ named import

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export default async function handler(req, res) {
  try {
    const cookies = req.headers.cookie || '';
    const { token } = parse(cookies);

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Unauthorized - Token missing or invalid' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error('JWT Error:', err);
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, phone: true, address: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
