import React from 'react';
import Link from 'next/link';
import { FaDiscord, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
// Import sebelumnya...
import { FaRegGem, FaCheck } from 'react-icons/fa';

import TestimonialSlider from './TestimonialSlider';
import TeamSlider from './TeamSlider';

export default function BelajarBareng() {
  return (
    // Menggunakan tema gelap seperti pada gambar
    <main className="bg-gray-900 text-white min-h-screen">

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        
        {/* Judul dengan gradien */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Selamat Datang di Zona <br /> Belajar Jualan Online Terlengkap!
        </h1>

        {/* Paragraf perkenalan */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Halo, kenalin aku M. Suraz Harfansyah, Umur 18 Tahun, Owner LiiyStore – Toko Online dengan Omzet 2M+/Bulan dan sudah banyak diliput Media Nasional Ternama (Kompas, Detik, Tribunnews, SWA, Warta Ekonomi, dst)
        </p>

        {/* Placeholder untuk Video */}
        <div className="relative aspect-video w-full max-w-3xl mx-auto mb-6 border-4 border-purple-500 rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20">
          {/* Ganti `src` dengan link video YouTube Anda */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID" // <-- GANTI DENGAN ID VIDEO YOUTUBE
            title="Video Belajar Jualan Online"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Teks ajakan */}
        <p className="text-gray-400 mb-8">
          Sebelum Mulai Belajar ataupun Konsultasi, boleh disimak dulu ya video diatas 😊 dan Kalian juga boleh banget cek Profil Perusahaan kita ya dibawah ya ⏬
        </p>

        {/* Tombol ke Halaman Profil Perusahaan */}
        <Link 
          href="/company-profile" 
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg"
        >
          Visit Our Company Profile
        </Link>
        
      </div>

       <section className="bg-gray-800 py-16">
    <div className="max-w-6xl mx-auto px-4">
      
      {/* Judul Seksi */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
        E-Book Pembelajaran Jualan Online
      </h2>

      {/* Grid untuk menampung kartu e-book */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        {/* --- KARTU 1: STARTER KIT --- */}
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img src="/ebook-starter.jpg" alt="E-Book Starter Kit" className="w-full h-auto" />
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-2xl font-bold text-red-500 line-through">Rp 199.000,00</p>
                <p className="text-3xl font-bold text-green-400">Rp 69.000,-</p>
              </div>
              <p className="text-lg text-gray-400 font-semibold">472 Terjual</p>
            </div>
            <div className="flex items-center mb-4 text-yellow-400">
              {/* Bintang Rating */}
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="text-gray-300 mb-2">E-Book 99 Halaman</p>
            <p className="text-gray-400 text-sm mb-6 flex-grow">Ditulis langsung oleh Pendiri LiiyStore</p>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
              Beli Sekarang
            </button>
          </div>
        </div>

        {/* --- KARTU 2: NAIK KELAS KIT --- */}
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img src="/ebook-naik-kelas.jpg" alt="E-Book Naik Kelas Kit" className="w-full h-auto" />
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-2xl font-bold text-red-500 line-through">Rp 499.000,00</p>
                <p className="text-3xl font-bold text-green-400">Rp 199.000,-</p>
              </div>
              <p className="text-lg text-gray-400 font-semibold">98 Terjual</p>
            </div>
            <div className="flex items-center mb-4 text-yellow-400">
              {/* Bintang Rating */}
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="text-gray-300 mb-2">E-Book 135 Halaman</p>
            <p className="text-gray-400 text-sm mb-6 flex-grow">Ditulis langsung oleh Pendiri LiiyStore</p>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
              Beli Sekarang
            </button>
          </div>
        </div>

      </div>

      {/* Link "Cek E-Book lainnya" */}
      <div className="text-center mt-12">
        <a href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg transition-colors">
          Cek E-Book lainnya &gt;&gt;
        </a>
      </div>

    </div>
  </section>

  {/* ===== SEKSI SEMINAR & KOMUNITAS BARU DIMULAI DI SINI ===== */}
  <section className="bg-white text-gray-800 py-16">
    <div className="max-w-6xl mx-auto px-4">
      
      {/* --- Bagian Seminar, Workshop, dan Bootcamp --- */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Seminar, Workshop, dan Bootcamp
        </h2>
        <p className="text-lg text-gray-600 font-medium">
          [ Online maupun Offline ]
        </p>
      </div>

      {/* Grid untuk Kartu Seminar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* KARTU 1: DARI NOL */}
        <div className="bg-gray-50 rounded-lg shadow-lg text-center p-4 sm:p-6 flex flex-col">
          <img src="/seminar-dari-nol.jpg" alt="Seminar Dari Nol" className="w-full h-auto rounded-md mb-4" />
          <div className="flex justify-between items-center px-2 mb-4">
            <p className="text-lg font-semibold text-red-500 line-through">Rp 199.000,00</p>
            <p className="text-2xl font-bold text-green-600">Rp 69.000,-</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Daftar Sekarang
            </a>
            <p className="text-sm text-gray-600 whitespace-nowrap"><span className="font-bold">887</span> orang telah daftar</p>
          </div>
        </div>
        
        {/* KARTU 2: NAIK KELAS */}
        <div className="bg-gray-50 rounded-lg shadow-lg text-center p-4 sm:p-6 flex flex-col">
          <img src="/seminar-naik-kelas.jpg" alt="Seminar Naik Kelas" className="w-full h-auto rounded-md mb-4" />
          <div className="flex justify-between items-center px-2 mb-4">
            <p className="text-lg font-semibold text-red-500 line-through">Rp 499.000,00</p>
            <p className="text-2xl font-bold text-green-600">Rp 199.000,-</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Daftar Sekarang
            </a>
            <p className="text-sm text-gray-600 whitespace-nowrap"><span className="font-bold">182</span> orang telah daftar</p>
          </div>
        </div>

      </div>
      <div className="text-center mt-8">
        <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
          Cek Jadwal lainnya &gt;&gt;
        </a>
      </div>

      {/* --- Bagian Gabung Grup Komunitas --- */}
      <div className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Gabung ke Grup Komunitas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* KOLOM 1: CuanStarter */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-center mb-1">Gabung Komunitas CuanStarter</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Tempat Anak Muda Belajar Jualan Online dari Nol</p>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaDiscord className="text-2xl text-indigo-500" />
                <span className="font-semibold">Klik untuk Gabung Grup</span>
              </a>
              <a href="#" className="flex items-center gap-4 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaFacebook className="text-2xl text-blue-600" />
                <span className="font-semibold">Klik untuk Gabung Grup</span>
              </a>
              <a href="#" className="flex items-center gap-4 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaWhatsapp className="text-2xl text-green-500" />
                <span className="font-semibold">Klik untuk Gabung Grup</span>
              </a>
            </div>
          </div>
          
          {/* KOLOM 2: JualanNaik */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-center mb-1">Gabung Grup JualanNaik</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Sharing & Belajar Gratis dari Seller TOP</p>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaDiscord className="text-2xl text-indigo-500" />
                <span className="font-semibold">Klik untuk Gabung Grup</span>
              </a>
              <a href="#" className="flex items-center gap-4 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaFacebook className="text-2xl text-blue-600" />
                <span className="font-semibold">Klik untuk Gabung Grup</span>
              </a>
              <a href="#" className="flex items-center gap-4 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaWhatsapp className="text-2xl text-green-500" />
                <span className="font-semibold">Klik untuk Gabung Grup</span>
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>

  {/* ===== SEKSI LAYANAN KAMI DIMULAI DI SINI ===== */}
  <section className="bg-gray-900 text-white py-16">
    <div className="max-w-4xl mx-auto px-4">

      {/* Judul Seksi */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Jelajahi Layanan Kami untuk Naikkan Omzet Toko Onlinemu
        </h2>
        <p className="text-lg text-gray-400">
          Garansi Uang 100% Balik apabila Tidak Naik
        </p>
      </div>

      {/* Container untuk semua kartu layanan */}
      <div className="space-y-8">

        {/* KARTU 1: Jasa Iklan & Optimasi */}
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/3">
            <img src="/layanan-iklan.jpg" alt="Jasa Iklan & Optimasi" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-400">Naik Omzet Lewat Jasa Iklan & Optimasi</h3>
            <p className="text-sm text-gray-400 mb-4">Jasa Pengelolaan Google Ads, Meta Ads, Tiktok Ads, dan Marketplace Ads</p>
            <ul className="space-y-2 text-gray-300 text-sm mb-6 flex-grow">
              <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Cocok untuk Semua Jenis Bisnis & Industri, dari UMKM hingga Korporasi.</span></li>
              <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Layanan Murah & Terjamin, Bayar berdasarkan Hasil Performa Iklan.</span></li>
              <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Ditangani oleh Tim Iklan Ahli bersertifikat (Jaminan 20x ROAS).</span></li>
            </ul>
            <a href="#" className="self-start bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Konsultasi Bareng Kami Sekarang
            </a>
          </div>
        </div>

        {/* KARTU 2: Program Consignment */}
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/3">
            <img src="/layanan-consignment.jpg" alt="Program Consignment" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-400">Program Consignment (Titip Jual) LiiyStore</h3>
            <p className="text-sm text-gray-400 mb-4">Barang yang Diproduksi Kurang Laku? Titip Jual aja di LiiyStore!</p>
            <ul className="space-y-2 text-gray-300 text-sm mb-6 flex-grow">
              <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Cocok Buat Supplier dengan Banyak Barang Dead Stock atau Over Produksi.</span></li>
              <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Laporan Penjualan yang Transparan Setiap Minggunya.</span></li>
              <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Biaya Ongkir Ditanggung Sepenuhnya Oleh Kami.</span></li>
            </ul>
            <a href="#" className="self-start bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Pelajari Selengkapnya
            </a>
          </div>
        </div>
        
        {/* KARTU 3: Konsultasi, Mentoring & Audit */}
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/3">
            <img src="/layanan-konsultasi.jpg" alt="Konsultasi, Mentoring & Audit" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-400">Konsultasi, Mentoring & Audit Toko Online-mu</h3>
            <p className="text-sm text-gray-400 mb-4">Temukan Masalah di Tokomu, dan Benerin bareng Mentor TOP Seller</p>
            <ul className="space-y-2 text-gray-300 text-sm mb-6 flex-grow">
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Bahan Hasil Audit bareng Mentor TOP (Raih Omzet 2M+/Bulan).</span></li>
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Dapat Strategi Langsung yang Bisa Kamu Terapin Hari itu Juga.</span></li>
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Sesi Konsultasi & Mentoring bisa Dilakukan Secara 1-on-1 Privat.</span></li>
            </ul>
            <a href="#" className="self-start bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Booking Audit & Konsultasi Sekarang
            </a>
          </div>
        </div>

        {/* KARTU 4: Tools & Konten Siap Pakai */}
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/3">
            <img src="/layanan-konten.jpg" alt="Tools & Konten Siap Pakai" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-400">Tools & Konten Siap Pakai untuk Jualanmu</h3>
            <p className="text-sm text-gray-400 mb-4">Gak perlu mikir desain, caption, atau video lagi. Semua udah kami siapin!</p>
            <ul className="space-y-2 text-gray-300 text-sm mb-6 flex-grow">
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Ratusan Caption & Judul Jualan Siap Pakai.</span></li>
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Template Desain Canva, Banner, Feed & Promosi.</span></li>
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Cocok buat yang Ga Jago Desain atau Nulis.</span></li>
            </ul>
            <a href="#" className="self-start bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Jelajahi Sekarang
            </a>
          </div>
        </div>

        {/* KARTU 5: Program Reseller & Dropshipper */}
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/3">
            <img src="/layanan-reseller.jpg" alt="Program Reseller & Dropshipper" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-yellow-400">Program Reseller & Dropshipper LiiyStore</h3>
            <p className="text-sm text-gray-400 mb-4">Raih Penghasilan Tambahan Lewat Bisnis Fashion Muslim Bersama LiiyStore</p>
            <ul className="space-y-2 text-gray-300 text-sm mb-6 flex-grow">
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Tanpa Modal Besar & Produk 100% Lokal Berkualitas Tinggi.</span></li>
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Akses ke Materi Promosi & Konten Siap Pakai.</span></li>
                <li className="flex items-start"><BsCheckCircleFill className="text-green-400 mt-1 mr-3 flex-shrink-0" /><span>Tim Support Aktif & Responsif 24/7.</span></li>
            </ul>
            <a href="#" className="self-start bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Pelajari Selengkapnya
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* ===== SEKSI MEMBERSHIP DIMULAI DI SINI ===== */}
  <section className="bg-gray-100 py-16">
    <div className="max-w-6xl mx-auto px-4">

      {/* Judul Seksi */}
      <div className="text-center mb-12 text-gray-800">
        <div className="flex justify-center items-center gap-4 mb-4">
            <FaRegGem className="text-yellow-500 text-2xl" />
            <h2 className="text-3xl md:text-4xl font-extrabold">
            ALL-IN-ONE MEMBERSHIP
            </h2>
            <FaRegGem className="text-yellow-500 text-2xl" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Akses Semua. Belajar Langsung dari Pebisnis Muda yang Udah Beneran Dapet Miliaran
        </p>
      </div>

      {/* Grid untuk Kartu Membership */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* KARTU 1: BULANAN */}
        <div className="relative bg-white text-gray-800 rounded-xl shadow-lg p-8 flex flex-col h-full border">
            {/* Badge Diskon */}
            <div className="absolute top-0 right-0 -mt-5 -mr-5 w-24 h-24 rounded-full bg-red-600 text-white flex flex-col justify-center items-center transform rotate-12 shadow-xl">
                <span className="text-3xl font-bold">50%</span>
                <span className="text-sm font-semibold -mt-1">OFF</span>
            </div>

            <h3 className="text-4xl font-extrabold mb-2 text-gray-500">BULANAN</h3>
            <h4 className="text-xl font-bold mb-6">Benefit:</h4>
            
            <ul className="space-y-3 flex-grow text-gray-700">
                <li className="flex items-start"><FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Akses Semua E-Book Premium Sepuasnya</span></li>
                <li className="flex items-start"><FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Akses ke Semua Webinar & Mini-Course Online Tiap Bulan</span></li>
                <li className="flex items-start"><FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Akses Download ke Semua Template, Desain & Video</span></li>
                <li className="flex items-start"><FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Diskon Khusus Untuk Jasa Pengelolaan Iklan & Audit</span></li>
                <li className="flex items-start"><FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Grup Eksklusif Khusus Member (Gratis Tanya Jawab 24/7)</span></li>
                <li className="flex items-start"><FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Free Mentoring 1-on-1 Tiap Minggu</span></li>
            </ul>

            <div className="mt-8 text-right">
                <p className="line-through text-gray-500">Rp 1.000.000,-/Bulan</p>
                <p className="text-3xl font-bold text-gray-800">only <span className="text-4xl">499.000</span></p>
            </div>
            <a href="#" className="w-full text-center mt-4 py-3 rounded-lg font-bold bg-gray-800 text-white hover:bg-gray-700 transition-colors text-lg">
                Daftar Sekarang
            </a>
        </div>

        {/* KARTU 2: TAHUNAN (Paling Direkomendasikan) */}
        <div className="relative bg-yellow-400 text-gray-900 rounded-xl shadow-2xl p-8 flex flex-col h-full transform lg:scale-105 border-2 border-yellow-500">
            {/* Badge Diskon */}
            <div className="absolute top-0 right-0 -mt-5 -mr-5 w-24 h-24 rounded-full bg-red-600 text-white flex flex-col justify-center items-center transform rotate-12 shadow-xl">
                <span className="text-3xl font-bold">90%</span>
                <span className="text-sm font-semibold -mt-1">OFF</span>
            </div>
            {/* Badge Best Value */}
            <div className="absolute top-4 left-4 bg-gray-900 text-yellow-400 text-xs font-bold uppercase px-3 py-1 rounded-full">Best Value</div>

            <h3 className="text-4xl font-extrabold mb-2 text-yellow-900">TAHUNAN</h3>
            <h4 className="text-xl font-bold mb-6">Benefit:</h4>
            
            <ul className="space-y-3 flex-grow font-medium">
                <li className="flex items-start"><FaCheck className="text-green-600 mr-3 mt-1 flex-shrink-0" /><span>Akses Semua E-Book Premium Sepuasnya</span></li>
                <li className="flex items-start"><FaCheck className="text-green-600 mr-3 mt-1 flex-shrink-0" /><span>Akses ke Semua Webinar & Mini-Course Online <span className="font-bold">Full 1 Tahun</span></span></li>
                <li className="flex items-start"><FaCheck className="text-green-600 mr-3 mt-1 flex-shrink-0" /><span>Akses Download ke Semua Template, Desain & Video</span></li>
                <li className="flex items-start"><FaCheck className="text-green-600 mr-3 mt-1 flex-shrink-0" /><span>Diskon <span className="font-bold">Exclusive</span> Untuk Jasa Pengelolaan Iklan & Audit</span></li>
                <li className="flex items-start"><FaCheck className="text-green-600 mr-3 mt-1 flex-shrink-0" /><span>Grup Eksklusif Khusus Member (Gratis Tanya Jawab 24/7)</span></li>
                <li className="flex items-start"><FaCheck className="text-green-600 mr-3 mt-1 flex-shrink-0" /><span>Free Mentoring 1-on-1 Tiap Minggu</span></li>
            </ul>

            <div className="mt-8 text-right">
                <p className="line-through text-yellow-800">Rp 10.000.000,-/Tahun</p>
                <p className="text-3xl font-bold text-gray-900">only <span className="text-4xl">999.000</span></p>
            </div>
            <a href="#" className="w-full text-center mt-4 py-3 rounded-lg font-bold bg-gray-900 text-white hover:bg-gray-800 transition-colors text-lg">
                Daftar Sekarang
            </a>
        </div>
        
      </div>

       <div className="flex justify-center items-center gap-4 mt-12">
            <FaRegGem className="text-yellow-500 text-2xl" />
            <FaRegGem className="text-yellow-500 text-lg" />
            <FaRegGem className="text-yellow-500 text-2xl" />
        </div>

    </div>
  </section>

  {/* ===== SEKSI TESTIMONI BARU DIMULAI DI SINI ===== */}
<section className="bg-gray-900">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center pt-16 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
            Testimoni dari Member Kami
        </h2>
        <p className="text-lg text-gray-400 mt-2">
            Apa yang mereka katakan tentang program kami
        </p>
    </div>
    <TestimonialSlider />
  </div>
</section>

<section className="bg-white py-16 text-gray-800">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Judul Seksi */}
        <div className="mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
                Promo Terbatas: E-Book
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-blue-600">
                "Bedah Marketing Kit Series"
            </h3>
        </div>
        <p className="text-lg text-gray-600">4 E-Book Bedah Marketing Kit (All Marketplace)</p>

        {/* Grid Gambar E-Book */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-10">
            {['/ebooks/shopee.jpg', '/ebooks/tiktok.jpg', '/ebooks/lazada.jpg', '/ebooks/blibli.jpg'].map((src, index) => (
                <div key={index} className="bg-white p-2 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <img src={src} alt={`E-book cover ${index + 1}`} className="w-full h-auto rounded-md" />
                </div>
            ))}
        </div>

        {/* Area Harga dan Tombol Call-to-Action */}
        <div className="bg-gray-50 rounded-xl p-8 mt-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 shadow-inner">
            
            {/* Harga */}
            <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-red-600 line-through decoration-2">
                    Rp 796.000,00
                </p>
                <p className="text-5xl md:text-6xl font-bold text-green-600 mt-1">
                    Rp 399.000,-
                </p>
            </div>

            {/* Aksi */}
            <div className="text-center">
                <p className="font-semibold text-lg text-gray-700">Diskon Khusus Bundling</p>
                <a href="#" className="mt-2 inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-12 rounded-lg transition-colors text-xl shadow-lg">
                    Beli Sekarang
                </a>
            </div>

            {/* Badge Diskon Starburst */}
            <div className="relative w-32 h-32 md:w-36 md:h-36">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-current text-red-600">
                    <path d="M50 0 L61.2 25.2 L87.8 25.2 L68.3 41.2 L79.5 66.4 L50 50.4 L20.5 66.4 L31.7 41.2 L12.2 25.2 L38.8 25.2 Z" transform="rotate(15 50 50) scale(1.2)" />
                    <path d="M50 0 L61.2 25.2 L87.8 25.2 L68.3 41.2 L79.5 66.4 L50 50.4 L20.5 66.4 L31.7 41.2 L12.2 25.2 L38.8 25.2 Z" transform="rotate(-15 50 50) scale(1.2)" />
                     <path d="M50 0 L61.2 25.2 L87.8 25.2 L68.3 41.2 L79.5 66.4 L50 50.4 L20.5 66.4 L31.7 41.2 L12.2 25.2 L38.8 25.2 Z" transform="rotate(45 50 50) scale(1.2)" />
                     <path d="M50 0 L61.2 25.2 L87.8 25.2 L68.3 41.2 L79.5 66.4 L50 50.4 L20.5 66.4 L31.7 41.2 L12.2 25.2 L38.8 25.2 Z" transform="rotate(-45 50 50) scale(1.2)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                    <span className="text-4xl">50%</span>
                    <span className="text-xs -mt-1">DISCOUNT</span>
                </div>
            </div>

        </div>

        <div className="flex justify-center items-center gap-4 mt-12 opacity-50">
            <span className="w-16 h-px bg-gray-400"></span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
            <span className="w-16 h-px bg-gray-400"></span>
        </div>

      </div>
    </section>

    <section className="bg-gray-900 py-16">
    <div className="max-w-7xl mx-auto px-4">
        {/* Judul Seksi */}
        <div className="text-center mb-12 text-white">
            <div className="flex justify-center items-center gap-4 mb-4">
                <svg className="w-8 h-8 text-yellow-500" viewBox="0 0 100 20"><path d="M0 10 L40 10 L50 0 L60 10 L100 10" fill="none" stroke="currentColor" strokeWidth="3"/></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
                Kenalan Yuk sama Team Kami
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
                <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6 M6 15l6 6 6-6" /></svg>
                <p className="text-lg text-gray-300">
                    Kenalan lebih Dalam sama Super Team di Agensi Digital Marketing kami
                </p>
                <svg className="w-6 h-6 text-yellow-500 transform -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6 M6 15l6 6 6-6" /></svg>
            </div>
        </div>

        {/* Komponen Slider Tim */}
        <TeamSlider />

         <div className="flex justify-center items-center gap-4 mt-12">
            <svg className="w-8 h-8 text-yellow-500 transform rotate-180" viewBox="0 0 100 20"><path d="M0 10 L40 10 L50 0 L60 10 L100 10" fill="none" stroke="currentColor" strokeWidth="3"/></svg>
        </div>
    </div>
</section>

{/* ===== SEKSI QUOTES OF THE DAY DIMULAI DI SINI ===== */}
    <section className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        
        {/* Hiasan Atas */}
        <div className="flex justify-center items-center text-yellow-500">
          <span className="flex-grow h-px bg-yellow-500/50"></span>
          <svg className="w-20 h-8 mx-2" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 C20 0, 40 0, 50 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M70 20 C80 0, 100 0, 120 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M55 20 L60 15 L65 20 L60 25 Z" fill="currentColor"/>
          </svg>
          <span className="flex-grow h-px bg-yellow-500/50"></span>
        </div>

        {/* Judul */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 my-4 tracking-wide">
          QUOTES OF THE DAY
        </h2>

        {/* Kutipan */}
        <p className="text-2xl md:text-3xl font-serif italic text-gray-700 my-6 leading-relaxed">
          “Miskin itu bukan identitas, cuma titik start. Dan kamu berhak finish di tempat yang jauh lebih tinggi.”
        </p>
        
        {/* Hiasan Bawah */}
        <div className="flex justify-center items-center text-yellow-500 transform rotate-180">
          <span className="flex-grow h-px bg-yellow-500/50"></span>
          <svg className="w-20 h-8 mx-2" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 C20 0, 40 0, 50 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M70 20 C80 0, 100 0, 120 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M55 20 L60 15 L65 20 L60 25 Z" fill="currentColor"/>
          </svg>
          <span className="flex-grow h-px bg-yellow-500/50"></span>
        </div>

      </div>
    </section>

    
    {/* ===== SEKSI PROGRAM AFILIASI DIMULAI DI SINI ===== */}
    <section className="bg-gray-100 pt-0 pb-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        
        {/* Hiasan Atas */}
        <div className="flex justify-center items-center text-yellow-500">
          <span className="flex-grow h-px bg-yellow-500/50"></span>
          <svg className="w-20 h-8 mx-2" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 C20 0, 40 0, 50 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M70 20 C80 0, 100 0, 120 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M55 20 L60 15 L65 20 L60 25 Z" fill="currentColor"/>
          </svg>
          <span className="flex-grow h-px bg-yellow-500/50"></span>
        </div>

        {/* Konten */}
        <div className="text-gray-800 my-6">
            <h3 className="text-2xl md:text-3xl font-extrabold">
                Program Afiliasi Resmi LiiyStore.id
            </h3>
            <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto leading-relaxed">
                Bantu rekomendasikan produk digital kami dan dapatkan komisi sampai 40%. Cocok buat pemula, content creator, reseller digital, atau siapa aja yang mau cuan tambahan dari rumah!
            </p>
            <a 
                href="#" 
                className="inline-block mt-6 font-bold text-gray-800 py-3 px-8 bg-gray-100 border-2 border-gray-500 hover:bg-white hover:border-gray-800 transition-all duration-300 shadow-md"
            >
                Pelajari Selengkapnya
            </a>
        </div>

        {/* Hiasan Bawah */}
        <div className="flex justify-center items-center text-yellow-500 transform rotate-180">
          <span className="flex-grow h-px bg-yellow-500/50"></span>
          <svg className="w-20 h-8 mx-2" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20 C20 0, 40 0, 50 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M70 20 C80 0, 100 0, 120 20" stroke="currentColor" strokeWidth="2"/>
            <path d="M55 20 L60 15 L65 20 L60 25 Z" fill="currentColor"/>
          </svg>
          <span className="flex-grow h-px bg-yellow-500/50"></span>
        </div>

      </div>
    </section>



    </main>
  );
}