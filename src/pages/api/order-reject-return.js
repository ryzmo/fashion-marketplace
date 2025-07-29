// pages/api/order-reject-return.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderId, reason } = req.body;
    if (!orderId || !reason) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: 'Pengembalian-Ditolak',
        note: reason, // simpan alasan penolakan
      },
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error reject return:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
