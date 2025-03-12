import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaCheckCircle, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function RepairPage() {

  const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    condition: '',
    description: '',
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Data layanan perbaikan
  const services = [
    { id: 1, name: 'Jahit Robek', basePrice: 30000, image: '/perbaikan/1.png' },
    { id: 2, name: 'Ganti Kancing', basePrice: 15000, image: '/perbaikan/2.png' },
    { id: 3, name: 'Permak Celana', basePrice: 40000, image: '/perbaikan/3.png' },
    { id: 4, name: 'Resleting Baru', basePrice: 50000, image: '/perbaikan/4.png' },
  ];

  // Persentase kenaikan harga berdasarkan kondisi
  const conditionPriceMultiplier = {
    Ringan: 1.0, // Harga tetap
    Sedang: 1.5, // Tambah 50% dari harga dasar
    Parah: 2.0, // Tambah 100% dari harga dasar
  };

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'service' || name === 'condition') {
      updatePrice(name === 'service' ? value : formData.service, name === 'condition' ? value : formData.condition);
    }
  };

  // Perbarui harga berdasarkan layanan dan kondisi
  const updatePrice = (selectedService, selectedCondition) => {
    const service = services.find((s) => s.name === selectedService);
    if (service && selectedCondition) {
      const finalPrice = service.basePrice * (conditionPriceMultiplier[selectedCondition] || 1);
      setCalculatedPrice(finalPrice);
    } else {
      setCalculatedPrice(0);
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', service: '', condition: '', description: '' });
      setCalculatedPrice(0);
    }, 2000);
  };

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

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
              Perbaikan
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
      <section className="relative bg-green-700 text-white h-80 sm:h-96 flex flex-col items-center justify-center text-center px-4">
        <div className="mt-14 sm:mt-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Perbaiki Bajumu</h1>
          <p className="text-base sm:text-lg mt-4 max-w-lg sm:max-w-xl mx-auto">
            Jangan buang bajumu yang rusak! Perbaiki dengan layanan jahit terbaik kami.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-6 bg-yellow-400 text-gray-800 px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
          >
            Ajukan Perbaikan
          </button>
        </div>
      </section>

      {/* Daftar Layanan */}
      <section className="py-9">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-green-800">Layanan Perbaikan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-green-800 font-bold text-lg sm:text-2xl flex items-center justify-center h-16 sm:h-20 ${[
                    "bg-green-200",
                    "bg-yellow-200",
                    "bg-green-200",
                    "bg-yellow-200",
                  ][index % 4]}`}
                >
                  {service.name}
                </div>
                {hydrated && (
                  <p className="mt-4 text-base sm:text-lg font-bold text-gray-700">
                    Mulai dari <span className="text-green-800">Rp{service.basePrice.toLocaleString('id-ID')}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Formulir Perbaikan */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>

          <div className="relative bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-lg transform transition-all duration-300 ease-in-out scale-105 z-50">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition">
              <FaTimes className="text-2xl" />
            </button>

            <h2 className="text-3xl font-extrabold mb-6 text-green-800 text-center">Formulir Perbaikan</h2>

            {isSubmitted ? (
              <div className="text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <p className="text-lg font-semibold text-green-700">Permintaan berhasil dikirim!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold">Nama</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500" placeholder="Nama kamu" />
                </div>

                <div>
                  <label className="block text-gray-600 font-semibold">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500" placeholder="Email kamu" />
                </div>

                <div>
                  <label className="block text-gray-600 font-semibold">Layanan Perbaikan</label>
                  <select name="service" value={formData.service} onChange={handleChange} required className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500">
                    <option value="">Pilih Layanan</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 font-semibold">Kondisi Kerusakan</label>
                  <select name="condition" value={formData.condition} onChange={handleChange} required className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500">
                    <option value="">Pilih Kondisi</option>
                    <option value="Ringan">Ringan</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Parah">Parah</option>
                  </select>
                </div>

                {hydrated && calculatedPrice > 0 && (
        <p className="text-lg font-bold text-green-800 text-center">
          Estimasi Harga: Rp{calculatedPrice.toLocaleString('id-ID')}
        </p>
      )}

                <button type="submit" className="w-full bg-yellow-400 text-gray-800 px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300">Kirim Permintaan</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Pengiriman Barang untuk Diperbaiki */}
      <section className="py-5 mb-10 bg-gray-100">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-green-800">
            Pengiriman Barang untuk Diperbaiki
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
              <button className="w-full bg-green-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition text-sm sm:text-base">
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
