// File: src/pages/api/order-accept-return.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID tidak ditemukan.' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        status: 'Pengembalian-Diterima',
      },
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error('❌ Error di /api/order-accept-return:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal menerima pengembalian.',
      error: err?.message || 'Unknown error',
    });
  }
}
