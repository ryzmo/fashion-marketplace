// pages/api/order.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    // 🔍 Ambil semua pesanan user berdasarkan userId
    try {
      const orders = await prisma.order.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return res.status(200).json({ orders });
    } catch (err) {
      console.error('❌ Gagal ambil pesanan:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil pesanan' });
    }
  }

  if (req.method === 'POST') {
    // ✅ Buat pesanan baru
    try {
      const {
        userId,
        items,
        total,
        shippingCost,
        metode,
        alamat,
        provinsi,
        kota,
        phone,
        buyerNote, // ✅ Ganti dari note ke buyerNote
        status,
        expireAt,
        invoiceNumber,
      } = req.body;

      const newOrder = await prisma.order.create({
        data: {
          invoiceNumber,
          userId,
          total,
          shippingCost: shippingCost || 0,
          status: status || 'Belum-Dibayar',
          buyerNote, // ✅ Simpan catatan pembeli ke field baru
          items: {
  create: items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    color: item.color || null,
    size: item.size || null,
    price: item.price,
  })),
},
        },
      });

      // 🟢 Jika statusnya paid → langsung potong saldo user
      if (status === 'Dibayar') {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const newBalance = user.walletBalance - total;

        await prisma.user.update({
          where: { id: userId },
          data: { walletBalance: newBalance },
        });

        // Catat transaksi pemotongan
        await prisma.walletTransaction.create({
          data: {
            userId,
            amount: -total,
            orderId: newOrder.invoiceNumber,
            status: 'Dibayar',
          },
        });
      }

      return res.status(201).json({ success: true, orderId: newOrder.invoiceNumber });
    } catch (err) {
      console.error('❌ Gagal buat pesanan:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat membuat pesanan' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Metode ${req.method} tidak diizinkan`);
}
