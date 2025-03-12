import { useState, useRef, } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Swap() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
      const [isNavbarVisible, setIsNavbarVisible] = useState(false);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef(null);

  return (
    <main className="bg-gray-100 min-h-screen pt-20">
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
              Tukar Pakaian
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

      <div className="container mx-auto text-center px-6 mt-14">
        
        {/* Keuntungan Menukar */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-10 max-w-lg sm:max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6 text-center">
          Keuntungan Tukar Pakaian
        </h2>
        <ul className="text-sm sm:text-lg text-gray-600 space-y-3 sm:space-y-4 list-inside text-left">
          <li>✅ Mengurangi limbah fashion dan mendukung keberlanjutan.</li>
          <li>✅ Harga lebih hemat, dapatkan potongan hingga 50%.</li>
          <li>✅ Memberikan kesempatan kedua bagi pakaian lama yang masih layak pakai.</li>
        </ul>
      </section>
        
        {/* Tata Cara Menukar */}
        <section className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-xl mb-10 max-w-lg sm:max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6 text-center">
          Cara Tukar Pakaian
        </h2>
        <div className="text-sm sm:text-lg text-gray-600 text-left">
          <ol className="list-decimal list-inside space-y-3 sm:space-y-4">
            <li><strong>Pilih</strong> produk apapun di marketplace.</li>
            <li><strong>Klik</strong> bagian "Tukar dengan baju bekas".</li>
            <li><strong>Harga</strong> akan otomatis berkurang sebesar 50%.</li>
          </ol>
        </div>
      </section>
        
        {/* Syarat & Ketentuan Penukaran */}
        <section className="py-10 bg-white rounded-3xl">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-green-800">
            Syarat & Ketentuan Penukaran
          </h2>
          <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg sm:max-w-3xl mx-auto">
            <ul className="text-sm sm:text-lg text-gray-600 space-y-3 sm:space-y-4 text-left">
              <li>✅ Pakaian yang akan ditukar harus dalam kondisi layak pakai, tanpa sobek atau noda yang sulit dihilangkan.</li>
              <li>✅ Pakaian yang ditukar harus termasuk dalam kategori yang sama (misalnya: atasan ditukar dengan atasan, celana dengan celana).</li>
              <li>✅ Penukaran hanya berlaku untuk produk dengan label "Dapat Ditukar" di marketplace.</li>
              <li>✅ Setelah penukaran, barang yang telah dikirimkan tidak dapat dikembalikan.</li>
              <li>✅ Promo potongan 50% hanya berlaku jika pakaian yang ditukar memenuhi semua syarat yang ditentukan.</li>
            </ul>
          </div>
        </div>
      </section>
        
        {/* Form Upload Foto Pakaian untuk Ditukar */}
        <section className="py-10 bg-gray-100">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-green-800">
            Upload Foto Pakaian untuk Ditukar
          </h2>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg sm:max-w-3xl mx-auto">
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 text-base sm:text-lg font-bold mb-2">
                  Upload Foto Pakaian
                </label>
                <input type="file" className="w-full p-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-500" />
              </div>
              <div>
                <label className="block text-gray-700 text-base sm:text-lg font-bold mb-2">
                  Kategori Pakaian
                </label>
                <select className="w-full p-2 border text-gray-400 border-gray-300 rounded-lg text-sm sm:text-base">
                  <option>Atasan</option>
                  <option>Bawahan</option>
                  <option>Dress</option>
                  <option>Jaket</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-base sm:text-lg font-bold mb-2">
                  Kondisi Pakaian
                </label>
                <select className="w-full p-2 border text-gray-400 border-gray-300 rounded-lg text-sm sm:text-base">
                  <option>Layak Pakai</option>
                  <option>Baru</option>
                  <option>Sedikit Cacat</option>
                </select>
              </div>
              <button className="bg-green-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition w-full text-sm sm:text-base">
                Kirim untuk Evaluasi
              </button>
            </form>
          </div>
        </div>
      </section>

        {/* Sistem Penilaian Kelayakan Otomatis (Dummy) */}
        <section className="py-10 bg-white rounded-3xl">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-green-800">
            Hasil Evaluasi Pakaian
          </h2>
          <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg sm:max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-gray-700">
              ✅ Pakaian Anda telah dievaluasi dan <span className="font-bold text-green-700">Layak Ditukar</span>.
            </p>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Jika pakaian Anda tidak memenuhi syarat, sistem akan memberikan saran perbaikan.
            </p>
            <button className="mt-6 bg-yellow-400 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 transition w-full text-sm sm:text-base">
              Lanjutkan Penukaran
            </button>
          </div>
        </div>
      </section>

        <section className="mt-10 bg-gray-100">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-green-800">
            Riwayat & Status Penukaran
          </h2>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg sm:max-w-3xl mx-auto">
            <ul className="text-sm sm:text-lg text-gray-600 space-y-3 sm:space-y-4 text-left">
              <li>📦 <strong>Pakaian Denim</strong> - Status: <span className="text-yellow-500">Dalam Proses</span></li>
              <li>✅ <strong>Kemeja Linen</strong> - Status: <span className="text-green-700">Selesai</span></li>
              <li>❌ <strong>Jaket Kulit</strong> - Status: <span className="text-red-500">Ditolak (Noda Berlebihan)</span></li>
            </ul>
          </div>
        </div>
      </section>

        {/* Pengiriman Barang untuk Ditukar */}
        <section className="py-10 mb-10 bg-gray-100">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-green-800">
            Pengiriman Barang untuk Ditukar
          </h2>

          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl max-w-lg sm:max-w-2xl mx-auto">
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 text-base sm:text-lg font-bold mb-2">
                  Nomor Resi Pengiriman
                </label>
                <input
                  type="text"
                  name="trackingNumber"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                  placeholder="Masukkan nomor resi"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-base sm:text-lg font-bold mb-2">
                  Upload Bukti Pengiriman (Opsional)
                </label>
                <input
                  type="file"
                  name="shipmentProof"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-500"
                />
              </div>

              <button className="w-full bg-green-700 text-white px-6 py-2 sm:py-3 rounded-full shadow-md hover:bg-green-600 transition">
                Kirim Informasi Pengiriman
              </button>
            </form>
          </div>

          <div className="mt-8 sm:mt-12 bg-gray-50 p-6 sm:p-10 rounded-2xl shadow-xl max-w-lg sm:max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6">Status Pengiriman</h3>
            <div className="text-sm sm:text-lg text-gray-600 space-y-3 sm:space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Nomor Resi:</span>
                <span>ABC123XYZ</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status Pengiriman:</span>
                <span className="text-yellow-500">Dalam Proses</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tanggal Pengiriman:</span>
                <span>5 Maret 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Estimasi Sampai:</span>
                <span>7 Maret 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>
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