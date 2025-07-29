import { useEffect, useState } from 'react';
import Link from 'next/link';
import { withAuth } from '../../middleware/withAuth';
import { useRouter } from 'next/router';
import { FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import LoadingBar from './LoadingBar';
import Navbar from './navbar';
import Footer from './footer';

export default function CartPage({ userId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [autoDiscountActive, setAutoDiscountActive] = useState(false);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart/${userId}`);
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error('Gagal ambil keranjang:', err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchCart();
  }, [userId]);

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const harga = item.price;
      return total + harga * item.quantity;
    }, 0);
  };

  const getTotalWithDiscount = () => {
    const total = getTotal();
    return total - (discount / 100) * total;
  };

  const updateQuantity = async (cartItemId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch(`/api/cart/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: cartItemId, quantity: newQty }),
      });
      const updated = await res.json();
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: updated.quantity } : item
        )
      );
    } catch (err) {
      console.error('Gagal update jumlah:', err);
    }
  };

  const deleteItem = async (cartItemId) => {
    try {
      await fetch(`/api/cart/${userId}?itemId=${cartItemId}`, {
        method: 'DELETE',
      });
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err) {
      console.error('Gagal hapus item:', err);
    }
  };

  const getEligibleTotal = () => {
    return cartItems.reduce((total, item) => {
      const harga = item.price;
      const kategoriProduk = item.product.categories?.map((c) => c.name) || [];
  
      // Kecualikan jika ada kategori "Cannot use coupon"
      if (kategoriProduk.includes("Cannot use coupon")) return total;
  
      return total + harga * item.quantity;
    }, 0);
  };
  

  const applyCoupon = async () => {
    // Cegah override jika diskon otomatis sedang aktif
    if (autoDiscountActive) {
      setCouponMessage('Diskon otomatis aktif (Gamis & Hijab). Kupon tidak bisa digunakan.');
      return;
    }
  
    try {
      const res = await fetch('/api/coupons');
      if (!res.ok) throw new Error('Gagal mengambil kupon');
  
      const allCoupons = await res.json();
      const coupon = allCoupons.find(
        (c) => c.code.toLowerCase() === couponCode.toLowerCase()
      );
  
      if (!coupon) {
        setDiscount(0);
        setCouponMessage('Kupon tidak ditemukan atau tidak valid.');
        return;
      }
  
      const eligibleTotal = getEligibleTotal();
  
      if (eligibleTotal < coupon.minPurchase) {
        setDiscount(0);
        setCouponMessage(`Minimal pembelian Rp${coupon.minPurchase.toLocaleString('id-ID')} untuk menggunakan kupon ini (produk yang eligible).`);
        return;
      }
  
      const calculatedDiscount = (coupon.discountPercent / 100) * eligibleTotal;
      const finalDiscount = Math.min(calculatedDiscount, coupon.maxDiscount);
  
      // Konversi diskon tetap ke persen dari total keseluruhan
      const total = getTotal();
      const effectivePercent = (finalDiscount / total) * 100;
      setDiscount(effectivePercent);
  
      setCouponMessage(
        `Kupon diterapkan: Diskon ${coupon.discountPercent}% (maks Rp${coupon.maxDiscount.toLocaleString('id-ID')})`
      );
    } catch (err) {
      console.error('Gagal validasi kupon:', err);
      setDiscount(0);
      setCouponMessage('Terjadi kesalahan saat memproses kupon.');
    }
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/search?search=${search}&category=${category}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Gagal fetch: ${res.status} - ${text}`);
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error saat fetch data produk:', err.message);
      }
    };

    fetchProducts();
  }, [search, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}&category=${category}`);
  };

  const getCouponId = async (code) => {
    const res = await fetch('/api/coupons');
    const allCoupons = await res.json();
    const found = allCoupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
    return found?.id || null;
  };
  

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          cartItems,
          couponCode: couponCode || null,
          discountPercent: discount,
          couponId: couponCode
            ? (await getCouponId(couponCode)) // fungsi tambahan di bawah
            : null,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Checkout berhasil! 🎉');
        router.push('/order/success'); // arahkan ke halaman sukses
      } else {
        alert(data.message || 'Checkout gagal');
      }
    } catch (err) {
      console.error('Error saat checkout:', err);
      alert('Checkout gagal');
    }
  };
  
  useEffect(() => {
    const kategoriSet = new Set();
    cartItems.forEach((item) => {
      item.product.categories?.forEach((cat) => {
        kategoriSet.add(cat.name);
      });
    });
  
    if (kategoriSet.has("Gamis") && kategoriSet.has("Hijab")) {
      setAutoDiscountActive(true);
      setDiscount(10);
      setCouponMessage("Diskon 10% otomatis karena membeli Gamis & Hijab");
    } else {
      setAutoDiscountActive(false);
    }
  }, [cartItems]);
  
  

  if (loading) return <LoadingBar/>;

  return (
    <main className="bg-white">
      <Navbar/>
      <div className="max-w-6xl min-h-screen bg-white mx-auto px-4 py-10">
      <div className="bg-white border-b mb-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 mb-6">
  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Keranjang</h1>
  <p className="text-sm text-gray-500">
    Lihat dan kelola barang-barang yang ingin kamu beli
  </p>
</div>
      </div>


        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Keranjang kamu masih kosong. Yuk belanja dulu!</p>
        ) : (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-6">
  {cartItems.map((item) => {
    const harga = item.price;
    return (
      <div key={item.id} className="flex flex-row sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border-b pb-6">
        {/* Gambar Produk */}
        <Link href={`/produk/${item.product.id}`} className="shrink-0">
          <img
            src={typeof item.product.imageUrls[0] === 'string' ? item.product.imageUrls[0] : item.product.imageUrls[0]?.url}
            alt={item.product.name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg hover:opacity-90 transition cursor-pointer"
          />
        </Link>

        {/* Detail Produk */}
        <div className="flex-1 w-full space-y-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">{item.product.name}</h2>
          {item.color && (
    <p className="text-sm text-gray-500">Warna: {item.color}</p>
  )}
          <p className="text-sm text-gray-500">Ukuran: {item.size}</p>
          {item.product.categories?.some((c) => c.name === 'Cannot use coupon') && (
            <p className="text-xs text-red-500 mt-1">Kupon tidak berlaku untuk produk ini</p>
          )}

          {/* Jumlah & Hapus */}
          <div className="flex items-center gap-3 mt-3 text-black">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            >−</button>
            <span className="font-medium text-gray-700">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            >+</button>
          </div>
          <button
            onClick={() => deleteItem(item.id)}
            className="text-xs text-red-500 hover:underline mt-1"
          >
            Hapus dari keranjang
          </button>
        </div>

        {/* Harga Total */}
        <div className="text-right font-semibold text-blue-600 text-base sm:text-lg sm:ml-auto">
          Rp{(harga * item.quantity).toLocaleString('id-ID')}
        </div>
      </div>
    );
  })}

  {/* Input Kupon */}
  <div className="mt-4 text-black">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Punya kupon diskon?
    </label>
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Masukkan kode kupon"
        className="flex-1 px-4 py-2 border rounded focus:outline-none"
      />
      <button
        onClick={applyCoupon}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Terapkan
      </button>
    </div>
    {couponMessage && (
      <p className={`mt-2 text-sm ${discount > 0 ? 'text-green-600' : 'text-red-500'}`}>
        {couponMessage}
      </p>
    )}
  </div>

  {/* Total & Checkout */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
    <div className="text-gray-800 text-base sm:text-lg font-semibold">
      Total: Rp{getTotalWithDiscount().toLocaleString('id-ID')}
      {discount > 0 && (
        <span className="block text-sm font-normal text-green-600">
          Diskon {discount}% dari Rp{getTotal().toLocaleString('id-ID')}
        </span>
      )}
    </div>

    <button
      onClick={() => router.push('/checkout')}
      className="w-full sm:w-auto px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition"
    >
      Checkout Sekarang
    </button>
  </div>
</div>

        )}
      </div>
      <Footer/>
    </main>
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  return {
    props: {
      userId: user.id,
    },
  };
});
