import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = req.query.userId || req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId dibutuhkan' });
  }

  if (req.method === 'GET') {
    const messages = await prisma.chatMessage.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'asc' },
    });
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { sender, message } = req.body;

    if (!message || !sender) {
      return res.status(400).json({ error: 'Isi pesan tidak valid' });
    }

    const newMessage = await prisma.chatMessage.create({
      data: { sender, message, userId: parseInt(userId) },
    });

    return res.status(201).json(newMessage);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
