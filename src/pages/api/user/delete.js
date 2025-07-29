// File: pages/api/user/delete.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = JSON.parse(req.body);
    if (!userId) {
      return res.status(400).json({ message: 'User ID wajib dikirim' });
    }

    // Hapus data terkait user (optional tergantung constraint database)
    await prisma.wishlistItem.deleteMany({ where: { userId: parseInt(userId) } });
    await prisma.cartItem.deleteMany({ where: { userId: parseInt(userId) } });
    await prisma.chatMessage.deleteMany({ where: { userId: parseInt(userId) } });
    await prisma.order.deleteMany({ where: { userId: parseInt(userId) } });

    // Hapus user
    await prisma.user.delete({ where: { id: parseInt(userId) } });

    // Hapus cookie
    res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Gagal hapus akun:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus akun' });
  }
}
