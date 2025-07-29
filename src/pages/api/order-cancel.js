// pages/api/order-cancel.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  try {
    const { orderId, reason } = req.body;

    if (!orderId || !reason) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    // Ambil data pesanan
    const existingOrder = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (!existingOrder) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }

    // Jika status paid, kembalikan saldo user
    if (['Dibayar', 'Diterima-Penjual'].includes(existingOrder.status)) {

      await prisma.user.update({
        where: { id: existingOrder.userId },
        data: {
          walletBalance: {
            increment: existingOrder.total,
          },
        },
      });

      // Optional: Tambahkan transaksi pembatalan ke WalletTransaction
      await prisma.walletTransaction.create({
        data: {
          userId: existingOrder.userId,
          amount: existingOrder.total,
          orderId: `cancel-${orderId}`,
          status: 'refund',
        },
      });
    }

    // Update status pesanan jadi cancelled
    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: 'Dibatalkan',
        note: reason,
      },
    });

    return res.status(200).json({ success: true, order: updatedOrder });

  } catch (err) {
    console.error('❌ Gagal membatalkan pesanan:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal membatalkan pesanan',
      error: err.message,
    });
  }
}
