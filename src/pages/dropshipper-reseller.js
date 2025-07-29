// pages/dropshipper-reseller.js
import React from 'react';
import { useRouter } from 'next/router';

const DropshipperReseller = () => {
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

      <h1 className="text-3xl font-bold mb-6 text-center">Program Dropshipper & Reseller LiiyStore</h1>

      <p className="mb-4">Bangun Bisnis Islami Bersama Brand Fashion Muslim Terpercaya</p>
      <p className="mb-4">Ingin memulai bisnis tanpa ribet dan tanpa modal besar? Bersama LiiyStore, kamu bisa menjadi bagian dari jaringan penjual terpercaya kami sebagai Reseller atau Dropshipper. Nikmati kemudahan menjual produk muslim berkualitas, 100% lokal, dengan sistem yang fleksibel dan dukungan penuh dari tim kami.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Mengapa Bergabung dengan LiiyStore?</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Tanpa Modal Besar – Dropshipper bisa jualan tanpa stok barang.</li>
        <li>Produk 100% Lokal Berkualitas Tinggi – Produksi konveksi-konveksi lokal Indonesia.</li>
        <li>Akses ke Harga Spesial Khusus Reseller – Dapatkan harga hingga 50% lebih murah.</li>
        <li>Komisi Menarik & Fleksibel untuk Dropshipper – Harga jualmu bebas kamu tentukan, selama tidak di bawah harga pasar.</li>
        <li>Konten Promosi Siap Pakai – Foto, video, dan katalog digital kami yang sediakan.</li>
        <li>Tim Support Aktif & Responsif 24/7 – Fast respon dan cekatan tentunya.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Reseller vs Dropshipper: Mana yang Cocok untuk Kamu?</h2>
      <div className="overflow-auto border border-gray-300 rounded mb-6">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Kriteria</th>
              <th className="px-4 py-2">Reseller</th>
              <th className="px-4 py-2">Dropshipper</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Modal Awal</td>
              <td className="px-4 py-2">Ada (stok barang sendiri)</td>
              <td className="px-4 py-2">Tanpa modal (tidak perlu stok barang)</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Stok Produk</td>
              <td className="px-4 py-2">Harus menyetok barang</td>
              <td className="px-4 py-2">Tidak perlu stok, sistem titip jual</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Keuntungan</td>
              <td className="px-4 py-2">Lebih besar karena beli harga grosir/partai</td>
              <td className="px-4 py-2">Tergantung selisih harga jual dengan harga jual kami</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Branding Toko</td>
              <td className="px-4 py-2">Sendiri. Bisa menggunakan foto produk sendiri</td>
              <td className="px-4 py-2">Umumnya pakai branding LiiyStore dan materi dari LiiyStore</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Pengiriman</td>
              <td className="px-4 py-2">Kirim sendiri ke pelanggan</td>
              <td className="px-4 py-2">Dikirim langsung oleh tim LiiyStore</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Kontrol Produk & Kualitas</td>
              <td className="px-4 py-2">Lebih besar (bisa cek langsung)</td>
              <td className="px-4 py-2">Terbatas, tapi jika ada kerusakan akan diganti 100%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Customer Service</td>
              <td className="px-4 py-2">Wajib handle sendiri (bisa dibantu tidak langsung)</td>
              <td className="px-4 py-2">Bisa dialihkan ke tim kami</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Cocok Untuk</td>
              <td className="px-4 py-2">Yang sudah punya usaha, ingin skala besar</td>
              <td className="px-4 py-2">Pemula, modal kecil, ingin uji coba pasar</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">Cara Bergabung</h2>
      <ol className="list-decimal ml-6 mb-4 space-y-1">
        <li>Klik tombol “Hubungi Kami via WhatsApp untuk Info Lebih Lanjut“</li>
        <li>Isi formulir pendaftaran sebagai reseller/dropshipper</li>
        <li>Tim kami akan menghubungi Anda dan memberikan link grup WhatsApp khusus</li>
      </ol>

      <div className="mt-6 text-center">
        <a
          href="https://wa.me/6287775465062"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Hubungi Kami via WhatsApp
        </a>
      </div>
    </div>
    </main>
     
  );
};

export default DropshipperReseller;
