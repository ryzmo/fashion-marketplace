// pages/program-consignment.js
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ProgramConsignment = () => {
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

      <h1 className="text-3xl font-bold mb-6 text-center">Program Consignment (Titip Jual) LiiyStore</h1>

      <div className="md:flex md:items-start md:space-x-6 mb-8">
        <div className="md:w-1/4 w-full mb-4 md:mb-0">
          <Image
            src="/titipjual.png"
            alt="Program Consignment LiiyStore"
            width={500}
            height={300}
            className="rounded w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <p className="mb-4">Barang yang Diproduksi Kurang Laku? Titip Jual aja di LiiyStore!</p>
          <p className="mb-4">Buat kamu yang punya banyak stok menumpuk, produksi jalan terus tapi penjualan stagnan, sekarang bisa titip jual produkmu di LiiyStore! Kami membuka kesempatan bagi para pelaku usaha dan supplier yang memiliki stok berlebih atau barang kurang laku untuk tetap mendapatkan penghasilan dengan cara menitip jual produk melalui jaringan kami. Dengan pengalaman dalam penjualan fashion muslim dan perlengkapan ibadah, kami siap bantu produkmu menjangkau pasar yang lebih luas!</p>
          
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">Keunggulan Program Consignment LiiyStore:</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Cocok untuk Supplier dengan Dead Stock: Solusi tepat untuk produk yang menumpuk di gudang.</li>
        <li>Bisa Titip Berbagai Produk: Asal masih sesuai kategori kami seperti mukena, hijab, sajadah, dsb.</li>
        <li>Transparansi Penjualan: Laporan penjualan dikirim secara rutin setiap minggu.</li>
        <li>Bebas Biaya Pengiriman: Semua ongkir ke gudang kami ditanggung sepenuhnya oleh LiiyStore.</li>
        <li>Produk Dipasarkan di Semua Channel: Online store, website resmi, media sosial, hingga toko offline cabang LiiyStore.</li>
        <li>Tanpa Ribet Urus Pengemasan dan Kirim: Semua ditangani oleh tim kami.</li>
        <li>Sistem Pembagian Keuntungan Jelas: Sesuai kesepakatan awal dan tanpa biaya tersembunyi.</li>
        <li>Dibantu Desain Promosi & Konten Visual: Untuk mendukung penjualan maksimal.</li>
        <li>Peluang Eksposur Lewat Promo & Event: Termasuk di momen Ramadhan, Lebaran, dan Harbolnas.</li>
      </ul>

     

      <h2 className="text-xl font-semibold mt-8 mb-2">Cara Bergabung:</h2>
      <ol className="list-decimal ml-6 mb-4 space-y-1">
        <li>Hubungi tim kami melalui WhatsApp atau isi formulir pendaftaran.</li>
        <li>Kirimkan data produk yang ingin dititip jual.</li>
        <li>Lakukan pengiriman ke alamat gudang atau toko cabang kami yang ditentukan.</li>
        <li>Produk langsung dipasarkan setelah melewati proses pengecekan.</li>
        <li>Penjualan dicatat dan laporan dikirimkan secara berkala, keuntungan ditransfer ke rekening Anda.</li>
      </ol>
    </div>
    </main>
    
  );
};

export default ProgramConsignment;
