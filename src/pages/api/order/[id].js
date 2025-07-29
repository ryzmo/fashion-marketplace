import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id: invoiceNumber },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { invoiceNumber: invoiceNumber },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true, // ✨ supaya bisa akses order.user.name, dll
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Invoice tidak ditemukan' });
    }

    return res.status(200).json({ order });
  } catch (err) {
    console.error('❌ Gagal ambil invoice:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil invoice' });
  }
}
