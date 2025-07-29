// pages/api/midtrans/callback.js
import { PrismaClient } from '@prisma/client';
import { buffer } from 'micro'; // penting untuk menangani raw body dari Midtrans

export const config = {
  api: {
    bodyParser: false, // wajib: body harus dalam bentuk raw
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const rawBody = await buffer(req);
    const body = JSON.parse(rawBody.toString());

    console.log('📦 Body Midtrans:', body);

    if (body.transaction_status === 'settlement') {
      const userId = parseInt(body.custom_field1);
      const amount = parseInt(body.gross_amount);

      const user = await prisma.user.findUnique({ where: { id: userId } });
      const newBalance = (user.walletBalance || 0) + amount;

      await prisma.user.update({
        where: { id: userId },
        data: { walletBalance: newBalance },
      });

      // ✅ Catat ke WalletTransaction
      await prisma.walletTransaction.create({
        data: {
          userId,
          amount,
          orderId: body.order_id,
          status: body.transaction_status,
        },
      });

      console.log('✅ Saldo & transaksi dicatat!');
      return res.status(200).json({ message: 'Saldo & transaksi berhasil ditambahkan' });
    } else {
      return res.status(200).json({ message: 'Transaksi bukan settlement' });
    }
  } catch (error) {
    console.error('❌ Gagal proses callback Midtrans:', error);
    return res.status(500).json({ message: 'Gagal proses callback' });
  }
}
