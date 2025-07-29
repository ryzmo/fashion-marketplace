// pages/thank-you.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Footer from './footer';

export default function ThankYouPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/order/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data.order);
        })
        .catch((err) => {
          console.error('Gagal ambil pesanan:', err);
        });
    }
  }, [orderId]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Header tetap berada di atas */}
      <div className="w-full max-w-5xl mx-auto bg-white px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-gray-800">LiiyStore</span>
        </a>
        <span className="text-sm text-gray-500 hidden sm:block">
          Checkout 🔒
        </span>
      </div>
      
      {/* Konten utama berada di tengah */}
      <div className="max-w-3xl mx-auto px-4 py-10 bg-white text-black space-y-6 text-center">
        <h1 className="text-2xl font-bold">Terima Kasih atas Pembelian Anda!</h1>
        <p className="text-sm text-gray-700">
          Salam Hangat dari Kami karena telah berbelanja di Toko Kami. Nantinya keuntungan dari LiiyStore sebagian akan disumbangkan kepada yang membutuhkan. Terima kasih atas pembelian Anda dan kami nantikan pembelian Anda berikutnya.
        </p>
        <div className="mt-6">
          <a
            href={`/invoice?orderId=${orderId}`}
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Lihat Invoice
          </a>
        </div>
      </div>
    </main>
  );
}
