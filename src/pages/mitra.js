// pages/mitra.js
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Link from 'next/link';
import { FaUsers, FaShippingFast, FaHandshake, FaStar, FaStore, FaUserFriends, FaNetworkWired } from 'react-icons/fa';

export default function MitraPage() {
  const cards = [
    {
      title: 'Testimoni Klien',
      href: '/companyprofile#testimoni',
      icon: <FaStar className="text-yellow-500 text-xl" />,
      desc: 'Apa kata mereka tentang kerjasama dengan LiiyStore.'
    },
    {
      title: 'Program Dropshipper & Reseller',
      href: '/dropshipper-reseller',
      icon: <FaStore className="text-green-600 text-xl" />,
      desc: 'Gabung jadi dropshipper atau reseller tanpa modal besar.'
    },
    {
      title: 'Program Afiliasi',
      href: '/program-afiliasi',
      icon: <FaNetworkWired className="text-blue-500 text-xl" />,
      desc: 'Dapatkan komisi dari setiap penjualan melalui referral Anda.'
    },
    {
      title: 'Program Consignment',
      href: '/program-consignment',
      icon: <FaShippingFast className="text-indigo-500 text-xl" />,
      desc: 'Titip jual produkmu bersama kami dan raih pasar luas.'
    },
    {
      title: 'Cerita Sukses Mitra',
      href: '/companyprofile#ceritasukses',
      icon: <FaUserFriends className="text-purple-500 text-xl" />,
      desc: 'Lihat kisah nyata para mitra yang sukses bersama kami.'
    },
    {
      title: 'Kolaborasi & Kerja Sama',
      href: '/kolaborasi',
      icon: <FaHandshake className="text-rose-500 text-xl" />,
      desc: 'Kami terbuka untuk berbagai peluang kolaborasi strategis.'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-white border-b py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Mitra & Program Kolaborasi</h1>
          <p className="text-sm text-gray-500">
            Gabung dan berkembang bersama LiiyStore melalui berbagai program kemitraan, kolaborasi, dan dukungan penuh dari tim kami.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Link key={idx} href={card.href} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-5 flex flex-col gap-3 group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-full group-hover:scale-110 transition">{card.icon}</div>
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600">{card.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </Link>
        ))}
      </div>

      <Footer />
    </main>
  );
}
