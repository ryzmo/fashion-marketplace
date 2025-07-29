import { sendOrderNotificationToAdmins } from '../../../lib/mailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { orderId } = req.body;

  try {
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { email: true },
    });

    const adminEmails = admins.map(a => a.email);

    await sendOrderNotificationToAdmins(adminEmails, orderId);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Gagal kirim email admin:', err);
    res.status(500).json({ message: 'Internal error' });
  }
}
