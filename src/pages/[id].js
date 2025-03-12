// pages/product/[id].js
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaStar, FaRecycle, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { useContext } from "react";
import { CartContext } from "./_app"; // Import context
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data produk (di dunia nyata, ini harus diambil dari API atau database)
const products = [
  {
    "id": 1,
    "name": "Regular Fit Linen Trousers",
    "price": 175000,
    "images": [
      "/produk/1/1.png",
      "/produk/1/2.png",
      "/produk/1/3.png",
      "/produk/1/4.png",
      "/produk/1/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Pria",
    "description": "Celana linen regular fit nyaman.",
    "rating": 4.5,
    "stock": 10,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 2,
    "name": "Sequined Tulle Balloon Dress",
    "price": 200000,
    "images": [
      "/produk/2/1.png",
      "/produk/2/2.png",
      "/produk/2/3.png",
      "/produk/2/4.png",
      "/produk/2/5.png"
    ],
    "sizes": ["M", "L", "XL"],
    "category": "Pria",
    "description": "Gaun tulle berpayet elegan modis.",
    "rating": 4.8,
    "stock": 5,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 3,
    "name": "Slim Fit Cotton Trousers",
    "price": 180000,
    "images": [
      "/produk/3/1.png",
      "/produk/3/2.png",
      "/produk/3/3.png",
      "/produk/3/4.png",
      "/produk/3/5.png"
    ],
    "sizes": ["S", "M", "L"],
    "category": "Wanita",
    "description": "Celana katun slim fit fleksibel.",
    "rating": 4.6,
    "stock": 8,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
  {
    "id": 4,
    "name": "Tulle Puff Sleeve Dress",
    "price": 190000,
    "images": [
      "/produk/4/1.png",
      "/produk/4/2.png",
      "/produk/4/3.png",
      "/produk/4/4.png",
      "/produk/4/5.png"
    ],
    "sizes": [],
    "category": "Pria",
    "description": "Gaun tulle dengan lengan puff.",
    "rating": 4.7,
    "stock": 12,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 5,
    "name": "DryMove Pocket Sports Leggings",
    "price": 220000,
    "images": [
      "/produk/5/1.png",
      "/produk/5/2.png",
      "/produk/5/3.png",
      "/produk/5/4.png",
      "/produk/5/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Pria",
    "description": "Legging olahraga dengan kantong fungsional.",
    "rating": 4.4,
    "stock": 6,
    "store": {
      "id": 103,
      "name": "Sporty Wearhouse",
      "profileImage": "/logotoko/sporty.png"
    }
  },
  {
    "id": 6,
    "name": "DryMove Warm Running Leggings",
    "price": 210000,
    "images": [
      "/produk/6/1.png",
      "/produk/6/2.png",
      "/produk/6/3.png",
      "/produk/6/4.png",
      "/produk/6/5.png"
    ],
    "sizes": ["S", "M", "L"],
    "category": "Wanita",
    "description": "Legging lari hangat dan fleksibel.",
    "rating": 4.3,
    "stock": 15,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
  {
    "id": 7,
    "name": "Regular Fit Linen Shirt",
    "price": 175000,
    "images": [
      "/produk/7/1.png",
      "/produk/7/2.png",
      "/produk/7/3.png",
      "/produk/7/4.png",
      "/produk/7/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Unisex",
    "description": "Kemeja linen regular fit kasual.",
    "rating": 4.5,
    "stock": 10,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 8,
    "name": "Regular Fit Navy Linen Shirt",
    "price": 195000,
    "images": [
      "/produk/8/1.png",
      "/produk/8/2.png",
      "/produk/8/3.png",
      "/produk/8/4.png",
      "/produk/8/5.png"
    ],
    "sizes": ["M", "L", "XL"],
    "category": "Pria",
    "description": "Kemeja linen navy regular fit.",
    "rating": 4.8,
    "stock": 5,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 9,
    "name": "Oversized Fit Denim Shirt",
    "price": 230000,
    "images": [
      "/produk/9/1.png",
      "/produk/9/2.png",
      "/produk/9/3.png",
      "/produk/9/4.png",
      "/produk/9/5.png"
    ],
    "sizes": ["S", "M", "L"],
    "category": "Wanita",
    "description": "Kemeja denim oversized keren stylish.",
    "rating": 4.6,
    "stock": 8,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 10,
    "name": "Classic Denim Casual Shirt",
    "price": 185000,
    "images": [
      "/produk/10/1.png",
      "/produk/10/2.png",
      "/produk/10/3.png",
      "/produk/10/4.png",
      "/produk/10/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Wanita",
    "description": "Kemeja denim klasik santai nyaman.",
    "rating": 4.7,
    "stock": 12,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 11,
    "name": "Graphic Printed Cotton T-Shirt",
    "price": 165000,
    "images": [
      "/produk/11/1.png", "/produk/11/2.png", "/produk/11/3.png", "/produk/11/4.png", "/produk/11/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Populer",
    "description": "Kaos print unik dan nyaman.",
    "rating": 4.5,
    "stock": 10,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 12,
    "name": "Tie-Belt Casual Shirt Dress",
    "price": 250000,
    "images": [
      "/produk/12/1.png", "/produk/12/2.png", "/produk/12/3.png", "/produk/12/4.png", "/produk/12/5.png"
    ],
    "sizes": ["M", "L", "XL"],
    "category": "Populer",
    "description": "Gaun kemeja dengan ikat pinggang.",
    "rating": 4.8,
    "stock": 5,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
  {
    "id": 13,
    "name": "Loose Fit Basketball Jersey",
    "price": 190000,
    "images": [
      "/produk/13/1.png", "/produk/13/2.png", "/produk/13/3.png", "/produk/13/4.png", "/produk/13/5.png"
    ],
    "sizes": ["S", "M", "L"],
    "category": "Populer",
    "description": "Kaos basket loose fit sporty.",
    "rating": 4.6,
    "stock": 8,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
  {
    "id": 14,
    "name": "Tie-Belt Stylish Shirt Dress",
    "price": 180000,
    "images": [
      "/produk/14/1.png", "/produk/14/2.png", "/produk/14/3.png", "/produk/14/4.png", "/produk/14/5.png"
    ],
    "sizes": ["S", "M", "L"],
    "category": "Populer",
    "description": "Gaun kemeja ikat pinggang simple.",
    "rating": 4.7,
    "stock": 12,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 15,
    "name": "Muscle Fit DryMove Top",
    "price": 220000,
    "images": [
      "/produk/15/1.png", "/produk/15/2.png", "/produk/15/3.png", "/produk/15/4.png", "/produk/15/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Populer",
    "description": "Atasan olahraga muscle fit fleksibel.",
    "rating": 4.5,
    "stock": 10,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 16,
    "name": "Oversized Crinkled Stylish Dress",
    "price": 175000,
    "images": [
      "/produk/16/1.png",
      "/produk/16/2.png",
      "/produk/16/3.png",
      "/produk/16/4.png",
      "/produk/16/5.png"
    ],
    "sizes": ["M", "L", "XL"],
    "category": "Wanita",
    "description": "Gaun oversized dengan tekstur unik.",
    "rating": 4.8,
    "stock": 5,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 17,
    "name": "DryMove Training Stretch Shorts",
    "price": 210000,
    "images": [
      "/produk/17/1.png",
      "/produk/17/2.png",
      "/produk/17/3.png",
      "/produk/17/4.png",
      "/produk/17/5.png"
    ],
    "sizes": ["S", "M", "L"],
    "category": "Pria",
    "description": "Celana pendek olahraga stretch fleksibel.",
    "rating": 4.6,
    "stock": 8,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
  {
    "id": 18,
    "name": "Regular Fit Casual Hoodie",
    "price": 195000,
    "images": [
      "/produk/18/1.png",
      "/produk/18/2.png",
      "/produk/18/3.png",
      "/produk/18/4.png",
      "/produk/18/5.png"
    ],
    "sizes": ["M", "L", "XL"],
    "category": "Unisex",
    "description": "Hoodie regular fit kasual nyaman.",
    "rating": 4.7,
    "stock": 12,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
  {
    "id": 19,
    "name": "Viscose Lightweight Shirt Dress",
    "price": 165000,
    "images": [
      "/produk/19/1.png",
      "/produk/19/2.png",
      "/produk/19/3.png",
      "/produk/19/4.png",
      "/produk/19/5.png"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Wanita",
    "description": "Gaun kemeja viscose ringan lembut.",
    "rating": 4.5,
    "stock": 10,
    "store": {
      "id": 101,
      "name": "Thrift Corner",
      "profileImage": "/logotoko/corner.png"
    }
  },
  {
    "id": 20,
    "name": "Oversized Fit Printed Sweatshirt",
    "price": 230000,
    "images": [
      "/produk/20/1.png",
      "/produk/20/2.png",
      "/produk/20/3.png",
      "/produk/20/4.png",
      "/produk/20/5.png"
    ],
    "sizes": ["M", "L", "XL"],
    "category": "Pria",
    "description": "Sweatshirt oversized dengan print keren.",
    "rating": 4.8,
    "stock": 5,
    "store": {
      "id": 102,
      "name": "EcoChic Boutique",
      "profileImage": "/logotoko/eco.png"
    }
  },
];

export default function ProductDetail() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const router = useRouter();
  const { id } = router.query;

  // Cari produk berdasarkan ID
  const product = products.find((item) => item.id === Number(id));

  // State awal harus diinisialisasi dengan nilai default
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isExchange, setIsExchange] = useState(false);

  const [discountedPrice, setDiscountedPrice] = useState(product ? product.price : 0);

  // Gunakan useEffect untuk mengatur state saat product tersedia
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes.length > 0 ? product.sizes[0] : null);
      setDiscountedPrice(product.price);
    }
  }, [product]);

  // Jika produk tidak ditemukan, tampilkan pesan error
  if (!product) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-red-500">Produk tidak ditemukan</h2>
        <button 
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => router.push("/")}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }
  // ✅ Definisikan fungsi handleChatNow sebelum menggunakannya
  const handleChatNow = (store) => {
    if (store && store.id) {
      router.push(`/chat?storeId=${store.id}`);
    } else {
      console.error("Store data is missing or undefined!");
    }
  };

  const handleExchangeToggle = () => {
    setIsExchange(!isExchange);
    setDiscountedPrice(isExchange ? product.price : product.price / 2);
  };

  const { cartItems, setCartItems } = useContext(CartContext);

  const addToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
  
    const priceToUse = isExchange ? product.price / 2 : product.price; // Gunakan harga setengah jika tukar aktif
  
    if (existingItem) {
      // Jika produk sudah ada di keranjang, update quantity
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItems(updatedCart);
    } else {
      // Jika belum ada, tambahkan produk ke keranjang dengan harga yang sesuai
      setCartItems([...cartItems, { ...product, quantity, price: priceToUse }]);
    }
  
    // Cari tombol dan tambahkan kelas penanda
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.textContent = "✔ Masuk Keranjang"; // Ganti teks tombol
      button.classList.add("bg-yellow-500");  // Tambahkan warna penanda
  
      // Reset setelah beberapa detik
      setTimeout(() => {
        button.textContent = "Masukkan Keranjang";  // Kembali ke teks semula
        button.classList.remove("bg-yellow-500"); // Kembalikan warna
      }, 2000);
    }
  };
  
  const handleBuyNow = () => {
    // Menyimpan data produk yang dipilih dan kuantitas ke query parameter
    router.push({
      pathname: '/checkout',
      query: {
        productId: product.id,
        quantity: quantity,
        size: selectedSize,
      },
    });
  };

  
  return (
    <main>
      <div className="container bg-white mx-auto px-6 lg:px-16 py-10">
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
              Detail Produk
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
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 pt-6">
          {/* Gambar Produk */}
          <div>
            <div className="relative">
              <Image 
                src={selectedImage} 
                alt={product.name} 
                width={500} 
                height={500} 
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer border-2 ${selectedImage === img ? "border-red-500" : "border-transparent"} rounded-md`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image 
                    src={img} 
                    alt={`Thumbnail ${index}`} 
                    width={90} 
                    height={90} 
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

        {/* Detail Produk */}
        <div>
          {/* Informasi Toko */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={product.store.profileImage}
              alt={product.store.name}
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{product.store.name}</h2>
              {/* Tombol Chat Sekarang */}
        <button 
          className="text-blue-500 hover:text-blue-700 text-sm"
          onClick={() => handleChatNow(product.store)}

        >
          💬 Chat Sekarang
        </button>
            </div>
          </div>

          {/* Nama Produk */}
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating & Stok */}
          <div className="flex items-center mt-2 text-yellow-500">
            <FaStar /> 
            <span className="ml-1 text-gray-700 font-medium">
              {product.rating} ({product.stock} Stok)
            </span>
          </div>

          {/* Harga */}
          {/* Harga */}
          <p className="text-2xl text-green-700 font-semibold mt-2">
                    Rp {discountedPrice.toLocaleString()}
                  </p>

          {/* Deskripsi */}
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Pilih Ukuran */}
          {product.sizes.length > 0 && (
            <div className="mt-4">
              <h2 className="text-gray-700 font-semibold">Pilih Ukuran:</h2>
              <div className="flex space-x-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md text-gray-800 ${
                      selectedSize === size ? "bg-gray-800 text-white" : "bg-white border-gray-400"
                    } transition duration-200`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pilih Kuantitas */}
          <div className="mt-4">
            <h2 className="text-gray-700 font-semibold">Pilih Kuantitas:</h2>
            <div className="flex items-center mt-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-black rounded-l-md hover:bg-gray-300 transition"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity} 
                readOnly
                className="w-12 text-center border-t border-b text-black border-gray-400"
              />
              <button 
                className="px-4 py-2 bg-gray-200 text-black rounded-r-md hover:bg-gray-300 transition"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Tombol Tukar Baju Bekas */}
          <button 
                    className={`mt-4 flex items-center gap-2 px-6 py-3 rounded-full shadow-md transition duration-300 ${isExchange ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
                    onClick={handleExchangeToggle}
                  >
                    <FaRecycle /> {isExchange ? "Batalkan Tukar" : "Tukar dengan Baju Bekas"}
                  </button>


          {/* Tombol Aksi */}
          <div className='mt-4'>
          <button
                id={`add-to-cart-${product.id}`}
                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 transition duration-300 mr-4"
                onClick={addToCart}
              >
                Masukkan Keranjang
              </button>
              <button 
          className="bg-green-400 text-gray-800 px-6 py-3 rounded-full shadow-md mt-4 hover:bg-green-500 transition duration-300"
          onClick={handleBuyNow}
        >
          Beli Sekarang
        </button>

            </div>

          {/* Tombol Kembali */}
          <button className="mt-4 text-gray-600 underline hover:text-gray-800" onClick={() => router.back()}>
            Kembali
          </button>
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
