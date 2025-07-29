// pages/invoice.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from './LoadingBar';

export default function InvoicePage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/order/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data.order);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Gagal ambil invoice:', err);
          setLoading(false);
        });
    }
  }, [orderId]);

  useEffect(() => {
    if (order && order.status === 'Dibayar') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        window.goaffpro_order = {
          number: "#${order.invoiceNumber}",
          total: ${order.total}
        };
        if (typeof window.goaffproTrackConversion !== "undefined") {
          window.goaffproTrackConversion(window.goaffpro_order);
        }
      `;
      document.body.appendChild(script);
    }
  }, [order]);
  

  if (loading) return <LoadingBar/>;
  if (!order) return <p className="p-6 text-red-600">Invoice tidak ditemukan.</p>;

  return (
    <main className='bg-white'>
      <div className="w-full shadow-sm max-w-5xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
  <span className="text-sm text-gray-500 hidden sm:block">
    Checkout 🔒
  </span>
</div>

    <div className="max-w-3xl mx-auto px-4 py-10 bg-white text-black space-y-6">
      <h1 className="text-2xl font-bold">Invoice Pembayaran</h1>

      {order.status === 'Dibayar' && (
  <div className="bg-green-100 text-green-800 text-sm p-3 rounded border border-green-300 mb-4">
    ✅ Pesanan berhasil dibayar dan sedang diproses!
  </div>
)}

{order.status === 'Belum-Dibayar' && (
  <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded border border-yellow-300 mb-4">
    🕒 Pesanan kamu sedang menunggu pembayaran. Harap selesaikan pembayaran secepatnya.
  </div>
)}

{order.status === 'Dibatalkan' && (
  <div className="bg-red-100 text-red-800 text-sm p-3 rounded border border-red-300 mb-4">
    ❌ Pesanan ini telah dibatalkan.
  </div>
)}



      <div className="border rounded p-4 shadow text-sm space-y-2">
        <p><strong>ID Pesanan:</strong> {order.invoiceNumber}</p>
        <p><strong>Status:</strong> <span className={order.status === 'Dibayar' ? 'text-green-600' : 'text-red-600'}>{order.status}</span></p>
        <p><strong>Nama Penerima:</strong> {order.user.name}</p>
        <p><strong>Alamat:</strong> {order.user.address}, {order.user.city}, {order.user.province}</p>
        <p><strong>No. Telepon:</strong> {order.user.phone}</p>
        <p><strong>Tanggal:</strong> {new Date(order.createdAt).toLocaleString('id-ID')}</p>
        <p><strong>Catatan untuk Penjual:</strong> {order.buyerNote || '-'}</p>

{order.note && (
  <p className="text-xs text-gray-500 italic">
    *Alasan pembatalan (jika ada): {order.note}
  </p>
)}

      </div>

      <div className="border rounded p-4 shadow text-sm">
        <h2 className="font-semibold mb-2">Rincian Produk</h2>
        {order.items.map((item) => (
  <div key={item.id} className="flex items-center gap-4 border-b py-3">
    <img
      src={typeof item.product.imageUrls[0] === 'string' ? item.product.imageUrls[0] : item.product.imageUrls[0]?.url}
      alt={item.product.name}
      className="w-16 h-16 object-cover rounded"
    />
    <div className="flex-1">
      <p className="text-sm font-medium">{item.product.name}</p>
      <p className="text-xs text-gray-600">
  {item.color && `Warna: ${item.color} | `}Ukuran: {item.size} | Jumlah: {item.quantity}
</p>

    </div>
    <p className="text-sm font-semibold text-right">
  Rp{(item.price * item.quantity).toLocaleString('id-ID')}
</p>

  </div>
))}


        <div className="space-y-1 text-sm text-gray-700">
  <div className="flex justify-between">
    <span>Subtotal Produk</span>
    <span>
      Rp{order.items
  .reduce((total, item) => total + item.price * item.quantity, 0)
  .toLocaleString('id-ID')}

    </span>
  </div>

  {order.discountPercent > 0 && (
    <div className="flex justify-between text-sm text-green-600">
      <span>Diskon Otomatis</span>
      <span>
        -Rp{(
  (order.discountPercent / 100) *
  order.items.reduce((total, item) => total + item.price * item.quantity, 0)
).toLocaleString('id-ID')}

      </span>
    </div>
  )}

  <div className="flex justify-between">
    <span>Subtotal Pengiriman</span>
    <span>Rp{order.shippingCost.toLocaleString('id-ID')}</span>
  </div>

  <div className="flex justify-between">
    <span>Biaya Layanan</span>
    <span>Rp{order.fee?.toLocaleString('id-ID') || '1.000'}</span>
  </div>

  <div className="flex justify-between font-bold text-red-600 text-base pt-2">
    <span>Total Pembayaran</span>
    <span>Rp{order.total.toLocaleString('id-ID')}</span>
  </div>
</div>

      </div>

      <div className="pt-6">
        <a
          href="/profile?section=pesanan"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Lihat Pesanan
        </a>
      </div>
    </div>
    </main>
  );
}
