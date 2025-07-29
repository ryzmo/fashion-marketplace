import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderId, returnTrackingNumber, returnCourierName } = req.body;

    if (!orderId || !returnTrackingNumber || !returnCourierName) {
      return res.status(400).json({ success: false, message: 'Semua data wajib diisi.' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        returnTrackingNumber,
        returnCourierName,
        status: 'Proses-Pengembalian', // Atur status setelah kirim
      },
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error('❌ Error di /api/order-send-return:', err);
    return res.status(500).json({ success: false, message: 'Gagal menyimpan data resi pengembalian.', error: err.message });
  }
}
