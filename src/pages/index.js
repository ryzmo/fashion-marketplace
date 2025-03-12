import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import SizeRecommendationPopup from '@/pages/size';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const [isSizePopupVisible, setIsSizePopupVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    { id: 7, name: 'Regular Fit Linen Shirt', price: 'Rp175.000', image: '/produk/7/1.png', categories: ['Populer', 'Pria'], description: 'Kemeja linen regular fit kasual.' },
    { id: 8, name: 'Regular Fit Navy Linen Shirt', price: 'Rp195.000', image: '/produk/8/1.png', categories: ['Populer', 'Pria'], description: 'Kemeja linen navy regular fit.' },
    { id: 9, name: 'Oversized Fit Denim Shirt', price: 'Rp230.000', image: '/produk/9/1.png', categories: ['Populer', 'Wanita'], description: 'Kemeja denim oversized keren stylish.' },
    { id: 10, name: 'Classic Denim Casual Shirt', price: 'Rp185.000', image: '/produk/10/1.png', categories: ['Populer', 'Wanita'], description: 'Kemeja denim klasik santai nyaman.' },
  ];

  


  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const sectionProdukPopuler = document.getElementById('layananpopuler');
      if (sectionProdukPopuler) { // Check if element exists
        const sectionOffset = sectionProdukPopuler.offsetTop;
        const scrollPosition = window.scrollY;
  
        if (scrollPosition >= sectionOffset - 100) {
          setIsNavbarVisible(true);
        } else {
          setIsNavbarVisible(false);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    // Add Event Listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup listeners saat komponen unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchVisible]);

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);
  
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-4 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out ${
          isNavbarVisible
              ? 'transform translate-y-0 opacity-100'
              : 'transform -translate-y-10 opacity-0'
        }`}
      >
        <div className="backdrop-blur-md bg-white/40 rounded-full shadow-lg px-6 md:px-16 py-3 flex items-center justify-between w-[90%] max-w-8xl border border-white/20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="filter invert" />
          </div>

          <div className="flex items-center justify-end w-full space-x-4">
            {/* Menu Utama - Desktop */}
            <ul className="hidden md:flex space-x-6 text-gray-800 transition-all duration-300 ease-in-out">
              <li><Link href="/" className="hover:text-yellow-500 transition">Home</Link></li>
              <li><Link href="/marketplace" className="hover:text-yellow-500 transition">Produk</Link></li>
              <li><a href="#siklus" className="hover:text-yellow-500 transition">Siklus Hidup</a></li>
              <li><a href="#campaign" className="hover:text-yellow-500 transition">Campaign</a></li>
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
      <section
  className="relative text-white h-screen flex items-center justify-center px-4 md:px-0"
  style={{
    backgroundImage: "url('/bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay hijau dengan opacity */}
  <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-green-900 opacity-85"></div>

  <div className="relative text-center p-4 md:p-6 max-w-2xl mx-auto mt-10 md:mt-20">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 text-white drop-shadow-lg">
      Ubah Gaya Hidupmu, <span className="text-yellow-400">Selamatkan Bumi</span>
    </h1>
    <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-200 drop-shadow-md">
      Belanja Fashion Berkelanjutan dan Kurangi Limbah Bersama Kami
    </p>
    <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
      <Link href="#layananpopuler">
        <button className="bg-yellow-400 text-gray-800 px-6 sm:px-8 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 duration-300 w-full sm:w-auto">
          Mulai Belanja
        </button>
      </Link>
      <Link href="#siklus">
        <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 sm:px-8 py-3 rounded-full hover:bg-yellow-400 hover:text-white transition-transform transform hover:scale-105 duration-300 w-full sm:w-auto">
          Siklus Hidup Fashion
        </button>
      </Link>
    </div>
    {/* Icon Panah ke Bawah */}
    <div className="mt-12 md:mt-20 animate-bounce">
      <Link href="#layananpopuler">
        <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
    </div>
  </div>
</section>


    <section id='layananpopuler' className="py-10 bg-gray-100">
  <div className="container mx-auto px-6 lg:px-16">
  <div className="grid grid-cols-5 sm:grid-cols-5 lg:flex lg:flex-wrap justify-center gap-2 sm:gap-2 lg:gap-8">

      
      <Link href="/marketplace">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/market.png" alt="Shopee Mall" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Marketplace</p>
        </div>
      </Link>

      <Link href={{ pathname: "/marketplace", query: { category: "Pria" } }}>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/men.png" alt="Pria" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Pria</p>
        </div>
      </Link>

      <Link href={{ pathname: "/marketplace", query: { category: "Wanita" } }}>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/women.png" alt="Wanita" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Wanita</p>
        </div>
      </Link>

      <div className="flex flex-col items-center">
        <div
          onClick={() => setIsSizePopupVisible(true)}
          className="cursor-pointer bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <Image src="/layanan/size.png" alt="Rekomendasi ukuran" width={50} height={50} />
        </div>
        <p className="text-sm text-gray-800 mt-2">Ukuran</p>
      </div>

      <Link href="/ugc">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/feed.png" alt="Feed OOTD" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">OOTD</p>
        </div>
      </Link>

      <Link href="/swap">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/tukar.png" alt="Tukar" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Tukar</p>
        </div>
      </Link>

      <Link href="/repair">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/perbaiki.png" alt="Perbaiki" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Perbaiki</p>
        </div>
      </Link>

      <Link href="/challenge">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/challenge.png" alt="Challenge" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Challenge</p>
        </div>
      </Link>

      <Link href="/donate">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/donate.png" alt="Donate" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Donate</p>
        </div>
      </Link>

      <Link href="#campaign">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <Image src="/layanan/campaign.png" alt="Campaign" width={50} height={50} />
          </div>
          <p className="text-sm text-gray-800 mt-2">Campaign</p>
        </div>
      </Link>

      {isSizePopupVisible && (
        <SizeRecommendationPopup
          isVisible={isSizePopupVisible}
          onClose={() => setIsSizePopupVisible(false)}
        />
      )}

    </div>
  </div>
</section>


      {/* Highlight Produk dan Kategori Populer */}
      <section id="produk-populer" className="py-">
        <div className="container mx-auto text-center px-6 lg:px-16">
          <h2 className="text-4xl font-extrabold mb-10 text-green-800">Produk Populer</h2>

          {/* Grid dengan 4 kolom di desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white p-6 rounded-2xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl"
                          onClick={() => router.push(`/${product.id}`)}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="rounded-lg"
                          />
                          <h3 className="mt-4 text-xl font-semibold text-black">{product.name}</h3>
                          <p className="text-gray-600">{product.description}</p>
                          <p className="text-lg font-bold text-green-800">{product.price}</p>
                        </div>
                      ))}
          </div>

          {/* Tombol Lihat Lainnya */}
          <Link href={{ pathname: "/marketplace", query: { category: "Populer" } }}>
          <div className="mt-10">
            <button className="bg-green-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-600 hover:scale-105 transform transition duration-300">
              Lihat Lainnya
            </button>
          </div>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-10 text-green-800">OOTD Komunitas</h2>
          <p className="text-lg mb-16 text-gray-600">Bagikan gaya OOTD-mu dengan tagar <span className="text-yellow-500">#EcoFashion</span> dan tampil di sini!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 lg:px-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl">
              <Image src="/ootd/1.jpg" alt="#EcoFashion OOTD by @user1" width={500} height={500} className="w-full h-full object-cover" />
              <div className="p-4">
                <p className="text-gray-800">#EcoFashion OOTD by @user1</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl">
              <Image src="/ootd/2.jpg" alt="#EcoFashion OOTD by @user2" width={500} height={500} className="w-full h-full object-cover" />
              <div className="p-4">
                <p className="text-gray-800">#EcoFashion OOTD by @user2</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl">
              <Image src="/ootd/3.jpg" alt="#EcoFashion OOTD by @user3" width={500} height={500} className="w-full h-full object-cover" />
              <div className="p-4">
                <p className="text-gray-800">#EcoFashion OOTD by @user3</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Link href='/ugc'><button className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300">Lihat Lebih Banyak OOTD</button></Link>
            
          </div>
        </div>
      </section>

      {/* Fashion Lifecycle Section */}
      <section id='siklus' className="py-20 bg-white">
        <div className="container mx-auto text-center px-6 lg:px-16">
          <h2 className="text-5xl font-extrabold mb-10 text-green-800">Siklus Hidup Fashion</h2>
          <p className="text-lg mb-16 text-gray-600">Jelajahi alur siklus hidup pakaian di platform kami untuk mendukung fashion berkelanjutan.</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {/* Beli */}
  <div className="bg-white p-10 rounded-3xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl border border-green-300 flex flex-col items-center text-center">
    <h3 className="text-3xl font-extrabold text-green-800 mb-4">Beli</h3>
    <p className="text-gray-600 mb-6 leading-relaxed hidden sm:hidden md:block">
      Dapatkan pakaian preloved berkualitas dengan harga terjangkau dan tetap stylish.
    </p>
    <a href="/marketplace" className="text-green-700 font-bold hover:underline transition">
      <span className="inline md:hidden">Jelajahi Sekarang<br/>→</span>
      <span className="hidden md:inline">Jelajahi Sekarang →</span>
    </a>
  </div>

  {/* Tukar */}
  <div className="bg-white p-10 rounded-3xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl border border-yellow-300 flex flex-col items-center text-center">
    <h3 className="text-3xl font-extrabold text-yellow-700 mb-4">Tukar</h3>
    <p className="text-gray-600 mb-6 leading-relaxed hidden sm:hidden md:block">
      Berikan pakaian lama Anda kesempatan baru dan tukarkan dengan sesuatu yang lebih menarik.
    </p>
    <a href="/swap" className="text-yellow-700 font-bold hover:underline transition">
      <span className="inline md:hidden">Mulai Tukar<br/>→</span>
      <span className="hidden md:inline">Mulai Tukar →</span>
    </a>
  </div>

  {/* Perbaiki */}
  <div className="bg-white p-10 rounded-3xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl border border-blue-300 flex flex-col items-center text-center">
    <h3 className="text-3xl font-extrabold text-blue-800 mb-4">Perbaiki</h3>
    <p className="text-gray-600 mb-6 leading-relaxed hidden sm:hidden md:block">
      Perpanjang umur pakaian favorit Anda dengan layanan perbaikan yang mudah dan efisien.
    </p>
    <a href="/repair" className="text-blue-700 font-bold hover:underline transition">
      <span className="inline md:hidden">Perbaiki Sekarang<br/>→</span>
      <span className="hidden md:inline">Perbaiki Sekarang →</span>
    </a>
  </div>

  {/* Donasi */}
  <div className="bg-white p-10 rounded-3xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl border border-red-300 flex flex-col items-center text-center">
    <h3 className="text-3xl font-extrabold text-red-800 mb-4">Donasi</h3>
    <p className="text-gray-600 mb-6 leading-relaxed hidden sm:hidden md:block">
      Bantu mereka yang membutuhkan dengan mendonasikan pakaian yang masih layak pakai.
    </p>
    <a href="/donate" className="text-red-700 font-bold hover:underline transition">
      <span className="inline md:hidden">Donasi Sekarang<br/>→</span>
      <span className="hidden md:inline">Donasi Sekarang →</span>
    </a>
  </div>
</div>


        </div>
      </section>

      {/* Campaign & Edukasi */}
      <section id='campaign' className="py-16 bg-gray-50">
        <div className="container mx-auto text-center px-6 lg:px-16">
          <h2 className="text-5xl font-extrabold mb-10 text-green-800">Campaign & Edukasi</h2>
          {/* Campaign Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-3xl p-10 shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl mb-10 mx-4 md:mx-0">
            <h3 className="text-3xl font-bold mb-4">Challenge Kumpulkan Koin</h3>
            <p className="text-lg mb-6">Ayo ikut tantangan dan mulai gaya hidup yang lebih berkelanjutan!</p>
            <Link href='/challenge'><button className="bg-gray-800 text-yellow-400 px-8 py-3 rounded-full shadow-md hover:bg-gray-700 transition duration-300">Ikut Tantangan</button></Link>
          </div>

          {/* Edukasi Singkat */}
          <div className="px-4 md:px-0 flex justify-center">
        <div className="bg-white p-6 rounded-3xl shadow-xl transform transition hover:-translate-y-2 hover:shadow-2xl w-fit flex flex-col items-center">
          <Image 
            src="/infografis.png" 
            alt="Infografis Limbah Tekstil" 
            width={900} 
            height={800} 
            className="rounded-lg"
          />
          <h4 className="mt-4 text-2xl font-semibold text-center text-black mb-2">Limbah Tekstil yang Mengancam Lingkungan</h4>
          <p className="text-gray-600 text-center">Ketahui dampak limbah tekstil dan cara menguranginya.</p>
          <Link href="/infografis">
            <button className="mt-4 bg-green-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition duration-300">
              Baca Selengkapnya
            </button>
          </Link>
        </div>
      </div>

        </div>
      </section>

      {/* Footer Informasi Lengkap */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6 lg:px-16">
          
          {/* Bergabung dengan Gerakan Kami */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Bergabung dengan Gerakan Kami</h3>
            <p className="text-gray-500 mb-4 text-justify">
              Dukung gerakan fashion berkelanjutan dan menjadi bagian dari perubahan positif untuk lingkungan. Ayo berkontribusi dalam mengurangi limbah fashion!
            </p>
            <ul className="space-y-2">
              <li><a href="/swap" className="hover:text-yellow-500 transition duration-300">Tukar Pakaian</a></li>
              <li><a href="/repair" className="hover:text-yellow-500 transition duration-300">Perbaiki Pakaian</a></li>
              <li><a href="/infografis" className="hover:text-yellow-500 transition duration-300">Baca Artikel Keberlanjutan</a></li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Ikuti Kami</h3>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-yellow-500 transition duration-300">
                  <FaInstagram className="text-2xl" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition duration-300">
                  <FaTiktok className="text-2xl" />
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi Legal */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Informasi Legal</h3>
            <ul>
              <li><a href="/terms" className="hover:text-yellow-500 transition duration-300">Syarat & Ketentuan</a></li>
              <li><a href="/privacy" className="hover:text-yellow-500 transition duration-300">Kebijakan Privasi</a></li>
              <li><span className="text-gray-600 text-sm">© 2025 Ryzmo</span></li>
            </ul>
          </div>

          {/* Tentang Kami */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Tentang Kami</h3>
            <p className="text-gray-500 mb-4 text-justify">
              Ryzmo adalah platform yang bertujuan menciptakan perubahan dalam industri fashion, mengurangi limbah, dan mendorong gaya hidup ramah lingkungan. Bergabunglah dalam gerakan untuk masa depan fashion yang lebih hijau!
            </p>
            <a href="/about" className="text-yellow-500 hover:text-white transition duration-300 font-semibold">Pelajari Lebih Lanjut →</a>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with 💚 by Ryzmo. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
