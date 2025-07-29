import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.wishlistItem.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Gagal hapus wishlist:', error);
      return res.status(500).json({ error: 'Gagal menghapus dari wishlist' });
    }
  }

  res.setHeader('Allow', ['DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
