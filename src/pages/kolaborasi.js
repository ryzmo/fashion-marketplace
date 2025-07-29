// pages/kolaborasi.js
import React from 'react';
import { useRouter } from 'next/router';

const Kolaborasi = () => {
  const router = useRouter();

  return (
    <main className="bg-white">
      <div className="w-full shadow-sm max-w-4xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
</div>
    <div className="min-h-screen bg-white text-gray-800 py-10 mb-6 px-4 max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Kolaborasi & Kerja Sama</h1>

      <p className="mb-4">
        LiiyStore selalu terbuka untuk berbagai bentuk kerja sama yang saling menguntungkan, baik dengan individu, komunitas, maupun perusahaan.
        Jika Anda memiliki ide, peluang, atau bentuk kolaborasi yang ingin dijalankan bersama kami, silakan hubungi kami melalui:
      </p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Email: <a href="mailto:muhammadsurazharfansyah@liiystore.id" className="text-blue-600 hover:underline">muhammadsurazharfansyah@liiystore.id</a></li>
        <li>WhatsApp: <a href="http://wa.me/+6287775465062" target="_blank" className="text-blue-600 hover:underline">+62 877-7546-5062</a></li>
        <li>Telepon: <a href="tel:+6285220239100" className="text-blue-600 hover:underline">+62 852-2023-9100</a></li>
      </ul>

      <p>Kami dengan senang hati akan mendengarkan dan menjajaki kemungkinan kerja sama terbaik bersama Anda.</p>
    </div>
    </main>
    
  );
};

export default Kolaborasi;
