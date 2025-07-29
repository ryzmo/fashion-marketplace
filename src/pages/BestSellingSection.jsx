import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BestSellingSection() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loadingWishlistId, setLoadingWishlistId] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);



  useEffect(() => {
    const fetchBestSelling = async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch('/api/best-selling');
        const data = await res.json();
        if (res.ok) setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
    setLoadingProducts(false); // selesai loading
  }
    };

    const fetchUserId = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        setUserId(data.id);
      } catch (err) {
        console.error('Gagal ambil user session:', err);
      }
    };

    fetchBestSelling();
    fetchUserId();
  }, []);

  return (
    <section className="md:py-16 pt-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex-grow h-px bg-gray-300" />
          <h2 className="mx-4 text-lg font-bold px-6 py-2 bg-black text-white">BEST SELLING</h2>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {loadingProducts
    ? Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-2">
          <div className="w-28 h-28 sm:w-64 sm:h-64 bg-gray-200 rounded mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
          <div className="h-8 bg-gray-400 rounded w-4/5 mx-auto" />
        </div>
      ))
    : products.slice(0, 8).map((product) => (
        <div key={product.id} className="text-center">
      <Link href={`/produk/${product.id}`} className="block">
        <div className="relative w-28 h-28 sm:w-64 sm:h-64 mx-auto overflow-hidden rounded-lg shadow-md">
          <img
            src={typeof product.imageUrls?.[0] === 'string'
              ? product.imageUrls[0]
              : product.imageUrls?.[0]?.url}
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

      <h4 className="mt-3 font-semibold text-black text-sm truncate px-2">{product.name}</h4>

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

      </div>
    </section>
  );
}
