import midtransClient from 'midtrans-client';

let core = new midtransClient.CoreApi({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default async function handler(req, res) {
  const { order_id } = req.query;

  if (!order_id) return res.status(400).json({ message: 'Order ID tidak ditemukan' });

  try {
    const status = await core.transaction.status(order_id);
    res.status(200).json(status);
  } catch (err) {
    console.error('Gagal ambil status transaksi:', err);
    res.status(500).json({ message: 'Gagal mengambil status transaksi' });
  }
}
