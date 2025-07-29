// /pages/api/chat/unread-count.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'userId diperlukan' });

  try {
    const unread = await prisma.chatMessage.findFirst({
      where: {
        userId: parseInt(userId),
        sender: 'admin',
        read: false,
      },
    });

    return res.status(200).json({ hasNewMessage: !!unread });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
