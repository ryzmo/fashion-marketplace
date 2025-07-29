// /pages/api/chat/mark-read.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId diperlukan' });

  try {
    await prisma.chatMessage.updateMany({
      where: {
        userId: parseInt(userId),
        sender: 'admin',
        read: false,
      },
      data: { read: true },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
