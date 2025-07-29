// pages/kategori/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoadingBar from '../LoadingBar';
import Navbar from '../navbar';
import Footer from '../footer';

export default function ProdukKategori() {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [loadingWishlistId, setLoadingWishlistId] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        const filtered = data.products.filter((produk) =>
          produk.categories?.some(
            (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === slug
          )
        );

        setProdukList(filtered);
      } catch (err) {
        console.error('Gagal ambil produk:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

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

  return (
    <main className="text-black bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          Kategori: {slug?.replace(/-/g, ' ')}
        </h1>

        {loading ? (
          <LoadingBar />
        ) : produkList.length === 0 ? (
          <p className="text-gray-600">Tidak ada produk dalam kategori ini.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {produkList.map((product) => (
              <div key={product.id} className="text-center">
                <div className="relative w-full aspect-square overflow-hidden rounded shadow">
                  <Link href={`/produk/${product.id}`}>
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
                <h4 className="mt-4 font-semibold text-sm truncate px-2">
                  {product.name}
                </h4>
                <div className="flex items-center justify-center gap-1 text-yellow-400 my-1">
        <div className="flex text-sm">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.rating ? '★' : '☆'}</span>
          ))}
        </div>
        <span className="text-gray-600 text-[10px] ml-1">
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
    const maxPrice = Math.max(...prices);
    const hasDiscount = product.variants?.some(v => v.discountPrice);

    return hasDiscount ? (
      <p>
        <span className="line-through text-gray-400 mr-2 text-xs">
          Rp{maxPrice.toLocaleString('id-ID')}
        </span>
        <span className="text-red-600">Rp{minPrice.toLocaleString('id-ID')}</span>
      </p>
    ) : (
      <p>
        {minPrice === maxPrice
          ? `Rp${minPrice.toLocaleString('id-ID')}`
          : `Rp${minPrice.toLocaleString('id-ID')} - Rp${maxPrice.toLocaleString('id-ID')}`}
      </p>
    );
  })()}
</div>


                <button
  className={`mt-3 px-3 py-1.5 text-xs rounded transition ${
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

    setLoadingWishlistId(product.id); // ⏳ mulai loading

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: product.id,
        }),
      });
      const result = await res.json();
      alert(res.ok ? result.message || 'Ditambahkan ke wishlist!' : result.error || 'Gagal menambahkan.');
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
      </div>
      <Footer />
    </main>
  );
}
