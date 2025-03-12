// pages/chat.js
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  // Dummy data percakapan
  const sellers = [
    {
      id: 101,
      name: 'Thrift Corner',
      profileImage: '/logotoko/corner.png',
      messages: [
        { sender: 'seller', text: 'Halo, ada yang bisa saya bantu?' },
        { sender: 'user', text: 'Apakah produk ini masih tersedia?' },
        { sender: 'seller', text: 'Ya, masih tersedia kak!' },
      ],
    },
    {
      id: 102,
      name: 'EcoChic Boutique',
      profileImage: '/logotoko/eco.png',
      messages: [
        { sender: 'user', text: 'Bahan produk ini dari apa ya?' },
        { sender: 'seller', text: 'Terbuat dari bahan daur ulang, kak.' },
      ],
    },
    {
      id: 103,
      name: 'Sporty Wearhouse',
      profileImage: '/logotoko/sporty.png',
      messages: [
        { sender: 'user', text: 'Bahan produk ini dari apa ya?' },
        { sender: 'seller', text: 'Terbuat dari bahan daur ulang, kak.' },
      ],
    },
  ];

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const router = useRouter();
  const { storeId } = router.query; // Ambil storeId dari URL

  const [selectedSeller, setSelectedSeller] = useState(sellers[0]);
  const [newMessage, setNewMessage] = useState('');
  const chatRoomRef = useRef(null); // Ref untuk scrolling ke room chat

  // Ganti percakapan saat penjual dipilih
  const selectSeller = (seller) => {
    setSelectedSeller(seller);
  };

  useEffect(() => {
    if (storeId) {
      const seller = sellers.find((s) => s.id === parseInt(storeId));
      if (seller) setSelectedSeller(seller);
    }
  }, [storeId]);

  // Kirim pesan baru
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setSelectedSeller((prevSeller) => ({
        ...prevSeller,
        messages: [
          ...prevSeller.messages,
          { sender: 'user', text: newMessage },
        ],
      }));
      setNewMessage('');
    }
  };

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
              Kirim Pesan
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

      <div className="container mx-auto px-6 lg:px-16 mt-16 mb-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Daftar Percakapan */}
          <div className="md:w-1/3 bg-white shadow-lg rounded-3xl p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Daftar Chat
            </h2>
            <ul className="space-y-4">
              {sellers.map((seller) => (
                <li
                  key={seller.id}
                  onClick={() => selectSeller(seller)}
                  className={`cursor-pointer p-4 rounded-lg transition hover:bg-yellow-100 ${
                    selectedSeller.id === seller.id
                      ? 'bg-yellow-100'
                      : 'bg-gray-50'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {seller.name}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
          {/* Room Chat */}
          <div 
            className="md:w-2/3 bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between mt-6" 
          >
            {/* Area Percakapan */}
          <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between">
            {/* Header Chat: Gambar Profil & Nama Toko + Area Percakapan */}
      <div className="flex flex-col">
        {/* Informasi Toko */}
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-300 mb-4">
          <img
            src={selectedSeller.profileImage}
            alt={selectedSeller.name}
            className="w-12 h-12 rounded-full border"
          />
          <h2 className="text-lg font-semibold text-gray-800">{selectedSeller.name}</h2>
        </div>

        {/* Percakapan */}
        <div className="overflow-y-auto h-96 space-y-4 mb-4">
          {selectedSeller.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs p-4 rounded-lg shadow ${
                  message.sender === 'user'
                    ? 'bg-yellow-400 text-gray-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>


            {/* Input Pesan */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendMessage();
                }}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-yellow-400"
              />
              <button
                onClick={sendMessage}
                className="bg-yellow-400 text-gray-800 p-3 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
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
