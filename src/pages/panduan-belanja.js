// pages/panduan-belanja.js
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PanduanBelanja = () => {
  const router = useRouter();

  return (
    <main className="bg-white">
      <div className="w-full shadow-sm max-w-4xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
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

      <h1 className="text-3xl font-bold mb-6 text-center">Panduan Belanja di LiiyStore.id</h1>

      <div className="md:flex md:items-start md:space-x-6 mb-8">
        <div className="md:w-1/4 w-full mb-4 md:mb-0">
          <Image
            src="/panduanbelanja.png"
            alt="Panduan Belanja"
            width={300}
            height={300}
            className="rounded w-full h-auto"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-2">1. Buat Akun</h2>
          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Kunjungi website kami di <a href="https://liiystore.id" className="text-blue-600 hover:underline">liiystore.id</a></li>
            <li>Klik tombol "Daftar / Masuk" di pojok kanan atas</li>
            <li>Masukkan email aktif, nama lengkap, dan buat password</li>
            <li>Setelah akun dibuat, kamu bisa mulai berbelanja</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">2. Pilih Produk</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Telusuri katalog produk dari kategori yang tersedia (busana muslim, hijab, aksesoris, dll)</li>
        <li>Klik produk yang kamu suka untuk melihat detailnya (ukuran, warna, bahan, dll)</li>
        <li>Pilih varian yang diinginkan dan klik "Tambah ke Keranjang"</li>
      </ul>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Checkout & Pembayaran</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Klik ikon keranjang dan pilih "Checkout"</li>
        <li>Isi alamat pengiriman dengan lengkap</li>
        <li>Pilih metode pengiriman yang tersedia</li>
        <li>Pilih metode pembayaran:</li>
        <ul className="list-disc ml-6 space-y-1">
          <li>E-Wallet: Dana, OVO, ShopeePay, GoPay</li>
          <li>Kartu Debit/Kredit</li>
          <li>QRIS</li>
          <li>COD (Bayar di Tempat)</li>
          <li>LIIY PAY (dompet digital dari website kami)</li>
        </ul>
        <li>Klik "Bayar Sekarang" dan selesaikan proses pembayaran</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Pengiriman</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Pesanan akan diproses maksimal 1x24 jam setelah pembayaran diterima</li>
        <li>Kami menggunakan jasa kirim terpercaya seperti J&T, JNE, SiCepat, Anteraja, Shopee Express, dan lainnya</li>
        <li>Estimasi pengiriman mengikuti lokasi tujuan</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Retur Produk</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Klaim retur hanya jika produk rusak karena kesalahan dari kami</li>
        <li>Tidak berlaku jika rusak karena pemakaian atau produk sesuai pesanan</li>
        <li>Ajukan retur maksimal 3x24 jam setelah barang diterima</li>
        <li>Kirim bukti video unboxing melalui WhatsApp atau email kami</li>
      </ul>
    </div>
    </main>
    
  );
};

export default PanduanBelanja;
