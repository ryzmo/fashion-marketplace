import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCommentDots, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
    const [userId, setUserId] = useState(null); // ➔ ini deklarasi userId
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const [cartCount, setCartCount] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [search, setSearch] = useState('');
const [category, setCategory] = useState('');
const [saldo, setSaldo] = useState(0);
const [hasNewMessage, setHasNewMessage] = useState(false);



  useEffect(() => {
    // Simulasikan ambil user dari localStorage atau fetch API session user
    const fetchUserId = async () => {
      const res = await fetch('/api/me'); // endpoint untuk cek user yang login
      const data = await res.json();
      setUserId(data.id);
    };
    fetchUserId();
  }, []);

useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch(`/api/search?search=${search}&category=${category}`);
    const data = await res.json();
    setProducts(data.products);
  };

  fetchProducts();
}, [search, category]);

const handleSubmit = (e) => {
  e.preventDefault();
  router.push(`/shop?search=${search}&category=${category}`); // ✅ hasil akhir
};

  
useEffect(() => {
  const fetchNewArrivalProducts = async () => {
    try {
      const res = await fetch('/api/products?category=New');
      const data = await res.json();
      if (res.ok) setProducts(data.products);
      else console.error('Gagal fetch produk:', data.message);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  fetchNewArrivalProducts();
}, []);

useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        console.log('User:', data);
        setUserId(data.id);
      } catch (err) {
        console.error('Gagal ambil user session:', err);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return; // ❗️ kalau belum ada userId, jangan fetch saldo

    const fetchSaldo = async () => {
      try {
        const res = await fetch(`/api/wallet/${userId}`);
        const data = await res.json();
        console.log('Saldo:', data.walletBalance);
        setSaldo(data.walletBalance || 0);
      } catch (err) {
        console.error('Gagal fetch saldo:', err);
      }
    };
    fetchSaldo();
  }, [userId]);

  useEffect(() => {
    if (!userId) return; // ⛔ jangan fetch kalau userId belum ada
  
    const fetchCartCount = async () => {
      try {
        const res = await fetch(`/api/cart/count/${userId}`);
        const data = await res.json();
        setCartCount(data.count);
      } catch (err) {
        console.error('Gagal ambil jumlah keranjang:', err);
      }
    };
  
    fetchCartCount(); // ✅ panggil setelah userId tersedia
  }, [userId]); // ✅ dependensinya userId
  
  useEffect(() => {
    if (!userId) return;
  
    const checkNewMessages = async () => {
      try {
        const res = await fetch(`/api/chat/unread-count?userId=${userId}`);
        const data = await res.json();
        setHasNewMessage(data.hasNewMessage);
      } catch (err) {
        console.error('Gagal cek pesan baru:', err);
      }
    };
  
    checkNewMessages();
    const interval = setInterval(checkNewMessages, 5000); // cek setiap 5 detik
  
    return () => clearInterval(interval);
  }, [userId]);
  
  
  return (
    <main>
              <div className='bg-black'>
          <p className='text-white text-xs text-center py-2'>LiiyStore Muslim Wear - Pusat Fashion Muslim Terlengkap di Indonesia</p>
        </div>
        <nav className="w-full border-b border-gray-200 py-2 px-4 shadow-sm bg-white z-50">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          
        <div className="w-full flex flex-row items-center gap-4 md:gap-20 justify-between md:pr-20 md:px-4">

  {/* Logo - fixed size */}
  <Link href="/">
  <div className="shrink-0">
    <img
      src="/logo.jpg"
      alt="Logo"
      className="w-10 h-10 md:w-20 md:h-20 object-contain"
    />
  </div>
  </Link>

  {/* Search - flexible */}
  <div className="flex-1 min-w-0">
    <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full">
      
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow px-3 py-1 md:py-2 focus:outline-none text-black min-w-0"
      />

      {/* Dropdown Mobile */}
      <select
  className="block md:hidden w-[40px] px-0 text-center border-l border-gray-300 text-sm text-gray-700 bg-white appearance-none"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">▼</option> {/* hanya tampilkan panah saat belum memilih */}
  <option value="Hijab">Pria</option>
  <option value="Dress">Wanita</option>
  <option value="Dress">Aksesoris</option>
</select>


      {/* Dropdown Desktop */}
      <select
        className="hidden md:block px-3 md:py-2 border-l text-gray-700 border-gray-300 text-sm bg-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Semua</option>
        <option value="Hijab">Pria</option>
        <option value="Dress">Wanita</option>
        <option value="Dress">Aksesoris</option>
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="px-2 md:py-2 text-gray-600 hover:text-black"
        title="Cari"
      >
        <FaSearch />
      </button>
    </form>
  </div>
  {/* Ikon dan Kontak */}
  <div className="flex flex-col text-gray-700 md:hidden">

  {/* Ikon utama dalam satu baris */}
  <div className="flex space-x-1 gap-1 text-sm">
  <Link href="/chat">
  <div className="relative">
    <FaCommentDots className="cursor-pointer hover:text-red-500" />
    {hasNewMessage && (
      <>
        <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full" />
      </>
    )}
  </div>
</Link>
    <Link href="/wishlist">
    <FaHeart className="cursor-pointer hover:text-red-500" />
    </Link>
    <Link href="/profile">
    <FaUser className="cursor-pointer hover:text-red-500" />
    </Link>
    <Link href="/cart">
    <div className="relative">
    <FaShoppingBag className="cursor-pointer hover:text-red-500" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
        {cartCount}
      </span>
    )}
  </div></Link>
  </div>

  {/* Total harga di bawah semua ikon */}
  <div className="flex items-center text-xs text-gray-600 cursor-pointer hover:text-red-500">
  <Link href="/wallet" className="flex items-center">
    <FaWallet className="mr-1" />
    {userId ? (
      <span>Rp {saldo.toLocaleString('id-ID')}</span>
    ) : (
      <span>Silakan login</span> // Kasih tulisan Loading kalau userId belum ada
    )}
  </Link>
</div>


</div>
{/* Hamburger Icon - Mobile only */}
<div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700 hover:text-red-500" />
          )}
        </button>
      </div>

      
</div>







{/* Kontak WhatsApp - hanya tampil di layar md ke atas */}
<div className="hidden md:flex flex-col items-start text-sm text-gray-700">
  <span className="font-semibold mb-1">Hubungi Kami via WhatsApp</span>
  <a href="https://wa.me/6287775465062"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition">
  <div className="flex items-center space-x-2">
    <FaPhoneAlt />
    <span className="font-medium">+62 87775465062</span>
  </div>
  </a>
</div>


          {/* Ikon dan Kontak */}
          <div className="flex flex-col space-y-2 text-gray-700">
  {/* Ikon utama dalam satu baris - hanya tampil di layar md ke atas */}
<div className="hidden md:flex space-x-4 text-xl">
<Link href="/chat">
  <div className="relative">
    <FaCommentDots className="cursor-pointer hover:text-red-500" />
    {hasNewMessage && (
      <>
        <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full" />
      </>
    )}
  </div>
</Link>


  <Link href="/wishlist">
    <FaHeart className="cursor-pointer hover:text-red-500" />
  </Link>
  <Link href="/profile">
    <FaUser className="cursor-pointer hover:text-red-500" />
  </Link>
  <Link href="/cart">
  <div className="relative">
    <FaShoppingBag className="cursor-pointer hover:text-red-500" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
        {cartCount}
      </span>
    )}
  </div>
</Link>

</div>


  {/* Total harga di bawah semua ikon */}
  <div className="hidden md:flex items-center text-sm text-gray-600 cursor-pointer hover:text-red-500">
  <Link href="/wallet" className="flex items-center">
    <FaWallet className="mr-1" />
    {userId ? (
      <span>Rp {saldo.toLocaleString('id-ID')}</span>
    ) : (
      <span>Silakan login</span>
    )}
  </Link>
</div>



</div>

        </div>

        {/* Tombol Belanja Sekarang */}
        <div className="w-full px-4 md:mb-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center md:mt-6 flex-wrap gap-4 relative">

            {/* Kiri: Kategori Dropdown */}
            <div className="relative hidden md:block">

              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-black gap-2 text-white px-4 md:py-2 rounded-full font-semibold hover:bg-gray-800 transition flex items-center"
              >
                <FaBars/>KATEGORI
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
  <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
    <ul className="text-sm text-gray-700">
      {['', 'Pria', 'Wanita', 'Aksesoris'].map((item) => (
        <li
          key={item}
          onClick={() => {
            const newCategory = item;
            setCategory(newCategory);
            setIsDropdownOpen(false);
            router.push(`/shop?category=${encodeURIComponent(newCategory)}`);
          }}
          className={`px-4 md:py-2 cursor-pointer hover:bg-gray-100 ${
            category === item ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          {item === '' ? 'Semua' : item}
        </li>
      ))}
    </ul>
  </div>
)}

            </div>

            

            {/* Tengah: Menu Navigasi - hanya tampil di md ke atas */}
<div className="hidden md:flex space-x-6 justify-center flex-1 text-gray-800 text-sm font-medium">
  <a href="/" className="hover:text-red-500 transition">Beranda</a>
  <a href="/shop" className="hover:text-red-500 transition">Produk</a>
  <a href="/companyprofile" className="hover:text-red-500 transition">Profil Kami</a>
  <a href="/mitra" className="hover:text-red-500 transition">Kemitraan</a>
  <a href="/blog" className="hover:text-red-500 transition">Blog</a>
  <a href="/bantuan" className="hover:text-red-500 transition">Bantuan</a>
</div>

  
{menuOpen && (
  <div className="fixed inset-0 z-40 md:hidden">
    {/* Background overlay + blur */}
    <div
      className="absolute inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-300"
      onClick={() => setMenuOpen(false)}
    />

    {/* Sidebar menu */}
    <div className="absolute right-0 top-0 h-full w-64 bg-white rounded-l-xl shadow-xl p-5 flex flex-col text-sm font-medium text-gray-800 transition-transform duration-300 transform translate-x-0">

      {/* Menu Link Items */}
      {[
        { href: "/", label: "Beranda" },
        { href: "/shop", label: "Produk" },
        { href: "/companyprofile", label: "Profil Kami" },
        { href: "/mitra", label: "Kemitraan" },
        { href: "/blog", label: "Blog" },
        { href: "/bantuan", label: "Bantuan" },
      ].map((item, i) => (
        <a
          key={i}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className="py-2 border-b last:border-b-0 hover:text-red-500 transition-colors"
        >
          {item.label}
        </a>
      ))}

      {/* Kontak WhatsApp */}
      <div className="pt-4 mt-auto border-t border-gray-200">
        <div className="text-gray-800 font-semibold mb-1">Hubungi Kami via WhatsApp</div>
        <a
          href="https://wa.me/6287775465062"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition"
        >
          <FaPhoneAlt className="text-base" />
          <span className="font-medium text-sm">+62 87775465062</span>
        </a>
      </div>

    </div>
  </div>
)}




            <div className="hidden md:flex justify-end">
  <Link href="/shop">
    <button className="bg-black text-white px-6 md:py-2 rounded-full font-semibold hover:bg-gray-800 transition">
      BELANJA SEKARANG
    </button>
  </Link>
</div>


          </div>
        </div>


      </nav>
    </main>
    
  );
}
