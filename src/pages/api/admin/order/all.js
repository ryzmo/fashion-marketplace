// pages/api/order/all.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            province: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                discountPrice: true,
                imageUrls: true,
                size: true,
              },
            },
          },
        },
      },
    });

    const enrichedOrders = orders.map((order) => ({
      ...order,
      trackingNumber: order.trackingNumber || '',
      estimateArrival: order.estimateArrival || '',
      shippingCost: order.shippingCost || 0,
    }));

    return res.status(200).json({ success: true, orders: enrichedOrders });
  } catch (error) {
    console.error('❌ Gagal ambil semua pesanan:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data pesanan' });
  }
}
