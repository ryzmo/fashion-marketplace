import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = () => {
  const router = useRouter();
  const { productId, quantity, size } = router.query;
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State untuk mengatur pop-up

  const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef(null);

  useEffect(() => {
    // Ambil data produk berdasarkan ID produk (atau dari keranjang jika sudah ada)
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);

    if (productId) {
      const fetchedProduct = storedCartItems.find((item) => item.id === Number(productId));
      if (fetchedProduct) {
        // Tambahkan produk ke cartItems jika belum ada
        setCartItems((prevItems) => {
          const itemIndex = prevItems.findIndex((item) => item.id === fetchedProduct.id);
          if (itemIndex === -1) {
            return [...prevItems, { ...fetchedProduct, quantity: Number(quantity), size: size || fetchedProduct.sizes[0] }];
          }
          return prevItems;
        });
      }
    }
  }, [productId, quantity, size]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    // Logika untuk menempatkan order
    setIsOrderPlaced(true);
    // Tampilkan pop-up
    setShowPopup(true);
    
    // Simulasi pengiriman data ke server atau API untuk proses checkout
    setTimeout(() => {
      // Reset setelah order ditempatkan
      setIsOrderPlaced(false);
      localStorage.removeItem('cart'); // Mengosongkan keranjang setelah checkout
    }, 2000);
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
              Checkout
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

      <div className="container mx-auto px-6 lg:px-16 mt-16 pt-4 mb-10">
        {/* Ringkasan Belanja */}
        <div className="bg-white shadow-lg rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Ringkasan Pembelian</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Image src={item.images[0]} alt={item.name} width={80} height={80} className="rounded-lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                    <p className="text-yellow-500 font-bold">
                      Rp{item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="text-right space-x-4">
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <p className="text-lg font-bold text-green-800">
                    Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Keranjang Anda kosong.</p>
          )}
        </div>

        {/* Alamat Pengiriman */}
        <div className="bg-white shadow-lg rounded-3xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Alamat Pengiriman</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="Masukkan alamat lengkap"
          />
        </div>

        {/* Metode Pembayaran */}
        <div className="bg-white shadow-lg rounded-3xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Metode Pembayaran</h2>
          <div className="space-y-4">
            <div>
              <input
                type="radio"
                id="paymentMethod1"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
                className="mr-2"
              />
              <label htmlFor="paymentMethod1" className="text-black">Bayar di Tempat (COD)</label>
            </div>
            <div>
              <input
                type="radio"
                id="paymentMethod2"
                name="paymentMethod"
                value="Online"
                checked={paymentMethod === 'Online'}
                onChange={() => setPaymentMethod('Online')}
                className="mr-2"
              />
              <label htmlFor="paymentMethod2" className="text-black">Pembayaran Online</label>
            </div>
          </div>
        </div>

        {/* Total Harga dan Tombol Order */}
        {cartItems.length > 0 && (
          <div className="mt-8 bg-white shadow-lg rounded-3xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-black">Total Harga:</h3>
              <p className="text-3xl font-bold text-green-800">
                Rp{calculateTotal().toLocaleString('id-ID')}
              </p>
            </div>
            <button
              className="bg-green-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-600 hover:scale-105 transform transition duration-300"
              onClick={handlePlaceOrder}
              disabled={!address || !paymentMethod}
            >
              {isOrderPlaced ? 'Pesanan Ditempatkan!' : 'Pesan Sekarang'}
            </button>
          </div>
        )}
      </div>

      {/* Pop-up Konfirmasi Pembayaran */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold mb-4">Pembayaran Berhasil</h3>
            <p className="text-gray-600 mb-4">Pesanan Anda sedang diproses...</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-green-700 text-white px-6 py-2 rounded-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      
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
};

export default CheckoutPage;
