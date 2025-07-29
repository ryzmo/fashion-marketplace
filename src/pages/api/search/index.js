import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { search = '', category = '' } = req.query;

      const categoryArray = category
        ? category.split(',').map((c) => c.trim())
        : [];

      const products = await prisma.product.findMany({
  where: {
    AND: [
      search
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : {},
      categoryArray.length > 0
        ? {
            categories: {
              some: {
                name: {
                  in: categoryArray,
                  mode: 'insensitive',
                },
              },
            },
          }
        : {},
    ],
  },
  include: {
    categories: true,
    variants: {
      select: {
        price: true,
        discountPrice: true,
      },
    },
  },
  orderBy: { createdAt: 'desc' },
});


      return res.status(200).json({ products: products || [] }); // ✅ Aman
    } catch (error) {
      console.error('GET /api/search Error:', error);
      return res.status(500).json({ message: 'Gagal mengambil produk' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
