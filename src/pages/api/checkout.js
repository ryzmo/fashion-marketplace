import { PrismaClient } from '@prisma/client';
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const today = startOfDay(new Date());
    const week = startOfWeek(new Date(), { weekStartsOn: 1 }); // minggu mulai dari Senin
    const month = startOfMonth(new Date());

    // Pesanan hari ini
    const todayOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: today },
        status: { not: 'Dibatalkan' },
      },
    });

    // Pesanan minggu ini
    const weekOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: week },
        status: { not: 'Dibatalkan' },
      },
    });

    // Pesanan bulan ini
    const monthOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: month },
        status: { not: 'Dibatalkan' },
      },
    });

    // User baru hari ini
    const newUsers = await prisma.user.count({
      where: {
        createdAt: { gte: today },
      },
    });

    // Produk terlaris (Top 5)
    const bestSellingProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const topProductsDetails = await Promise.all(
      bestSellingProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          id: product?.id,
          name: product?.name,
          sold: item._sum.quantity,
        };
      })
    );

    // Grafik revenue 30 hari terakhir
    const last30DaysOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
        status: { not: 'Dibatalkan' },
      },
      orderBy: { createdAt: 'asc' },
    });

    const revenueMap = {};
    for (const order of last30DaysOrders) {
      const date = order.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
      if (!revenueMap[date]) {
        revenueMap[date] = 0;
      }
      revenueMap[date] += order.total;
    }

    const revenueGraph = Object.keys(revenueMap).map((date) => ({
      date,
      revenue: revenueMap[date],
    }));

    // Final response
    return res.status(200).json({
      todaySales: todayOrders.reduce((acc, order) => acc + order.total, 0),
      weekSales: weekOrders.reduce((acc, order) => acc + order.total, 0),
      monthSales: monthOrders.reduce((acc, order) => acc + order.total, 0),
      newOrders: todayOrders.length,
      newUsersToday: newUsers,
      topProducts: topProductsDetails,
      revenueGraph,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
