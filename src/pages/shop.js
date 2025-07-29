import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaCommentDots, FaTimes, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaEnvelope, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Footer from './footer';

export default function Shop() {
  const [userId, setUserId] = useState(null);

  const router = useRouter();
  const { search = '', category = '' } = router.query;
  
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // ✅ State untuk input search & category
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingWishlistId, setLoadingWishlistId] = useState(null);


const productsPerPage = 100;

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(products.length / productsPerPage);



  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        setUserId(data.id);
      } catch (err) {
        console.error('Gagal ambil user session:', err);
      }
    };
    fetchUserId();
  }, []);
  
  
  // ✅ Sinkronkan state input dengan URL saat pertama kali
  useEffect(() => {
    setSearchInput(search);
    setCategoryInput(category);
  }, [search, category]);
  
  // ✅ Fetch produk berdasarkan query URL
  useEffect(() => {
    if (!router.isReady) return;
  
    const fetchProducts = async () => {
      try {
        setLoading(true); // MULAI LOADING
        let url = `/api/search`; // atau `/api/products` tergantung API kamu
        const queryParams = [];
  
        if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
        if (category) queryParams.push(`category=${encodeURIComponent(category)}`);
        if (sort && sort !== 'default') queryParams.push(`sort=${sort}`);
  
        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }
  
        const res = await fetch(url);
        const data = await res.json();
  
        if (res.ok) {
          setProducts(data.products);
        } else {
          console.error('Gagal fetch:', data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false); // SELESAI LOADING
      }
    };
  
    fetchProducts();
  }, [search, category, sort, router.isReady]);
  
  // ✅ Submit form pencarian
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/shop',
      query: {
        search: searchInput,
        category: categoryInput,
      },
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Header */}
      <div className="bg-white border-b py-10 shadow-sm">
  <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Produk</h1>
    <p className="text-sm text-gray-500">
      Temukan berbagai produk terbaik sesuai kebutuhanmu
    </p>
  </div>
</div>


      {/* Sort and Count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto px-4 mt-8 mb-6 gap-4">
  
  {/* Filter & Sort */}
  <span className="inline md:hidden text-xs text-gray-600">Urutkan :</span>
  <div className="bg-white mb-3 w-full overflow-x-auto">
  <div className="flex items-center gap-2 text-[11px] md:text-sm font-medium whitespace-nowrap w-max">
  <span className="hidden sm:inline text-gray-600">Urutkan :</span>

    <button
      onClick={() => setSort('relevant')}
      className={`px-2 py-2 rounded ${
        sort === 'relevant' ? 'bg-black text-white' : 'bg-white text-gray-800 border'
      }`}
    >
      Terkait
    </button>

    <button
      onClick={() => setSort('newest')}
      className={`px-4 py-2 rounded ${
        sort === 'newest' ? 'bg-black text-white' : 'bg-white text-gray-800 border'
      }`}
    >
      Terbaru
    </button>

    <button
      onClick={() => setSort('popular')}
      className={`px-4 py-2 rounded ${
        sort === 'popular' ? 'bg-black text-white' : 'bg-white text-gray-800 border'
      }`}
    >
      Terlaris
    </button>

    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border bg-white px-4 py-2 rounded text-gray-800"
    >
      <option value="default">Harga</option>
      <option value="lowest">Harga Terendah</option>
      <option value="highest">Harga Tertinggi</option>
    </select>
  </div>
</div>


  {/* Jumlah hasil */}
  <div className="border px-4 py-2 text-xs md:text-sm w-full md:w-auto text-center text-gray-800">
    MENAMPILKAN SEMUA {products.length} HASIL
  </div>
</div>

{loading ? (
  <div className="flex justify-center items-center h-40 w-full">
    <span className="text-gray-600 text-sm animate-pulse">Memuat produk...</span>
  </div>
) : (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
  {currentProducts.map((product) => (
    <div key={product.id} className="text-center">
      <Link href={`/produk/${product.id}`} className="block">
        <div className="relative w-28 h-28 sm:w-64 sm:h-64 mx-auto overflow-hidden rounded-lg shadow-md">
          <img
            src={
              typeof product.imageUrls?.[0] === 'string'
                ? product.imageUrls[0]
                : product.imageUrls?.[0]?.url
            }
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.isSale && (
            <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded">
              Sale!
            </span>
          )}
        </div>
      </Link>

      <h4 title={product.name} className="mt-3 font-semibold text-black text-sm truncate px-2">
  {product.name}
</h4>

      <div className="flex items-center justify-center gap-2 text-yellow-400 my-1">
        <div className="flex text-xl">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.rating ? '★' : '☆'}</span>
          ))}
        </div>
        <span className="text-gray-600 text-[10px]">
          {product.purchaseCount?.toLocaleString('id-ID') || 0} Terjual
        </span>
      </div>

      <div className="text-sm font-bold text-black">
  {(() => {
    const prices = product.variants?.map(v => v.discountPrice || v.price) || [];
    if (prices.length === 0) {
      return (
        <p>
          Rp{typeof product.price === 'number' ? product.price.toLocaleString('id-ID') : '0'}
        </p>
      );
    }

    const minPrice = Math.min(...prices);
    const hasDiscount = product.variants?.some(v => v.discountPrice);

    return hasDiscount ? (
      <p>
        <span className="line-through text-gray-400 mr-2 text-xs">
          Rp{Math.max(...product.variants.map(v => v.price || 0)).toLocaleString('id-ID')}
        </span>
        <span className="text-red-600">Rp{minPrice.toLocaleString('id-ID')}</span>
      </p>
    ) : (
      <p>Rp{minPrice.toLocaleString('id-ID')}</p>
    );
  })()}
</div>





      <button
  className={`mt-3 px-4 py-2 text-sm rounded transition ${
    loadingWishlistId === product.id
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-black text-white hover:bg-gray-800'
  }`}
  disabled={loadingWishlistId === product.id}
  onClick={async () => {
    if (!userId) {
      window.location.href = '/auth/login';
      return;
    }

    setLoadingWishlistId(product.id); // ⏳ start loading

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          productId: product.id,
        }),
      });
      const result = await res.json();
      alert(result.message || 'Berhasil ditambahkan ke wishlist!');
    } catch (error) {
      console.error('Gagal tambah wishlist:', error);
      alert('Terjadi kesalahan saat tambah wishlist.');
    } finally {
      setLoadingWishlistId(null); // ✅ selesai loading
    }
  }}
>
  {loadingWishlistId === product.id ? 'Menambahkan...' : 'Tambah ke Wishlist'}
</button>

    </div>
  ))}
</div>

)}
      <div className="flex justify-center items-center gap-4 mt-8 mb-12">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
  >
    Previous
  </button>
  <span className="text-sm text-gray-600">
    Halaman {currentPage} dari {totalPages}
  </span>
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
  >
    Next
  </button>
</div>

      <Footer/>


    </div>
  );
}
