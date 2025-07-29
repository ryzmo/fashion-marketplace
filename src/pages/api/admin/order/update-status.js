import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  let body = {};

  try {
    body = req.body;

    // Untuk log debugging
    console.log('✅ Received body:', body);

    const { orderId, newStatus, trackingNumber, estimateArrival, cancelReason } = body;

    // Validasi
    if (!orderId || !newStatus) {
      console.warn('⚠️ orderId atau newStatus tidak diisi');
      return res.status(400).json({ message: 'orderId dan newStatus wajib diisi' });
    }

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: { user: true },
    });

    if (!order) {
      console.warn('⚠️ Pesanan tidak ditemukan:', orderId);
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }

    // Handle refund jika admin membatalkan pesanan
    if (newStatus === 'cancelled' && order.status === 'Dibayar') {
      console.log(`💸 Refund pesanan #${order.id} ke userId ${order.userId}`);
      
      await prisma.user.update({
        where: { id: order.userId },
        data: {
          walletBalance: { increment: order.total },
        },
      });

      await prisma.walletTransaction.create({
        data: {
          userId: order.userId,
          amount: order.total,
          status: 'refund',
          orderId: `REFUND-${order.id}`,
        },
      });
    }

    // Update pesanan
    const updated = await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: newStatus,
        note: cancelReason || undefined,
        trackingNumber: trackingNumber || undefined,
        estimateArrival: estimateArrival || undefined,
      },
    });

    console.log('✅ Pesanan berhasil diperbarui:', updated);

    return res.status(200).json({ success: true, order: updated });

  } catch (err) {
    console.error('❌ Error saat update status pesanan:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal update pesanan',
      error: err.message,
      stack: err.stack,
    });
  }
}
