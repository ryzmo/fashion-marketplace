import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationProgress, setDonationProgress] = useState(750); // kg pakaian terkumpul
  const donationTarget = 1000;
  const [badge, setBadge] = useState(null);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    assignBadge(amount);
  };

  const handleCustomAmountChange = (e) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
    assignBadge(Number(e.target.value));
  };

  const assignBadge = (amount) => {
    if (amount >= 500000) {
      setBadge('Eco Champion');
    } else if (amount >= 100000) {
      setBadge('Green Supporter');
    } else {
      setBadge(null);
    }
  };

  const calculateImpact = (amount) => {
    const waterSaved = amount * 0.83; // 1kg pakaian menghemat 2500 liter air
    const carbonReduced = amount * 1.67; // 1kg pakaian mengurangi 5kg karbon
    return { waterSaved, carbonReduced };
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav
        className="fixed top-4 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out
        "
      >
        <div className="backdrop-blur-md bg-white/40 rounded-full shadow-lg px-6 md:px-16 py-3 flex items-center justify-between w-[90%] max-w-8xl border border-white/20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="filter invert" />
            <div className="text-md sm:text-sm md:text-xl lg:text-2xl text-green-800 font-bold">
              Donasi
            </div>
          </div>

          <div className="flex items-center justify-end w-full space-x-4">
            {/* Menu Utama - Desktop */}
            <ul className="hidden md:flex space-x-6 text-gray-800 transition-all duration-300 ease-in-out">
              <li><Link href="/" className="hover:text-yellow-500 transition">Home</Link></li>
              <li><Link href="/marketplace" className="hover:text-yellow-500 transition">Produk</Link></li>
              <li><a href="/#siklus" className="hover:text-yellow-500 transition">Siklus Hidup</a></li>
              <li><a href="/#campaign" className="hover:text-yellow-500 transition">Campaign</a></li>
            </ul>

            {/* Search & Icons */}
            <div className="flex items-center space-x-4 relative">
      {/* Search Input untuk Laptop */}
      <div
        className={`hidden md:flex items-center transition-all duration-300 ease-in-out overflow-hidden ${isSearchVisible ? "w-48 opacity-100" : "w-0 opacity-0"}`}
      >
        <input
          type="text"
          placeholder="Cari produk..."
          className="px-4 py-2 rounded-full focus:outline-none text-gray-700 w-full"
        />
        <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer ml-2" onClick={() => setIsSearchVisible(false)} />
      </div>
      
      <AnimatePresence>
  {isSearchVisible && (
    <motion.div
      initial={{ opacity: 0, y: 0 }} // Awalnya transparan & naik 50px
      animate={{ opacity: 1, y: 0 }}   // Muncul dengan opacity 1 & posisi normal
      exit={{ opacity: 0, y: 0 }}     // Menghilang dengan opacity 0 & naik ke atas lagi
      transition={{ duration: 0.3, ease: "easeInOut" }} // Durasi smooth 0.3s
      className="fixed right-0 w-full bg-white flex items-center px-4 rounded-full py-3 z-50 md:hidden shadow-md border-b border-gray-300"
    >
      <input
        type="text"
        placeholder="Cari produk..."
        className="flex-1 px-4 py-2 rounded-full focus:outline-none text-gray-700 border border-gray-300"
      />
      <FaTimes 
        className="text-gray-500 hover:text-red-500 cursor-pointer ml-3 text-2xl" 
        onClick={() => setIsSearchVisible(false)} // Menutup dengan transisi
      />
    </motion.div>
  )}
</AnimatePresence>

      {/* Search Icon */}
      <FaSearch
        className="text-black md:text-gray-600 text-xl cursor-pointer hover:text-yellow-500 transition"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      />

      {/* Icon Navbar */}
      <div className="hidden md:flex space-x-4 items-center text-gray-600">
        <Link href="/cart"><FaShoppingCart className="text-xl cursor-pointer hover:text-yellow-500 transition" /></Link>
        <Link href="/chat"><FaCommentDots className="text-xl cursor-pointer hover:text-yellow-500 transition" /></Link>
        <Link href="/profile"><FaUserCircle className="text-xl cursor-pointer hover:text-yellow-500 transition" /></Link>
      </div>

      {/* Hamburger Menu untuk Mobile */}
      <div className="md:hidden">
        <FaBars className="text-2xl text-black cursor-pointer hover:text-yellow-500 transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      </div>
    </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 w-50 h-screen backdrop-blur-md bg-white/30 shadow-lg flex flex-col items-end p-6 text-xl text-gray-800 z-40 rounded-l-3xl"
            >
              <div className="flex mb-6 border-b border-white/20 w-full justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-teal-800">
                  <X size={28} />
                </button>
              </div>
              <Link href="/" className="mb-4 hover:text-yellow-500 transition w-full" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/marketplace" className="mb-4 hover:text-yellow-500 transition w-full" onClick={() => setIsMobileMenuOpen(false)}>Produk</Link>
              <a href="#siklus" className="mb-4 hover:text-yellow-500 transition w-full" onClick={() => setIsMobileMenuOpen(false)}>Siklus Hidup</a>
              <a href="#campaign" className="mb-4 hover:text-yellow-500 transition w-full" onClick={() => setIsMobileMenuOpen(false)}>Campaign</a>
              <div className="flex space-x-6">
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaShoppingCart className="text-xl cursor-pointer hover:text-yellow-500 transition" />
                </Link>
                <Link href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaCommentDots className="text-xl cursor-pointer hover:text-yellow-500 transition" />
                </Link>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaUserCircle className="text-xl cursor-pointer hover:text-yellow-500 transition" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white h-80 flex items-center justify-center">
        <div className="text-center p-6 max-w-3xl mx-auto mt-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">Donasi Pakaian</h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-lg mx-auto">
            Berikan pakaian yang tidak terpakai untuk membantu sesama dan mengurangi limbah tekstil.
          </p>
        </div>
      </section>

      {/* Progress Bar Donasi */}
      <section className="py-12 px-6 md:px-16 text-center bg-green-50">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Progress Donasi</h2>
        <p className="text-lg text-gray-700 mb-4">Target: {donationTarget}kg pakaian | Terkumpul: {donationProgress}kg</p>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 text-white text-xs flex items-center justify-center rounded-full"
            style={{ width: `${(donationProgress / donationTarget) * 100}%` }}
          >
            {(donationProgress / donationTarget) * 100}% Tercapai
          </div>
        </div>
      </section>

      {/* Donasi Form */}
      <section className="py-16 px-6 md:px-16 bg-white rounded-3xl shadow-lg max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-8">Pilih Cara Donasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-3xl shadow-md text-center hover:shadow-2xl transition">
            <Image src="/donasi/1.png" alt="Donasi Pakaian" width={200} height={200} className="mx-auto rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-black">Donasi Pakaian</h3>
            <p className="text-gray-600 mb-4">Kirim pakaian layak pakai ke mitra kami dan bantu mereka yang membutuhkan.</p>
            <button className="bg-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
              Donasi Sekarang
            </button>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl shadow-md text-center hover:shadow-2xl transition">
            <Image src="/donasi/2.png" alt="Donasi Uang" width={200} height={200} className="mx-auto rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-black">Donasi Uang</h3>
            <p className="text-gray-600 mb-4">Dukung program edukasi dan distribusi pakaian dengan donasi uang.</p>
            <button className="bg-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
              Donasi Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Kalkulator Dampak Donasi */}
      <section className="py-12 px-6 md:px-16 text-center bg-green-50 rounded-3xl shadow-md max-w-3xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Kalkulator Dampak Donasi</h2>
        <input
          type="number"
          placeholder="Masukkan jumlah kg pakaian"
          className="border-2 border-green-500 rounded-lg p-4 w-full text-center text-xl text-black"
          value={customAmount}
          onChange={handleCustomAmountChange}
        />
        {customAmount && (
          <div className="mt-4 text-gray-700 text-lg">
            <p>🌊 Air yang dihemat: {calculateImpact(customAmount).waterSaved.toFixed(2)} liter</p>
            <p>🌍 Karbon yang dikurangi: {calculateImpact(customAmount).carbonReduced.toFixed(2)} kg</p>
          </div>
        )}
      </section>

      {/* Manfaat Donasi */}
      <section className="py-10 mb-10 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-10">Manfaat Donasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4 text-black">Kurangi Limbah</h3>
            <p className="text-gray-600">Setiap pakaian yang didonasikan mengurangi sampah tekstil.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4 text-black">Bantu Sesama</h3>
            <p className="text-gray-600">Donasimu membantu mereka yang membutuhkan pakaian layak.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4 text-black">Dukung Keberlanjutan</h3>
            <p className="text-gray-600">Bersama kita bisa menciptakan fashion yang lebih berkelanjutan.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <div className="container mx-auto px-6">
          
          {/* Menu Footer */}
          <ul className="flex flex-wrap justify-center space-x-6 mb-4">
            <li><a href="/swap" className="hover:text-yellow-500 transition">Tukar Pakaian</a></li>
            <li><a href="/repair" className="hover:text-yellow-500 transition">Perbaiki</a></li>
            <li><a href="/infografis" className="hover:text-yellow-500 transition">Artikel</a></li>
            <li><a href="/terms" className="hover:text-yellow-500 transition">Syarat</a></li>
            <li><a href="/privacy" className="hover:text-yellow-500 transition">Privasi</a></li>
            <li><a href="/about" className="hover:text-yellow-500 transition">Tentang</a></li>
          </ul>

          {/* Sosial Media */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-yellow-500 transition text-2xl"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-500 transition text-2xl"><FaTiktok /></a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">© 2025 Ryzmo. Built with 💚 for a greener future.</p>
        </div>
      </footer>

    </main>
  );
}