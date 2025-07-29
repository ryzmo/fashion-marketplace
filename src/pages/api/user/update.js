import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end('Method Not Allowed');

  const { userId, name, phone, address, birthdate } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { name, phone, address, birthdate },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal update profil' });
  }
}