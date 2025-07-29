// pages/api/product/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
      }

      return res.status(200).json({ success: true, product });
    } catch (err) {
      console.error('GET /api/product/[id] error:', err);
      return res.status(500).json({ success: false, message: 'Terjadi kesalahan.', error: err.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
