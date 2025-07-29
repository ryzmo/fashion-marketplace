import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import NewArrivalSection from './NewArrivalSection';
import BestSellingSection from './BestSellingSection';
import Navbar from './navbar';
import Footer from './footer';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const [isSizePopupVisible, setIsSizePopupVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const coupons = [
    {
      title: 'DISKON 10%',
      max: 'Maksimal IDR 10.000',
      min: 'Minimum Belanja IDR 100.000',
      image: '/kupon/KODEKUPON10K.jpg',
    },
    {
      title: 'DISKON 15%',
      max: 'Maksimal IDR 40.000',
      min: 'Minimum Belanja IDR 300.000',
      image: '/kupon/KODEKUPON40K.jpg',
    },
    {
      title: 'DISKON IDR 50.000',
      max: 'Maksimal IDR 50.000',
      min: 'Minimum Belanja IDR 500.000',
      image: '/kupon/KODEKUPON50K.jpg',
    },
    {
      title: 'FOLLOWER ONLY DISKON IDR 75.000',
      max: null,
      min: 'Minimum Belanja IDR 300.000',
      image: '/kupon/KODEKUPONFOLL.jpg',
    },
  ];

  const [search, setSearch] = useState('');
const [category, setCategory] = useState('');

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
        <Navbar/>
        <section className="bg-[#A7DED9] py-10 md:py-0">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-auto md:h-[500px] px-4">
    
    {/* Kiri: Teks */}
    <div className="md:w-1/2 text-center md:text-left px-0 md:px-6 mb-8 md:mb-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
        SELAMAT DATANG DI <br /> SITUS RESMI KAMI
      </h1>

      <div className="flex items-center justify-center md:justify-start mt-4">
        <span className="w-10 h-[2px] bg-gray-300 mr-3"></span>
        <p className="text-sm font-bold text-red-600 text-center md:text-left">
          HARGA JAUH LEBIH MURAH DIBANDING DI MARKETPLACE!
        </p>
        <span className="w-10 h-[2px] bg-gray-300 ml-3"></span>
      </div>

      <p className="text-gray-700 mt-4 text-base leading-relaxed">
  Yuk, jelajahi koleksi fashion muslim terbaru kami.
  <span className="hidden md:inline"><br /></span>
  Dirancang dengan sentuhan gaya islami yang modern serta
  <span className="hidden md:inline"><br /></span>
  kenyamanan maksimal untuk setiap momen istimewa-mu.
</p>


      <Link href="/shop">
      <button className="mt-6 bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition">
        BELANJA SEKARANG
      </button>
      </Link>
    </div>

    {/* Kanan: Gambar */}
    <div className="md:w-1/2 w-full flex items-end justify-center md:justify-end h-[300px] md:h-full">
      <img
        src="/assets/awalan.png"
        alt="Fashion Models"
        className="h-full object-contain"
      />
    </div>
  </div>
</section>


{/* Banner Pengiriman */}
<section className="bg-white md:py-12 py-6">
  <div className="max-w-5xl mx-auto px-4">
    <img
      src="/assets/BannerPengiriman.png"
      alt="Banner Pengiriman"
      className="w-full h-auto object-contain"
    />
  </div>
</section>

<section className="bg-white md:py-16">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* Card 1: Produk Terbaru */}
    <div className="bg-[#FDECE8] rounded-lg p-6 flex flex-col justify-between h-full">
      <div>
        <span className="inline-block border border-pink-300 text-pink-600 px-4 py-1 rounded-full text-xs font-semibold mb-4">
          PRODUK TERBARU
        </span>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          MODERN TAPI TETAP SYAR'I
        </h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <img
          src="/assets/hero1.png"
          alt="Produk Terbaru"
          className="h-64 object-contain mx-auto"
        />
        <a href="#NEW">
        <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition">
          JELAJAHI SEKARANG
        </button>
        </a>
      </div>
    </div>

    {/* Card 2: Best Seller */}
    <div className="bg-[#B5CFC6] rounded-lg p-6 flex flex-col justify-between h-full">
      <div>
        <span className="inline-block border border-white text-white px-4 py-1 rounded-full text-xs font-semibold mb-4">
          PRODUK BEST SELLING
        </span>
        <h3 className="text-center text-lg md:text-xl font-bold text-gray-800 mb-4 leading-relaxed">
          ANEKA PRODUK TERLARIS <br className="hidden sm:block" />
          DENGAN KUALITAS TERBAIK DI <br className="hidden sm:block" />
          TOKO KAMI
        </h3>
      </div>

      <div className="flex flex-wrap justify-center items-end gap-4 mt-4">
  <img
    src="/assets/hero2.png"
    alt="Produk Terlaris"
    className="h-40 flex-1 object-contain min-w-[120px]"
  />
  <img
    src="/assets/hero3.png"
    alt="Produk Terlaris"
    className="h-40 flex-1 object-contain min-w-[120px]"
  />
  
  <a href="#BEST">
  <button className="bg-black text-white text-xs rounded-full font-bold px-4 py-2 hover:bg-gray-800 transition w-full sm:w-auto mt-4 sm:mt-0">
    JELAJAHI SEKARANG
  </button>
  </a>
</div>

    </div>

    {/* Card 3: Diskon */}
    <div className="bg-[#C7D4E3] rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 h-full">
      {/* Gambar Diskon */}
      <div className="w-full md:w-auto flex-shrink-0 flex justify-center">
        <img
          src="/diskon.png"
          alt="Diskon"
          className="w-full max-w-[200px] h-auto object-contain"
        />
      </div>

      {/* Teks & Tombol */}
      <div className="text-center md:text-left flex flex-col md:justify-center justify-start w-full">
        <span className="inline-block border border-gray-400 text-pink-700 px-4 py-1 rounded-full text-xs font-semibold mb-4">
          PENAWARAN TERBAIK
        </span>

        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 leading-relaxed">
          NIKMATI PROMO DAN DISKON <br className="hidden sm:block" />
          KHUSUS WEBSITE KAMI
        </h3>

        <a href="#KUPON">
          <button className="bg-black text-white rounded-full text-xs font-bold px-6 py-2 hover:bg-gray-800 transition mx-auto md:mx-0">
          KLAIM SEKARANG
        </button>
        </a>
      </div>
    </div>

  </div>
</section>


      <section className="md:py-12 pt-6 bg-white">
  <div className="max-w-5xl mx-auto px-4">
    <img
      src="/ATAS1.png" // Ganti dengan path banner kamu
      alt="Banner Promosi"
      className="w-full h-auto object-contain rounded-lg shadow"
    />
  </div>
</section>

<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Fashion Muslim Perempuan
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
      {[
        { src: "/MuslimPerempuan/1.jpg", label: "Hijab dan Pashmina" },
        { src: "/MuslimPerempuan/2.jpg", label: "Mukena Anak - Remaja" },
        { src: "/MuslimPerempuan/3.jpg", label: "Gamis Baby Sampai Dewasa" },
        { src: "/MuslimPerempuan/4.jpg", label: "Mukena Dewasa Standar" },
        { src: "/MuslimPerempuan/5.jpg", label: "Mukena Dewasa Jumbo" },
        { src: "/MuslimPerempuan/6.jpg", label: "Mukena Travel" },
        { src: "/MuslimPerempuan/7.jpg", label: "Ciput/Dalaman Hijab" },
        { src: "/MuslimPerempuan/8.jpg", label: "Bros Aksesoris Hijab" },
        { src: "/MuslimPerempuan/9.jpg", label: "Ikat dan Jepit Rambut (Unisex)" },
        { src: "/MuslimPerempuan/10.jpg", label: "Manset Tangan Islami" },
        { src: "/MuslimPerempuan/11.jpg", label: "Kaos Kaki Islami" },
        { src: "/MuslimPerempuan/12.jpg", label: "Hijab Sekolah & Pramuka" },
        { src: "/MuslimPerempuan/13.jpg", label: "Hijab Syar'i" },
        { src: "/MuslimPerempuan/14.jpg", label: "Bergo Instan Couple Baby - Dewasa" },
        { src: "/MuslimPerempuan/15.jpg", label: "Bergo Instan - Rendra" },
        { src: "/MuslimPerempuan/16.jpg", label: "Bergo Instan - Sport" },
        { src: "/MuslimPerempuan/17.jpg", label: "Bergo Instan Anak - Jersey" },
        { src: "/MuslimPerempuan/18.jpg", label: "Pashmina - Non Plisket" },
        { src: "/MuslimPerempuan/19.jpg", label: "Pashmina - Plisket" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>


        );
      })}
    </div>
    {/* Gambar Banner di Bawah */}
    <div className="mt-6">
  <img
    src="/MuslimPerempuan/1A2.png"
    alt="Banner Perempuan"
    className="w-full max-w-[1000px] max-h-[300px] object-contain rounded mx-auto"
  />
</div>

  </div>
</section>

<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Fashion Muslim Laki-laki
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
      {[
        { src: "/MuslimLaki-laki/1.jpg", label: "Pakaian Koko Dewasa" },
        { src: "/MuslimLaki-laki/2.jpg", label: "Pakaian Koko Anak" },
        { src: "/MuslimLaki-laki/3.jpg", label: "Sarung Celana Anak - Dewasa" },
        { src: "/MuslimLaki-laki/4.jpg", label: "Sarung Dewasa" },
        { src: "/MuslimLaki-laki/5.jpg", label: "Sarung Anak" },
        { src: "/MuslimLaki-laki/6.jpg", label: "Pakaian Koko Dewasa Putih" },
        { src: "/MuslimLaki-laki/7.jpg", label: "Pakaian Koko Anak Putih" },
        { src: "/MuslimLaki-laki/8.jpg", label: "Jubah Koko Dewasa" },
        { src: "/MuslimLaki-laki/9.jpg", label: "Peci Miki Hat" },
        { src: "/MuslimLaki-laki/10.jpg", label: "Peci Turkey" },
        { src: "/MuslimLaki-laki/11.jpg", label: "Peci Rajut Oval" },
        { src: "/MuslimLaki-laki/12.jpg", label: "Peci Rajut Elastis" },
        { src: "/MuslimLaki-laki/13.jpg", label: "Peci Assagofah dan Terompah" },
        { src: "/MuslimLaki-laki/14.jpg", label: "Peci Nasional" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>

        );
      })}
    </div>
  </div>
</section>

<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
      Saksikan Video Kami
    </h2>

    <p className="text-center text-gray-600 mb-10">
      Lihat lebih dekat kualitas produk kami melalui video berikut:
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
  {/* Video */}
  <div className="aspect-video rounded-lg shadow overflow-hidden">
    <video
      className="w-full h-full object-cover"
      controls
      poster="/jashujan/thumbnail.png"
    >
      <source src="/MuslimPerempuan/2A2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Banner */}
  <div className="aspect-video rounded-lg shadow overflow-hidden bg-white flex items-center justify-center">
    <img
      src="/MuslimPerempuan/2AB.png"
      alt="Banner Samping Video"
      className="w-full h-full object-contain"
    />
  </div>
</div>

  </div>
</section>




<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Kopiah/Peci Nasional
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
      {[
        { src: "/Kopiah-PeciNasional/1.jpg", label: "Kopiah Polos" },
        { src: "/Kopiah-PeciNasional/2.jpg", label: "Kopiah Premium Exclusive" },
        { src: "/Kopiah-PeciNasional/3.jpg", label: "Kopiah Bordir Batik" },
        { src: "/Kopiah-PeciNasional/4.jpg", label: "Kopiah Sablon Batik" },
        { src: "/Kopiah-PeciNasional/5.jpg", label: "Kopiah Motif NU (Nahdlatul Ulama)" },
        { src: "/Kopiah-PeciNasional/6.jpg", label: "Kopiah Motif Kartun Favorit Anak" },
        { src: "/Kopiah-PeciNasional/7.jpg", label: "Kopiah Betawi" },
        { src: "/Kopiah-PeciNasional/8.jpg", label: "Kopiah Polos Biru" },
        { src: "/Kopiah-PeciNasional/9.jpg", label: "Kopiah Motif Tauhid" },
        { src: "/Kopiah-PeciNasional/10.jpg", label: "Kopiah Bordir Kujang" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>

        );
      })}
    </div>
  </div>
</section>

<section className="md:py-12 pt-12 bg-white">
  <div className="max-w-5xl mx-auto px-4">
    <img
      src="/4A5.png" // Ganti dengan path banner kamu
      alt="Banner Promosi"
      className="w-full h-auto object-contain rounded-lg shadow"
    />
  </div>
</section>


<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Kopiah/Peci Tradisional
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
      {[
        { src: "/Kopiah-PeciTradisional/1.jpg", label: "Peci Assagofah & Terompah" },
        { src: "/Kopiah-PeciTradisional/2.jpg", label: "Peci Turkey" },
        { src: "/Kopiah-PeciTradisional/3.jpg", label: "Peci Miki Hat" },
        { src: "/Kopiah-PeciTradisional/4.jpg", label: "Peci Khas Malaysia" },
        { src: "/Kopiah-PeciTradisional/5.jpg", label: "Peci Rajut Oval" },
        { src: "/Kopiah-PeciTradisional/6.jpg", label: "Peci Rajut Elastis" },
        { src: "/Kopiah-PeciTradisional/7.jpg", label: "Peci Khusus Haji" },
        { src: "/Kopiah-PeciTradisional/8.jpg", label: "Kopiah Rajut Priangan" },
        { src: "/Kopiah-PeciTradisional/9.jpg", label: "Terompah Motif Tauhid & NU" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>
        );
      })}
    </div>
  </div>
</section>
<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Perlengkapan Shalat
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
      {[
        { src: "/PerlengkapanShalat/1.jpg", label: "1. Sajadah Shalat - Besar" },
        { src: "/PerlengkapanShalat/2.jpg", label: "2. Sajadah Muka" },
        { src: "/PerlengkapanShalat/3.jpg", label: "3. Sajadah Travel" },
        { src: "/PerlengkapanShalat/4.jpg", label: "4. Tasbih Digital" },
        { src: "/PerlengkapanShalat/5.jpg", label: "5. Tasbih Kayu" },
        { src: "/PerlengkapanShalat/6.jpg", label: "6. Sarung Dewasa" },
        { src: "/PerlengkapanShalat/7.jpg", label: "6. Tasbih Mutiara" },
        { src: "/PerlengkapanShalat/8.jpg", label: "7. Sarung Dewasa" },
        { src: "/PerlengkapanShalat/9.jpg", label: "8. Sarung Celana Anak - Dewasa" },
        { src: "/PerlengkapanShalat/10.jpg", label: "9. Sarung Anak" },
        { src: "/PerlengkapanShalat/11.jpg", label: "10. Mukena Dewasa" },
        { src: "/PerlengkapanShalat/12.jpg", label: "11. Mukena Anak - Remaja" },
        { src: "/PerlengkapanShalat/13.jpg", label: "12. Mukena Travel" },
        { src: "/PerlengkapanShalat/14.jpg", label: "13. Kopiah_Peci Nasional" },
        { src: "/PerlengkapanShalat/15.jpg", label: "14. Kopiah_Peci Tradisional" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>

        );
      })}
    </div>
  </div>
</section>

<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Ciput/Dalaman Hijab
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 md:gap-10 scrollbar-hide">
      {[
        { src: "/Ciput-DalamanHijab/1.jpg", label: "Ciput Rajut - Anak.jpg" },
        { src: "/Ciput-DalamanHijab/2.jpg", label: "Ciput Rajut - Pita.jpg" },
        { src: "/Ciput-DalamanHijab/3.jpg", label: "Ciput Rajut - Persegi.jpg" },
        { src: "/Ciput-DalamanHijab/4.jpg", label: "Ciput Rajut - Kerut_Slouchy" },
        { src: "/Ciput-DalamanHijab/5.jpg", label: "Ciput Rajut - Topi" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>

        );
      })}
    </div>
  </div>
</section>

<section className="md:py-16 pt-12 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Kategori Aksesoris Hijab
    </h2>

    {/* Scrollable Row */}
    <div className="flex overflow-x-auto gap-4 md:gap-10 scrollbar-hide">
      {[
        { src: "/AksesorisHijab/1.jpg", label: "Bros_Pin Hijab" },
        { src: "/AksesorisHijab/2.jpg", label: "Jarum Pentul Hijab" },
        { src: "/AksesorisHijab/3.jpg", label: "Peniti Hijab" },
        { src: "/AksesorisHijab/4.jpg", label: "Ikat Rambut" },
        { src: "/AksesorisHijab/5.jpg", label: "Jepit Rambut" },
        // Tambah lainnya...
      ].map((item, idx) => {
        const slug = item.label.toLowerCase().replace(/\s+/g, '-'); // Buat slug URL-friendly

        return (
          <Link
  key={idx}
  href={`/kategori/${slug}`}
  className="block min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] flex-shrink-0"
>
  <div className="bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="w-full aspect-square rounded overflow-hidden mb-2 sm:mb-3">
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800 px-1">
      {item.label}
    </p>
  </div>
</Link>

        );
      })}
    </div>
  </div>
</section>

<section className="md:py-12 pt-12 bg-white">
  <div className="max-w-5xl mx-auto px-4">
    <img
      src="/dibawah7.png" // Ganti dengan path banner kamu
      alt="Banner Promosi"
      className="w-full h-auto object-contain rounded-lg shadow"
    />
  </div>
</section>

<section className="md:py-12 pt-12 bg-white">
  <div className="max-w-5xl mx-auto px-4">
    <img
      src="/dibawah7.2.png" // Ganti dengan path banner kamu
      alt="Banner Promosi"
      className="w-full h-auto object-contain rounded-lg shadow"
    />
  </div>
</section>

<section id="NEW">
      <NewArrivalSection />
</section>

<section id="BEST">
      <BestSellingSection />
</section>


<section id="KUPON" className="md:py-20 pt-14 bg-white relative z-0">
  <div className="max-w-7xl mx-auto px-4">
    {/* Title */}
    <div className="flex items-center justify-center mb-10">
      <div className="flex-grow h-px bg-gray-300" />
      <h2 className="mx-4 text-lg sm:text-xl font-bold px-6 py-2 bg-red-600 text-white rounded shadow">
        STORE COUPONS
      </h2>
      <div className="flex-grow h-px bg-gray-300" />
    </div>

    {/* Coupons Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {coupons.map((coupon, index) => (
        <div
          key={index}
          className="border border-red-400 border-dashed rounded-2xl p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-200 text-center"
        >
          <div className="text-red-600 font-bold text-2xl mb-2">{coupon.title}</div>
          {coupon.max && (
            <p className="text-gray-700 text-sm font-medium mb-1">Max: {coupon.max}</p>
          )}
          <p className="text-gray-700 text-sm font-medium mb-4">Min: {coupon.min}</p>

          <button
            onClick={() => {
              setModalImage(coupon.image);
              setShowModal(true);
            }}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            KLAIM SEKARANG
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Modal Popup */}
  {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md relative animate-fade-in">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg font-bold"
        >
          &times;
        </button>
        <img src={modalImage} alt="Kupon" className="w-full h-auto rounded-md" />
      </div>
    </div>
  )}
</section>


    <section className="bg-white md:py-16 py-12">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Apa Kata Mereka Tentang Kami
    </h2>

    <div className="overflow-x-auto scrollbar-hide">
  <div className="flex gap-4">
    {[
      "/testimoni/1.png",
      "/testimoni/2.png",
      "/testimoni/3.png",
      "/testimoni/4.png",
      "/testimoni/5.png",
      "/testimoni/6.png",
    ].map((src, index) => (
      <div
  key={index}
  className="min-w-[160px] max-w-[90vw] sm:min-w-[200px] sm:max-w-[45vw] md:min-w-[300px] md:max-w-[600px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
>
  <img
    src={src}
    alt={`Testimoni ${index + 1}`}
    className="w-full h-[200px] sm:h-[200px] md:h-[300px] object-cover"
  />
</div>

    ))}
  </div>
</div>

  </div>
</section>

 
      <Footer/>
    </main>
  );
}
