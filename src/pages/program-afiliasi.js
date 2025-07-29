// pages/program-afiliasi.js
import React from 'react';
import { useRouter } from 'next/router';

const ProgramAfiliasi = () => {
  const router = useRouter();

  return (
    <main className="bg-white">
      <div className="w-full shadow-sm max-w-4xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
</div>
    <div className="bg-white text-gray-800 py-10 mb-6 px-4 max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Program Afiliasi LiiyStore</h1>

      <p className="mb-4">Bersama Menyebarkan Gaya Hidup Islami Modern</p>
      <p className="mb-4">Jadilah bagian dari perjalanan kami dalam menghadirkan produk fashion dan perlengkapan muslim berkualitas ke seluruh Indonesia dan Asia Tenggara. Dapatkan komisi hanya dengan menjadi affiliate kami dan membagikan link afiliasi Anda!</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Keuntungan Menjadi Afiliasi:</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li><strong>Komisi Menarik:</strong> Dapatkan komisi mulai dari 12% dari setiap transaksi</li>
        <li><strong>Kenaikan Komisi & Insentif:</strong> Di hari tertentu kami bisa menaikkan komisi dan memberi insentif bagi Top Affiliate</li>
        <li><strong>Link Afiliasi Otomatis:</strong> Setiap affiliate akan mendapatkan link unik yang langsung bisa dibagikan</li>
        <li><strong>Dashboard Khusus:</strong> Pantau performa, klik, dan komisi secara real-time</li>
        <li><strong>Gratis & Mudah:</strong> Tanpa biaya pendaftaran, langsung bisa mulai</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Cara Kerja Program Afiliasi:</h2>
      <ol className="list-decimal ml-6 mb-4 space-y-1">
        <li>Daftar sebagai Affiliate di platform kami</li>
        <li>Dapatkan link unik dan bagikan di media sosial, blog, atau ke teman</li>
        <li>Dapatkan komisi dari setiap pembelian yang dilakukan melalui link Anda</li>
      </ol>

      <h2 className="text-xl font-semibold mt-8 mb-2">Siapa yang Bisa Bergabung?</h2>
      <p className="mb-4">Semua orang! Mulai dari influencer, reseller, hingga pelanggan setia kami. Tidak perlu pengalaman khusus.</p>

      <div className="mt-6 text-center">
        <a
          href="https://liiystoreid.goaffpro.com/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          DAFTAR SEKARANG
        </a>
      </div>
    </div>
    </main>
    
  );
};

export default ProgramAfiliasi;
