import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const coupons = await prisma.coupon.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(coupons);
    } catch (error) {
      console.error('Gagal fetch kupon:', error);
      return res.status(500).json({ message: 'Gagal mengambil data kupon' });
    }
  }

  else if (req.method === 'POST') {
    let body = req.body;

    // Jika req.body masih string, parse dulu
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch (err) {
        return res.status(400).json({ message: 'Format JSON tidak valid' });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ message: 'Payload tidak valid' });
    }

    const { code, discountPercent, maxDiscount, minPurchase } = body;

    if (!code || !discountPercent || !maxDiscount || !minPurchase) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    try {
      const newCoupon = await prisma.coupon.create({
        data: {
          code,
          discountPercent,
          maxDiscount,
          minPurchase,
        },
      });
      return res.status(201).json(newCoupon);
    } catch (error) {
      console.error('Gagal tambah kupon:', error);
      return res.status(500).json({ message: 'Kupon gagal ditambahkan' });
    }
  }

  else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'ID kupon diperlukan' });
    }

    try {
      await prisma.coupon.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json({ message: 'Kupon berhasil dihapus' });
    } catch (error) {
      console.error('Gagal hapus kupon:', error);
      return res.status(500).json({ message: 'Gagal menghapus kupon' });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Metode ${req.method} tidak diizinkan`);
  }
}
