// pages/produk/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import { withAuth } from '../../../middleware/withAuth';
import LoadingBar from '../LoadingBar';
import Navbar from '../navbar';
import Footer from '../footer'; 


export default function DetailProduk({ userId }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishAdding, setIsWishAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loadingWishlistId, setLoadingWishlistId] = useState(null);




  const [quantity, setQuantity] = useState(1);

const handleMinus = () => {
  setQuantity((prev) => Math.max(1, prev - 1));
};

const handlePlus = () => {
  setQuantity((prev) => prev + 1);
};

  useEffect(() => {
  if (!id) return;
  const fetchProduk = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      // 🧪 DEBUG LOG
      console.log('🧪 FETCHED PRODUK:', data.product);
      console.log('🧪 Harga Produk:', data.product.price);
      console.log('🧪 Varian:', data.product.variants);
      console.log('🧪 Discount Price:', data.product.discountPrice);

      setProduk(data.product);
      if (data.product?.imageUrls?.length > 0) {
        const img0 = data.product.imageUrls[0];
        setSelectedImage(typeof img0 === 'string' ? img0 : img0.url);
      }
    } catch (error) {
      console.error('Gagal ambil produk:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchProduk();
}, [id]);


  const [produkList, setProdukList] = useState([]);

useEffect(() => {
  const fetchAllProduk = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok) {
        setProdukList(data.products);
      }
    } catch (error) {
      console.error('Gagal fetch produk list:', error);
    }
  };

  fetchAllProduk();
}, []);

const fetchCartCount = async () => {
  try {
    const res = await fetch(`/api/cart/count/${userId}`);
    const data = await res.json();
    setCartCount(data.count);
  } catch (err) {
    console.error('Gagal ambil jumlah keranjang:', err);
  }
};

useEffect(() => {
  fetchCartCount(); // panggil sekali saat halaman dimuat
}, []);

const handleAddToCart = async () => {
  if (!selectedVariant) {
    alert('Silakan pilih varian terlebih dahulu.');
    return;
  }

  if (quantity > selectedVariant.stock) {
    alert(`Stok tidak mencukupi. Stok tersedia hanya ${selectedVariant.stock}.`);
    return;
  }

  setIsAdding(true);

  try {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        productId: produk.id,
        size: selectedVariant.size,
        color: selectedVariant.color, // ✅ tambahkan ini
        quantity,
        price: selectedVariant.discountPrice || selectedVariant.price,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert('Produk berhasil ditambahkan ke keranjang!');
      await fetchCartCount();
    } else {
      alert(result?.error || 'Gagal menambahkan ke keranjang.');
    }
  } catch (error) {
    console.error('Gagal tambah ke keranjang:', error);
    alert('Terjadi kesalahan saat menambahkan produk.');
  } finally {
    setIsAdding(false);
  }
};


useEffect(() => {
  if (selectedVariant?.imageUrls?.[0]) {
    const url = typeof selectedVariant.imageUrls[0] === 'string'
      ? selectedVariant.imageUrls[0]
      : selectedVariant.imageUrls[0]?.url;
    if (url) setSelectedImage(url);
  }
}, [selectedVariant]);









  if (loading) return <LoadingBar />;
  if (!produk) return <p className="p-6 text-red-500">Produk tidak ditemukan</p>;

  return (
    <main className="bg-white min-h-screen">
        <Navbar/>
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 items-start">
        
        
        {/* Gambar Produk */}
        <div className="relative">
          {produk.isSale && (
            <span className="absolute top-0 left-0 bg-black text-white text-xs px-2 py-1">
              Sale!
            </span>
          )}
          <div className="border">
            <img
              src={selectedImage}
              alt={produk.name}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {produk.imageUrls?.map((img, i) => {
              const url = typeof img === 'string' ? img : img.url;
              return (
                <img
                  key={i}
                  src={url}
                  alt={`Gambar ${i + 1}`}
                  className={`w-16 h-16 object-cover border cursor-pointer ${
                    selectedImage === url ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => setSelectedImage(url)}
                />
              );
            })}
          </div>
        </div>
  
        {/* Detail Produk */}
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">{produk.name}</h1>

          {/* Rating Produk */}
          <div className="flex items-center mb-4">
  {/* Bintang Rating */}
  <div className="flex text-yellow-400 text-2xl">
    {[...Array(5)].map((_, i) => (
      <span key={i}>{i < produk.rating ? '★' : '☆'}</span>
    ))}
  </div>

  {/* Jumlah pembelian */}
  <span className="text-sm text-gray-600 ml-3">
    {produk.purchaseCount?.toLocaleString('id-ID') || 0} Terjual
  </span>
</div>
  
          {/* Harga */}
          <div className="mb-4 text-black">
  {selectedVariant ? (
    <div className="text-xl font-bold text-black">
      {selectedVariant.discountPrice ? (
        <>
          <span className="line-through text-gray-400 mr-2">
            Rp{selectedVariant.price.toLocaleString('id-ID')}
          </span>
          <span className="text-red-600">
            Rp{selectedVariant.discountPrice.toLocaleString('id-ID')}
          </span>
        </>
      ) : (
        <span>
          Rp{selectedVariant.price.toLocaleString('id-ID')}
        </span>
      )}
    </div>
  ) : (() => {
  const prices = produk.variants?.map(v => v.discountPrice || v.price) || [];
  const minPrice = Math.min(...prices);

  return (
    <div className="text-xl font-bold text-black">
      {produk.variants?.some(v => v.discountPrice) ? (
        <>
          <span className="line-through text-gray-400 mr-2">
            Rp{Math.max(...produk.variants.map(v => v.price)).toLocaleString('id-ID')}
          </span>
          <span className="text-red-600">
            Rp{minPrice.toLocaleString('id-ID')}
          </span>
        </>
      ) : (
        <span>
          Rp{minPrice.toLocaleString('id-ID')}
        </span>
      )}
    </div>
  );
})()
}
</div>


          



          {/* Pilih Warna */}
{produk.variants?.length > 0 && (
  <div className="mb-4">
    <label className="font-semibold text-sm block text-gray-800 mb-2">Pilih Model/Warna:</label>
    <div className="flex flex-wrap gap-2">
      {[...new Set(produk.variants.map((v) => v.color))].map((color, i) => (
        <button
          key={i}
          onClick={() => {
            setSelectedColor(color);
            setSelectedSize('');
            setSelectedVariant(null); // reset varian
          }}
          className={`px-3 py-1 border rounded-full text-sm ${
            selectedColor === color ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-400'
          }`}
        >
          {color}
        </button>
      ))}
    </div>
  </div>
)}

{/* Pilih Ukuran */}
{selectedColor && (
  <div className="mb-4">
    <label className="font-semibold text-sm block text-gray-800 mb-2">Pilih Model/Ukuran:</label>
    <div className="flex flex-wrap gap-2">
      {produk.variants
  .filter((v) => v.color === selectedColor)
  .flatMap((v) => {
    // Pecah ukuran jika diketik seperti "XL, L"
    return v.size.split(',').map(size => ({
      ...v,
      size: size.trim()
    }));
  })
  .map((v, i) => (
    <button
      key={`${v.sku}-${v.size}-${i}`}
      onClick={() => {
        setSelectedSize(v.size);
        setSelectedVariant(v);
      }}
      className={`px-3 py-1 border rounded-full text-sm ${
        selectedSize === v.size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-400'
      }`}
    >
      {v.size}
    </button>
  ))}

    </div>
    {selectedSize && (
      <p className="text-xs text-gray-500 mt-1">
        Varian dipilih: {selectedColor} - {selectedSize}
      </p>
    )}
  </div>
)}

{selectedVariant && (
  <div className="text-sm text-gray-700 mb-4">
    Stok tersedia: <strong>{selectedVariant.stock}</strong><br />
  </div>
)}



  
          {/* Quantity + Button */}
          <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center w-fit border border-gray-300 rounded-lg overflow-hidden text-sm">
  <button
    onClick={handleMinus}
    className="px-2 py-2 bg-white hover:bg-gray-200 text-gray-700 font-semibold"
  >
    −
  </button>
  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) => {
      const val = Math.max(1, parseInt(e.target.value) || 1);
      setQuantity(val);
    }}
    disabled

    className="w-12 text-center py-2 text-black focus:outline-none appearance-none custom-number-input"
  />
  <button
    onClick={handlePlus}
    className="px-2 py-2 bg-white hover:bg-gray-200 text-gray-700 font-semibold"
  >
    +
  </button>
</div>

    <button
  className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800"
  onClick={() => {
    if (!selectedVariant) {
  alert('Silakan pilih warna dan ukuran terlebih dahulu.');
  return;
}

  }}
>
<button
  className={`
    text-xs sm:text-sm 
    px-1
    py-1 
    rounded-lg font-medium
    bg-black text-white 
    hover:bg-gray-800 
    transition duration-200 ease-in-out
    ${isAdding ? 'opacity-60 cursor-not-allowed' : ''}
  `}
  onClick={handleAddToCart}
  disabled={isAdding}
>
  {isAdding ? 'Memproses...' : 'Tambah ke Keranjang'}
</button>



</button>

  
    {/* Tombol Chat Admin - sekarang sudah sejajar */}
    <button
      onClick={() => router.push('/chat')}
      className="text-black hover:text-blue-800 text-2xl"
      title="Chat Admin"
    >
      <FaCommentDots />
    </button>
  </div>
  
  
          {/* Wishlist dan Compare */}
          <div className="text-sm space-y-1 mb-4">
          <p
  onClick={async () => {
    if (isWishAdding) return;
    setIsWishAdding(true);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: produk.id }),
      });
      const result = await res.json();
      alert(result.message || 'Berhasil ditambahkan ke wishlist!');
    } catch (err) {
      alert('Gagal menambahkan ke wishlist');
    } finally {
      setIsWishAdding(false);
    }
  }}
  className={`flex items-center gap-2 cursor-pointer ${isWishAdding ? 'text-gray-400' : 'text-red-600 hover:underline'}`}
>
  <span>♡</span> 
  <span>{isWishAdding ? 'Memproses...' : 'Tambah ke Wishlist'}</span>
</p>
          </div>
  
          {/* Kategori */}
          <p className="text-sm mb-6 text-black">
            <span className="font-semibold">KATEGORI:</span>{' '}
            {produk.categories?.map((cat) => cat.name).join(', ') || '-'}
          </p>
  
          <div>
      {/* Tab Navigation */}
      <div className="border-b flex space-x-6 text-sm font-semibold">
        <button
          className={`py-2 ${
            activeTab === "deskripsi" ? "border-b-2 border-black text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("deskripsi")}
        >
          Deskripsi
        </button>
        <button
          className={`py-2 ${
            activeTab === "ulasan" ? "border-b-2 border-black text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("ulasan")}
        >
          Ulasan ({produk.reviews?.length || 0})
        </button>
      </div>

      {/* Konten Tab */}
      <div className="mt-6">
        {activeTab === "deskripsi" && (
  <div>
    <h3 className="text-xl text-black font-bold mb-2">Deskripsi</h3>
    <p
      className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out ${
        showFullDescription ? '' : 'line-clamp-2'
      } cursor-pointer whitespace-pre-line`} // 👈 penting di sini
      onClick={() => setShowFullDescription(!showFullDescription)}
    >
      {produk.description}
    </p>
  </div>
)}


{activeTab === "ulasan" && (
  <div>
    <h3 className="text-xl font-bold mb-4 text-black">Ulasan Pelanggan</h3>
    {produk.reviews?.length > 0 ? (
      <div className="space-y-4">
        {produk.reviews.map((ulasan, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            {/* Nama Pengulas */}
            <p className="font-semibold text-gray-800">
              {Array.isArray(ulasan.nama) ? ulasan.nama[0] : ulasan.nama}
            </p>

            {/* Isi Ulasan */}
            <p className="text-sm text-gray-700 mt-1">
              {Array.isArray(ulasan.isi) ? ulasan.isi[0] : ulasan.isi}
            </p>

            {/* Gambar Ulasan */}
            {ulasan.gambar?.some(gbr => (typeof gbr === 'string' ? gbr : gbr?.url)) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {ulasan.gambar.map((gbr, i) => {
                  const imgUrl = typeof gbr === 'string' ? gbr : gbr?.url;
                  if (!imgUrl) return null; // ✅ kalau kosong, tidak render apapun
                  return (
                    <div key={i} className="border rounded overflow-hidden w-20 h-20">
                      <img
                        src={imgUrl}
                        alt={`Ulasan ${idx + 1} Gambar ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-600 italic">Belum ada ulasan.</p>
    )}
  </div>
)}

      </div>
    </div>

          

        </div>
        


      </div>
      <section className="max-w-6xl mx-auto px-4 mt-12">
  {(() => {
    const related = produkList
      .filter(
        (p) =>
          p.id !== produk.id &&
          p.categories?.some((cat) =>
            produk.categories.map((c) => c.name).includes(cat.name)
          )
      )
      .slice(0, 4);

    return related.length > 0 ? (
      <>
        <h3 className="text-xl font-bold mb-6 text-black">Produk Terkait</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-black mb-12">
          {related.map((product) => (
            <div key={product.id} className="text-center">
              <div className="relative w-full aspect-square overflow-hidden rounded shadow">
                <Link href={`/produk/${product.id}`} passHref>
                  <img
                    src={
                      typeof product.imageUrls?.[0] === 'string'
                        ? product.imageUrls[0]
                        : product.imageUrls?.[0]?.url
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                  {product.isSale && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Sale!
                    </span>
                  )}
                </Link>
              </div>

              <h4 className="mt-4 font-semibold truncate">{product.name}</h4>

              <div className="flex justify-center text-yellow-400 text-sm my-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < product.rating ? '★' : '☆'}</span>
                ))}
              </div>

              <div className="text-sm font-bold text-black">
  {(() => {
    const prices = product.variants?.map(v => v.discountPrice || v.price) || [];

    // Kalau tidak ada varian
    if (prices.length === 0) {
      if (product.discountPrice) {
        return (
          <p>
            <span className="line-through text-gray-400 mr-2 text-xs">
              {typeof product.price === 'number'
                ? `Rp${product.price.toLocaleString('id-ID')}`
                : 'Rp -'}
            </span>
            <span className="text-red-600">
              {typeof product.discountPrice === 'number'
                ? `Rp${product.discountPrice.toLocaleString('id-ID')}`
                : 'Rp -'}
            </span>
          </p>
        );
      } else {
        return (
          <p>
            {typeof product.price === 'number'
              ? `Rp${product.price.toLocaleString('id-ID')}`
              : 'Rp -'}
          </p>
        );
      }
    }

    // Kalau ada varian
    const minPrice = Math.min(...prices);
    const hasDiscount = product.variants?.some(v => v.discountPrice);

    return hasDiscount ? (
      <p>
        <span className="line-through text-gray-400 mr-2 text-xs">
          Rp{Math.max(...product.variants.map(v => v.price || 0)).toLocaleString('id-ID')}
        </span>
        <span className="text-red-600">
          Rp{minPrice.toLocaleString('id-ID')}
        </span>
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
      </>
    ) : null;
  })()}
</section>
  <Footer/>
    </main>
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  return { props: { userId: user.id } };
});
