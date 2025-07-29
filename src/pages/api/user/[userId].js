// pages/api/user/[userId].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { userId },
    method,
    body,
  } = req;

  if (!userId) {
    return res.status(400).json({ message: 'userId diperlukan.' });
  }

  switch (method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(userId) },
        });
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });
        return res.status(200).json(user);
      } catch (error) {
        console.error('Gagal fetch user:', error);
        return res.status(500).json({ message: 'Gagal mengambil data user.' });
      }

      case 'PUT':
        try {
          const updated = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
              name: body.name,
              phone: body.phone,
              address: body.address,
              province: body.province, // ← simpan provinsi
              city: body.city          // ← simpan kota
            },
          });
          return res.status(200).json(updated);
        } catch (error) {
          console.error('Gagal update user:', error);
          return res.status(500).json({ message: 'Gagal memperbarui user.' });
        }
      

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
