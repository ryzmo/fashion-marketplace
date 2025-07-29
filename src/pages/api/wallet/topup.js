// File: pages/api/wallet/topup.js
import midtransClient from 'midtrans-client';

let snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: 'userId dan amount wajib diisi' });
  }

  const orderId = 'TOPUP-' + Date.now();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: 'User #' + userId,
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL}/wallet/success?order_id=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(amount)}&status=settlement`,
    },
    item_details: [
      {
        id: 'topup-wallet',
        price: amount,
        quantity: 1,
        name: 'Top Up Wallet',
      },
    ],
    custom_field1: userId.toString(),
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ redirect_url: transaction.redirect_url });
  } catch (err) {
    console.error('Midtrans error:', err);
    res.status(500).json({ message: 'Gagal memproses top up.' });
  }
}
