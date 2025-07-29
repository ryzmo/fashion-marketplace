import { PrismaClient } from '@prisma/client';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123'; // pastikan ini sama dengan withAdminAuth

export default async function handler(req, res) {
  try {
    // ✅ Baca token dari cookie
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    // ✅ Kalau sudah lolos autentikasi, lanjut ambil data
    const today = startOfDay(new Date());
    const week = startOfWeek(new Date(), { weekStartsOn: 1 });
    const month = startOfMonth(new Date());

    const todayOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: today },
        status: { not: 'Dibatalkan' },
      },
    });

    const weekOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: week },
        status: { not: 'Dibatalkan' },
      },
    });

    const monthOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: month },
        status: { not: 'Dibatalkan' },
      },
    });

    const newUsers = await prisma.user.count({
      where: {
        createdAt: { gte: today },
      },
    });

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
          id: product.id,
          name: product.name,
          sold: item._sum.quantity,
        };
      })
    );

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
      const date = order.createdAt.toISOString().split('T')[0];
      if (!revenueMap[date]) {
        revenueMap[date] = 0;
      }
      revenueMap[date] += order.total;
    }

    const revenueGraph = Object.keys(revenueMap).map((date) => ({
      date,
      revenue: revenueMap[date],
    }));

    return res.status(200).json({
      todaySales: todayOrders.reduce((acc, order) => acc + order.total, 0),
      weekSales: weekOrders.reduce((acc, order) => acc + order.total, 0),
      monthSales: monthOrders.reduce((acc, order) => acc + order.total, 0),
      newOrders: todayOrders.length,
      topProducts: topProductsDetails,
      revenueGraph,
      newUsersToday: newUsers,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
