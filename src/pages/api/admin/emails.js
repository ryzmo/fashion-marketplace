import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const admins = await prisma.user.findMany({
    where: { role: 'admin' },
    select: { email: true },
  });

  const emails = admins.map((a) => a.email);
  res.status(200).json({ emails });
}
