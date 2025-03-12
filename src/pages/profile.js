// pages/profile.js
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaUser, FaKey, FaBell, FaCreditCard, FaShoppingBag, FaGift, FaCoins, FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: 'Silvia',
    name: '',
    email: 'farhan.silvia@ryzmo.com',
    phone: '081234567890',
    storeName: 'Ryzmo Store',
    gender: '',
    birthDate: { day: '', month: '', year: '' },
    avatar: '/profilesil.png',
  });

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle perubahan input di form profile
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Upload gambar dan preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle perubahan input di form login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Login dan hilangkan popup
  const handleLogin = () => {
    setIsLoggedIn(true); // Langsung berhasil login
    alert('Berhasil masuk!');
  };

  const saveChanges = () => {
    alert('Perubahan berhasil disimpan!');
  };

  // Cek login saat pertama kali masuk
  useEffect(() => {
    if (!isLoggedIn) {
      // Munculkan popup sign in jika belum login
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bankName: 'Bank BCA', accountNumber: '1234 5678 9012', accountHolder: 'Silvia' },
  ]);
  const [newBank, setNewBank] = useState({ bankName: '', accountNumber: '', accountHolder: '' });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setNewBank({ ...newBank, [name]: value });
  };

  const addBankAccount = () => {
    if (newBank.bankName && newBank.accountNumber && newBank.accountHolder) {
      setBankAccounts([...bankAccounts, { id: bankAccounts.length + 1, ...newBank }]);
      setNewBank({ bankName: '', accountNumber: '', accountHolder: '' });
    } else {
      alert('Mohon isi semua data rekening.');
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage('Mohon isi semua kolom.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Konfirmasi password baru tidak cocok.');
      return;
    }
    setMessage('Password berhasil diperbarui!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    promotions: false,
  });

  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const saveSettings = () => {
    alert('Pengaturan notifikasi berhasil disimpan!');
  };

  const [orders, setOrders] = useState([
    { id: 1, product: 'Regular Fit Linen Trousers', status: 'Diproses', date: '2025-03-05', total: 'Rp175.000' },
    { id: 2, product: 'Sequined Tulle Balloon Dress', status: 'Dikirim', date: '2025-03-02', total: 'Rp200.000' },
    { id: 3, product: 'Slim Fit Cotton Trousers', status: 'Selesai', date: '2025-02-28', total: 'Rp180.000' },
  ]);

  const [vouchers, setVouchers] = useState([
    { id: 1, code: 'DISKON50', description: 'Diskon 50% untuk pembelian pertama', expiry: '2025-06-30', status: 'Aktif' },
    { id: 2, code: 'GRATISONGKIR', description: 'Gratis ongkir untuk pembelian di atas Rp100.000', expiry: '2025-05-15', status: 'Aktif' },
    { id: 3, code: 'FLASHSALE25', description: 'Diskon 25% khusus produk flash sale', expiry: '2025-03-10', status: 'Kadaluarsa' },
  ]);

  const [coins, setCoins] = useState(1500);
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Donasi pakaian', date: '2025-01-15', amount: 500 },
    { id: 2, description: 'Pembelian produk', date: '2025-02-10', amount: 700 },
    { id: 3, description: 'Pembelian produk', date: '2025-03-01', amount: 300 },
  ]);


  return (
    <main className="bg-gray-100 min-h-screen pt-20 relative">
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
              Profile
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

      {/* Popup Sign In */}
      {!isLoggedIn && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50 backdrop-blur">
          <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-lg transform transition-all duration-300 ease-in-out scale-105">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sign In</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleLogin}
                className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigasi */}
          <div className="md:w-1/4 bg-white shadow-lg rounded-3xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-400">
                <Image
                  src={selectedImage || formData.avatar}
                  alt={formData.username}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {formData.username}
                </h3>
                <button className="text-sm text-yellow-500 hover:underline">
                  Ubah Profil
                </button>
              </div>
            </div>
            <ul className="space-y-4">
            {[
              { key: 'profile', label: 'Profil', icon: FaUser },
              { key: 'bank', label: 'Bank & Kartu', icon: FaCreditCard },
              { key: 'password', label: 'Ubah Password', icon: FaKey },
              { key: 'notifications', label: 'Pengaturan Notifikasi', icon: FaBell },
              { key: 'orders', label: 'Pesanan Saya', icon: FaShoppingBag },
              { key: 'vouchers', label: 'Voucher Saya', icon: FaGift },
              { key: 'coins', label: 'Koin Saya', icon: FaCoins },
            ].map(({ key, label, icon: Icon }) => (
              <li key={key} className={`cursor-pointer flex items-center space-x-2 p-2 rounded-lg transition ${activeTab === key ? 'text-yellow-500 font-semibold bg-gray-200' : 'text-gray-600 hover:text-yellow-500'}`} onClick={() => setActiveTab(key)}>
                <Icon /> <span>{label}</span>
              </li>
            ))}
          </ul>
          </div>

          {/* Form Profil Akun */}
          <div className="md:w-3/4 bg-white shadow-lg rounded-3xl p-6">
          
          {activeTab === 'profile' && (
            <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Profil Saya</h2>
              <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      className="w-full px-4 py-2 rounded-full border border-gray-300 text-black bg-gray-100"
                      disabled
                    />
                  </div>
                
                  <div>
                    <label className="block text-gray-600">Nama</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                
                  <div>
                    <label className="block text-gray-600">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      className="w-full px-4 py-2 rounded-full border border-gray-300 text-black bg-gray-100"
                      disabled
                    />
                  </div>
                
                  <div>
                    <label className="block text-gray-600">Pilih Gambar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 rounded-full border text-gray-500 border-gray-300 focus:outline-none focus:border-yellow-400"
                    />
                    <small className="text-gray-500">
                      Ukuran gambar: maks. 1 MB | Format: JPEG, PNG
                    </small>
                  </div>
              </div>
                
              <div className="text-right mt-6">
                <button
                  onClick={saveChanges}
                  className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
                >
                  Simpan
                </button>
              </div>
            </div>
          )}

          {activeTab === 'bank' && <div className="bg-white shadow-lg rounded-3xl p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Bank & Kartu</h2>

            <div className="space-y-4">
              {bankAccounts.map((bank) => (
                <div key={bank.id} className="p-4 border border-gray-300 rounded-lg">
                  <p className="font-bold text-gray-800">{bank.bankName}</p>
                  <p className="text-gray-600">{bank.accountNumber}</p>
                  <p className="text-gray-600">Pemilik: {bank.accountHolder}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Tambah Rekening</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="bankName"
                  placeholder="Nama Bank"
                  value={newBank.bankName}
                  onChange={handleChange2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Nomor Rekening"
                  value={newBank.accountNumber}
                  onChange={handleChange2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <input
                  type="text"
                  name="accountHolder"
                  placeholder="Nama Pemilik"
                  value={newBank.accountHolder}
                  onChange={handleChange2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={addBankAccount}
                  className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition w-full"
                >
                  Tambah Rekening
                </button>
              </div>
            </div>
          </div>}

          {activeTab === 'password' && <div className="bg-white shadow-lg rounded-3xl p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ubah Password</h2>

            {message && <p className="text-center text-red-500 mb-4">{message}</p>}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Password Saat Ini</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-gray-600">Password Baru</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-gray-600">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="text-right mt-6">
              <button
                onClick={handleSubmit}
                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition w-full"
              >
                Simpan Password
              </button>
            </div>
          </div>}

          {activeTab === 'notifications' && <div className="bg-white shadow-lg rounded-3xl p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pengaturan Notifikasi</h2>
            <p className="text-gray-600 mb-6">Pilih bagaimana Anda ingin menerima notifikasi.</p>

            <div className="space-y-4">
              {[
                { key: 'email', label: 'Notifikasi melalui Email' },
                { key: 'sms', label: 'Notifikasi melalui SMS' },
                { key: 'push', label: 'Notifikasi melalui Aplikasi' },
                { key: 'orderUpdates', label: 'Update Status Pesanan' },
                { key: 'promotions', label: 'Promo & Penawaran Khusus' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                  <span className="text-gray-800">{label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={() => handleToggle(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400 dark:peer-focus:ring-yellow-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-400"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="text-right mt-6">
              <button
                onClick={saveSettings}
                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition w-full"
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>}

          {activeTab === 'orders' && <div className="bg-white shadow-lg rounded-3xl p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pesanan Saya</h2>
            <p className="text-gray-600 mb-6">Lihat status pesanan Anda.</p>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{order.product}</p>
                    <p className="text-gray-600 text-sm">Tanggal: {order.date}</p>
                    <p className="text-gray-600 text-sm">Total: {order.total}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Diproses' ? 'bg-yellow-400 text-gray-800' :
                      order.status === 'Dikirim' ? 'bg-blue-400 text-white' :
                      'bg-green-500 text-white'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>}

          {activeTab === 'vouchers' && <div className="bg-white shadow-lg rounded-3xl p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Voucher Saya</h2>
            <p className="text-gray-600 mb-6">Lihat daftar voucher yang bisa digunakan.</p>

            <div className="space-y-4">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{voucher.code}</p>
                    <p className="text-gray-600 text-sm">{voucher.description}</p>
                    <p className="text-gray-600 text-sm">Berlaku hingga: {voucher.expiry}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      voucher.status === 'Aktif' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                    }`}
                  >
                    {voucher.status}
                  </span>
                </div>
              ))}
            </div>
          </div>}

          {activeTab === 'coins' && <div className="bg-white shadow-lg rounded-3xl p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FaCoins className="text-yellow-500" /> Koin Saya
        </h2>
        <p className="text-gray-600 mb-6">Total Koin Anda: <span className="font-bold text-yellow-500">{coins} Koin</span></p>

        <h3 className="text-lg font-bold text-gray-800 mb-3">Riwayat Koin</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">{transaction.description}</p>
                <p className="text-gray-600 text-sm">{transaction.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400 text-gray-800">
                +{transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>}

          </div>
        </div>
      </div>
      
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
