// pages/marketplace.js
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Marketplace() {

  const router = useRouter();

  const { category } = router.query; // Ambil kategori dari query

  // Dummy data produk
  const products = [
    { id: 1, name: 'Regular Fit Linen Trousers', price: 'Rp175.000', image: '/produk/1/1.png', categories: ['Pria'], description: 'Celana linen regular fit nyaman.' },
    { id: 2, name: 'Sequined Tulle Balloon Dress', price: 'Rp200.000', image: '/produk/2/1.png', categories: ['Kids'], description: 'Gaun tulle berpayet elegan modis.' },
    { id: 3, name: 'Slim Fit Cotton Trousers', price: 'Rp180.000', image: '/produk/3/1.png', categories: ['Pria'], description: 'Celana katun slim fit fleksibel.' },
    { id: 4, name: 'Tulle Puff Sleeve Dress', price: 'Rp190.000', image: '/produk/4/1.png', categories: ['Populer', 'Kids'], description: 'Gaun tulle dengan lengan puff.' },
    { id: 5, name: 'DryMove Pocket Sports Leggings', price: 'Rp220.000', image: '/produk/5/1.png', categories: ['Wanita'], description: 'Legging olahraga dengan kantong fungsional.' },
    { id: 6, name: 'DryMove Warm Running Leggings', price: 'Rp210.000', image: '/produk/6/1.png', categories: ['Wanita', 'Populer'], description: 'Legging lari hangat dan fleksibel.' },
    { id: 7, name: 'Regular Fit Linen Shirt', price: 'Rp175.000', image: '/produk/7/1.png', categories: ['Populer', 'Pria'], description: 'Kemeja linen regular fit kasual.' },
    { id: 8, name: 'Regular Fit Navy Linen Shirt', price: 'Rp195.000', image: '/produk/8/1.png', categories: ['Populer', 'Pria'], description: 'Kemeja linen navy regular fit.' },
    { id: 9, name: 'Oversized Fit Denim Shirt', price: 'Rp230.000', image: '/produk/9/1.png', categories: ['Populer', 'Wanita'], description: 'Kemeja denim oversized keren stylish.' },
    { id: 10, name: 'Classic Denim Casual Shirt', price: 'Rp185.000', image: '/produk/10/1.png', categories: ['Populer', 'Wanita'], description: 'Kemeja denim klasik santai nyaman.' },
    { id: 11, name: 'Graphic Printed Cotton T-Shirt', price: 'Rp165.000', image: '/produk/11/1.png', categories: ['Kids', 'Populer'], description: 'Kaos print unik dan nyaman.' },
    { id: 12, name: 'Tie-Belt Casual Shirt Dress', price: 'Rp250.000', image: '/produk/12/1.png', categories: ['Wanita'], description: 'Gaun kemeja dengan ikat pinggang.' },
    { id: 13, name: 'Loose Fit Basketball Jersey', price: 'Rp190.000', image: '/produk/13/1.png', categories: ['Populer', 'Pria'], description: 'Kaos basket loose fit sporty.' },
    { id: 14, name: 'Tie-Belt Stylish Shirt Dress', price: 'Rp180.000', image: '/produk/14/1.png', categories: ['Wanita'], description: 'Gaun kemeja ikat pinggang simple.' },
    { id: 15, name: 'Muscle Fit DryMove Top', price: 'Rp220.000', image: '/produk/15/1.png', categories: ['Pria'], description: 'Atasan olahraga muscle fit fleksibel.' },
    { id: 16, name: 'Oversized Crinkled Stylish Dress', price: 'Rp175.000', image: '/produk/16/1.png', categories: ['Wanita'], description: 'Gaun oversized dengan tekstur unik.' },
    { id: 17, name: 'DryMove Training Stretch Shorts', price: 'Rp210.000', image: '/produk/17/1.png', categories: ['Pria'], description: 'Celana pendek olahraga stretch fleksibel.' },
    { id: 18, name: 'Regular Fit Casual Hoodie', price: 'Rp195.000', image: '/produk/18/1.png', categories: ['Pria'], description: 'Hoodie regular fit kasual nyaman.' },
    { id: 19, name: 'Viscose Lightweight Shirt Dress', price: 'Rp165.000', image: '/produk/19/1.png', categories: ['Wanita'], description: 'Gaun kemeja viscose ringan lembut.' },
    { id: 20, name: 'Oversized Fit Printed Sweatshirt', price: 'Rp230.000', image: '/produk/20/1.png', categories: ['Populer', 'Populer'], description: 'Sweatshirt oversized dengan print keren.' },
];

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // Filter produk berdasarkan kategori
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.categories.includes(selectedCategory));

  return (
    <main className="bg-gray-100 min-h-screen pt-10">
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
              Marketplace
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 mt-14 mb-10">
      {/* Filter Kategori */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {["All", "Populer", "Pria", "Wanita", "Kids"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full shadow-md transition text-sm sm:text-base ${
              selectedCategory === category
                ? "bg-yellow-400 text-gray-800"
                : "bg-white text-gray-600 hover:bg-yellow-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            onClick={() => router.push(`/${product.id}`)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-auto"
            />
            <h3 className="mt-3 text-sm sm:text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {product.description}
            </p>
            <p className="text-sm sm:text-lg font-bold text-green-800 mt-2">
              {product.price}
            </p>
          </div>
        ))}
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
