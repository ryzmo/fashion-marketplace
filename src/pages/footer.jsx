// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-700 text-sm">
  <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-2 md:grid-cols-5 gap-8">

    {/* Tentang Kami - Full width di HP */}
    <div className="col-span-2 md:col-span-1">
      <h3 className="text-lg font-semibold mb-4">TENTANG KAMI</h3>
      <p className="text-gray-300 leading-relaxed">
        LIIY (Leading in Innovation Yonder) adalah perusahaan lokal Indonesia yang berfokus pada produksi dan penyediaan perlengkapan muslim secara lengkap di kawasan Asia Tenggara. Kami bangga menghadirkan produk 100% lokal berkualitas.
      </p>
    </div>

    {/* Info Perusahaan */}
    <div>
      <h3 className="text-lg font-semibold mb-4">INFO PERUSAHAAN</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/companyprofile" className="hover:underline">Tentang Kami</a></li>
        <li><a href="/companyprofile#visimisi" className="hover:underline">Visi & Misi Kami</a></li>
        <li><a href="/kontaksosialmedia" className="hover:underline">Link Kontak & Sosial Media</a></li>
        <li><a href="/toko-online" className="hover:underline">Link 5 Marketplace</a></li>
      </ul>
    </div>

    {/* Kebijakan */}
    <div>
      <h3 className="text-lg font-semibold mb-4">KEBIJAKAN & BANTUAN</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/terms" className="hover:underline">Terms & Condition</a></li>
        <li><a href="/faq" className="hover:underline">FAQ</a></li>
        <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
        <li><a href="/panduan-belanja" className="hover:underline">Panduan Belanja</a></li>
      </ul>
    </div>

    {/* Program */}
    <div>
      <h3 className="text-lg font-semibold mb-4">PROGRAM & TESTIMONI</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/companyprofile#testimoni" className="hover:underline">Testimoni Klien</a></li>
        <li><a href="/dropshipper-reseller" className="hover:underline">Program Dropshipper & Reseller</a></li>
        <li><a href="/program-afiliasi" className="hover:underline">Program Afiliasi</a></li>
        <li><a href="/program-consignment" className="hover:underline">Program Consignment</a></li>
      </ul>
    </div>

    {/* Mitra */}
    <div>
      <h3 className="text-lg font-semibold mb-4">MITRA & KERJASAMA</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/companyprofile#ceritasukses" className="hover:underline">Cerita Sukses Mitra</a></li>
        <li><a href="/kolaborasi" className="hover:underline">Kolaborasi & Kerja Sama</a></li>
      </ul>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="bg-gray-900 py-4 px-4">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    
    {/* Logo */}
    <img src="/logo.jpg" alt="Logo" className="w-10 h-10 object-contain grayscale" />

    {/* Sosial Media */}
    <div className="flex space-x-4">
      {[
        { icon: "fab fa-facebook-f", url: "https://www.facebook.com/share/1FQ9oHKHzq/" },
        { icon: "fab fa-instagram", url: "https://instagram.com/liiystore" },
        { icon: "fab fa-tiktok", url: "https://tiktok.com/@liiystore" },
        { icon: "fab fa-whatsapp", url: "https://wa.me/6287775465062" },
        { icon: "fab fa-youtube", url: "https://youtube.com/@LiiyStoreMuslimWear" },
      ].map((item, idx) => (
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <i className={`${item.icon} text-xl`}></i>
        </a>
      ))}
    </div>

    {/* Copyright */}
    <p className="text-xs text-gray-400 text-center md:text-right">
      © 2025 Liiy Store. All rights reserved.
    </p>
  </div>
</div>

</footer>

  );
};

export default Footer;