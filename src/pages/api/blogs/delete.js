// /pages/api/blogs/delete.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'ID blog diperlukan' });

  try {
    await prisma.blog.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('DELETE /api/blogs/delete error:', err);
    return res.status(500).json({ message: 'Gagal menghapus blog' });
  }
}
