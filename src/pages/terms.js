// pages/terms.js
import React from 'react';
import { useRouter } from 'next/router';

const TermsAndConditions = () => {
    const router = useRouter();

  return (
    <main className="bg-white">
          <div className="w-full shadow-sm max-w-5xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
</div>
    <div className="bg-white text-gray-800 py-10 mb-6 px-4 max-w-4xl mx-auto">
        <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Kembali
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Syarat dan Ketentuan Pengguna</h1>

      <p className="mb-4">
        Selamat datang di website resmi LiiyStore (<a href="https://liiystore.id" className="text-blue-600 hover:underline">liiystore.id</a>). Dengan mengakses dan menggunakan layanan kami,
        Anda menyetujui untuk terikat oleh Syarat & Ketentuan berikut ini. Harap membaca dengan cermat sebelum menggunakan situs kami.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Akun Pengguna</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Untuk berbelanja di LiiyStore.id, pengguna wajib membuat akun terlebih dahulu.</li>
        <li>Anda bertanggung jawab atas keamanan informasi akun Anda, termasuk kerahasiaan kata sandi.</li>
        <li>Segala aktivitas yang terjadi dalam akun Anda adalah tanggung jawab Anda.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Pemesanan & Pembayaran</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Transaksi difasilitasi oleh HitPay: Kartu Kredit/Debit, QRIS, E-Wallet (Dana, ShopeePay, GoPay, OVO), COD, dan LIIY PAY.</li>
        <li>Harga sudah termasuk pajak dan dapat berubah tanpa pemberitahuan sebelumnya.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Pengiriman</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Pengiriman oleh Biteship: J&T, JNE, SiCepat, Anteraja, Shopee Express, dan lainnya.</li>
        <li>Estimasi tergantung lokasi dan jasa kirim.</li>
        <li>Nomor resi diberikan setelah pengiriman.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Retur & Pengembalian Produk</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Retur hanya untuk produk rusak karena produksi.</li>
        <li>Kerusakan akibat pengguna tidak dapat diklaim.</li>
        <li>Tidak bisa refund jika produk sesuai dan tidak cacat.</li>
        <li>Ajukan retur maksimal 3x24 jam dengan bukti foto/video.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Ketersediaan Produk</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Dapat berubah sewaktu-waktu.</li>
        <li>Kami berhak menolak pesanan jika stok tidak tersedia atau ada kesalahan harga.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Hak Kekayaan Intelektual</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Seluruh konten situs milik LiiyStore dan dilindungi hukum.</li>
        <li>Dilarang menyalin atau menyebarkan tanpa izin tertulis.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Perubahan Syarat & Ketentuan</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Kami dapat memperbarui syarat ini kapan saja.</li>
        <li>Perubahan berlaku segera setelah dipublikasikan di halaman ini.</li>
      </ul>
    </div>
    </main>

  );
};

export default TermsAndConditions;