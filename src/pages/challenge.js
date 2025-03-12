import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaMedal, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Challenge() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const [coins, setCoins] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedCoins = JSON.parse(localStorage.getItem('coins')) || 0;
    const savedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setCoins(savedCoins);
    setPurchases(savedPurchases);
    setLeaderboard(generateLeaderboard(savedCoins));
  }, []);

  useEffect(() => {
    localStorage.setItem('coins', JSON.stringify(coins));
    localStorage.setItem('purchases', JSON.stringify(purchases));
    setLeaderboard(generateLeaderboard(coins));
  }, [coins, purchases]);

  const generateLeaderboard = (userCoins) => {
    let dummyUsers = [
      { name: 'Ayu', coins: 120 },
      { name: 'Budi', coins: 100 },
      { name: 'Citra', coins: 80 },
    ];
    dummyUsers.push({ name: 'Kamu', coins: userCoins });
    return dummyUsers.sort((a, b) => b.coins - a.coins);
  };

  const purchaseProduct = (product) => {
    setPurchases([...purchases, product]);
    setCoins(coins + 10);
  };

  const redeemProduct = (product) => {
    if (coins >= product.priceInCoins) {
      setCoins(coins - product.priceInCoins);
      setPurchases([...purchases, product]);
      alert(`Produk ${product.name} berhasil dibeli dengan koin!`);
    } else {
      alert('Koin tidak cukup!');
    }
  };

  const products = [
    { id: 18, name: 'Regular Fit Casual Hoodie', priceInCoins: 50, image: '/produk/18/1.png' },
    { id: 19, name: 'Viscose Lightweight Shirt Dress', priceInCoins: 80, image: '/produk/19/1.png' },
    { id: 1, name: 'Regular Fit Casual Hoodie', priceInCoins: 50, image: '/produk/1/1.png' },
    { id: 2, name: 'Viscose Lightweight Shirt Dress', priceInCoins: 80, image: '/produk/2/1.png' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-10">
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
              Challenge
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

      <div className="container mx-auto px-6 lg:px-16 mb-10">
        <div className="text-center mb-8 sm:mb-12 mt-12 sm:mt-16 px-4 sm:px-6 lg:px-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-800">
            Kumpulkan Koin dari Setiap Pembelian
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-lg sm:max-w-xl mx-auto">
            Setiap pembelian produk di platform ini akan memberikanmu koin, yang bisa digunakan untuk membeli produk lagi!
          </p>
        </div>

        <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-sm sm:max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-green-700">Koin Kamu: {coins} 🪙</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: `${Math.min(coins, 100)}%` }}></div>
        </div>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Level: {Math.floor(coins / 100) + 1}</p>
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-800">
          Produk yang Bisa Dibeli dengan Koin
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl text-center"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg mx-auto"
              />
              <h4 className="mt-4 text-lg sm:text-xl text-black font-semibold">{product.name}</h4>
              <p className="text-base sm:text-lg font-bold text-green-700">{product.priceInCoins} Koin</p>
              <button
                className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-3xl mt-2 hover:bg-green-500 transition"
                onClick={() => redeemProduct(product)}
              >
                Beli
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-800">Riwayat Pembelian</h3>
        {purchases.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada transaksi.</p>
        ) : (
          <ul className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-lg sm:max-w-2xl mx-auto">
            {purchases.map((item, index) => (
              <li key={index} className="border-b last:border-none py-2 flex items-center space-x-4">
                <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-lg" />
                <span className="text-gray-700 text-sm sm:text-base">{item.name} - <span className="font-bold text-green-700">{item.priceInCoins} Koin</span></span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-800">Leaderboard</h3>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md max-w-lg sm:max-w-2xl mx-auto">
          <ul className="space-y-3">
            {leaderboard.map((user, index) => (
              <li key={index} className="flex items-center py-2 text-sm sm:text-base">
                <FaMedal className={
                  index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-orange-600"
                } />
                <span className="ml-3 font-semibold text-gray-700">{user.name}</span>
                <span className="ml-auto font-bold text-green-700">{user.coins} Koin</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      
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