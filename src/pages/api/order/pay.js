// /pages/api/order/pay.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { orderId, userId } = req.body;

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });
    if (order.status === 'Dibayar') return res.status(400).json({ message: 'Pesanan sudah dibayar' });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user.walletBalance < order.total) {
      return res.status(400).json({ message: 'Saldo tidak cukup' });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          walletBalance: { decrement: order.total },
        },
      }),
      prisma.walletTransaction.create({
        data: {
          userId,
          amount: -order.total,
          orderId: `ORDER-${orderId}`,
          status: 'Dibayar',
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'Dibayar',
          createdAt: new Date(), // 🔁 Update waktu
        },
      }),
    ]);

    return res.status(200).json({ message: 'Pembayaran berhasil' });
  } catch (err) {
    console.error('❌ Error bayar:', err);
    return res.status(500).json({ message: 'Gagal memproses pembayaran' });
  }
}
