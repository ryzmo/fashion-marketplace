// pages/api/cart/[userId].js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId diperlukan' });
  }

  // Ambil semua item keranjang
  if (req.method === 'GET') {
    try {
      const cartItems = await prisma.cartItem.findMany({
        where: { userId: parseInt(userId) },
        include: {
          product: {
            include: {
              categories: true,
            },
          },
        },
        
      });

      return res.status(200).json(cartItems);
    } catch (error) {
      console.error('Gagal ambil data keranjang:', error);
      return res.status(500).json({ error: 'Gagal ambil data keranjang' });
    }
  }

  // Update quantity item
  if (req.method === 'PUT') {
    const { itemId, quantity } = req.body;
    if (!itemId || !quantity) {
      return res.status(400).json({ error: 'itemId dan quantity diperlukan' });
    }

    try {
      const updatedItem = await prisma.cartItem.update({
        where: { id: parseInt(itemId) },
        data: { quantity: parseInt(quantity) },
      });

      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Gagal update jumlah item:', error);
      return res.status(500).json({ error: 'Gagal update item keranjang' });
    }
  }

  // Hapus satu item dari keranjang
  if (req.method === 'DELETE') {
    const { itemId } = req.query;
    if (!itemId) {
      return res.status(400).json({ error: 'itemId diperlukan untuk menghapus' });
    }

    try {
      await prisma.cartItem.delete({
        where: {
          id: parseInt(itemId),
        },
      });
      return res.status(204).end(); // sukses tanpa body
    } catch (error) {
      console.error('Gagal hapus item keranjang:', error);
      return res.status(500).json({ error: 'Gagal hapus item keranjang' });
    }
  }

  // Method tidak diizinkan
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
