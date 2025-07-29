import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany({
      where: {
        chatMessages: { some: {} },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetch users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
