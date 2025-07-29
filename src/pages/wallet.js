// File: pages/wallet.js
import { useEffect, useState } from 'react';
import { withAuth } from '../../middleware/withAuth';
import { FaMoneyBillWave, FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';

export default function WalletPage({ userId }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
 
  const [saldo, setSaldo] = useState(0);
  const [topupAmount, setTopupAmount] = useState('');
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [history, setHistory] = useState([]);

  const [showPinDialog, setShowPinDialog] = useState(false);
const [pinInput, setPinInput] = useState('');
const [pinError, setPinError] = useState('');
const [userPinExists, setUserPinExists] = useState(null);
const [historyLoading, setHistoryLoading] = useState(true);
const [isVerifyingPin, setIsVerifyingPin] = useState(false);




  useEffect(() => {
    const fetchSaldo = async () => {
      const res = await fetch(`/api/wallet/${userId}`);
      const data = await res.json();
      setSaldo(data.walletBalance || 0);
      setLoading(false);
    };
    fetchSaldo();
  }, [userId]);

  const handleTopup = async () => {
    if (!topupAmount || parseInt(topupAmount) <= 0) {
      alert('Masukkan nominal yang valid.');
      return;
    }
  
    // Jika belum punya PIN → arahkan ke profil keamanan
    if (userPinExists === false) {
      const confirmSet = confirm('Kamu belum mengatur PIN. Ingin atur sekarang?');
      if (confirmSet) {
        window.location.href = '/profile?section=keamanan';
      }
      return;
    }
  
    // Sudah punya PIN → buka modal verifikasi
    setShowPinDialog(true);
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
  router.push(`/shop?search=${search}&category=${category}`); // ✅ hasil akhir
};

useEffect(() => {
  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/wallet/history?userId=${userId}`);
      const data = await res.json();
      setHistory(data.history || []);
    } catch (err) {
      console.error('Gagal fetch riwayat:', err);
    } finally {
      setHistoryLoading(false);
    }
  };
  fetchHistory();
}, [userId]);


useEffect(() => {
  const checkUserPin = async () => {
    try {
      const res = await fetch(`/api/user/${userId}`);
      const data = await res.json();
      setUserPinExists(!!data.pin); // true jika user sudah punya PIN
    } catch (err) {
      console.error('Gagal cek PIN user:', err);
    }
  };

  if (userId) checkUserPin();
}, [userId]);


  return (
    <main className="text-black bg-white">
      <Navbar/>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white lg:px-8 py-10">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black mb-8">
    Saldo LiiyPay Kamu
  </h1>

  <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 sm:p-6 rounded-2xl shadow-lg mb-8 flex flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <p className="text-base sm:text-lg">Saldo LiiyPay Saat Ini</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-1">
        Rp{(saldo || 0).toLocaleString('id-ID')}
      </h2>
    </div>
    <FaWallet className="text-4xl sm:text-5xl opacity-80" />
  </div>

  <div className="bg-white border p-5 sm:p-6 rounded-xl shadow space-y-4">
    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
      <FaMoneyBillWave className="text-green-600" /> Top Up Saldo
    </h3>

    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="number"
        value={topupAmount}
        onChange={(e) => setTopupAmount(e.target.value)}
        placeholder="Masukkan nominal (cth: 50000)"
        className="w-full sm:flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleTopup}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Top Up
      </button>
    </div>
  </div>

  <div className="mt-10 px-4 sm:px-6 lg:px-0">
  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Riwayat Transaksi</h3>

  {historyLoading ? (
  <p className="text-sm text-gray-500 italic animate-pulse">Memuat riwayat transaksi...</p>
) : history.length === 0 ? (
  <p className="text-sm text-gray-500 italic">Belum ada transaksi.</p>
) : (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
      {history.map((tx) => {
        const isCredit = tx.amount > 0;
        const isTopup = tx.orderId?.startsWith('TOPUP-');
        const extractedOrderId = parseInt(tx.orderId?.split('-')[1]);

        const linkHref = isTopup
          ? `/wallet/success?order_id=${encodeURIComponent(tx.orderId)}`
          : `/invoice?orderId=${extractedOrderId}`;

        return (
          <Link key={tx.id} href={linkHref} className="block">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex flex-row md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Order ID</p>
                  <p className="text-blue-600 font-semibold text-sm hover:underline break-words">
                    #{tx.orderId}
                  </p>
                </div>
                <div className="flex-1 text-right md:text-right">
                  <p className="text-xs text-gray-400 mb-1">Jumlah</p>
                  <p className={`${isCredit ? 'text-green-600' : 'text-red-600'} font-semibold text-sm`}>
                    {isCredit ? '+ ' : '- '}Rp{Math.abs(tx.amount).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 text-right">
                {new Date(tx.createdAt).toLocaleString('id-ID')}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  )}
</div>

</div>


    {showPinDialog && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
      <h3 className="text-lg font-semibold text-center">Masukkan PIN LiiyPay</h3>
      <input
        type="password"
        maxLength={6}
        className="border p-2 w-full rounded text-center tracking-widest"
        placeholder="••••••"
        value={pinInput}
        onChange={(e) => setPinInput(e.target.value)}
      />
      {pinError && <p className="text-sm text-red-600">{pinError}</p>}
      <div className="flex justify-between gap-2">
        <button
          onClick={() => setShowPinDialog(false)}
          className="w-full text-sm text-gray-600 hover:underline"
        >
          Batal
        </button>
        <button
  disabled={isVerifyingPin}
  onClick={async () => {
    try {
      setIsVerifyingPin(true);
      setPinError('');
      const verify = await fetch('/api/wallet/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, pin: pinInput }),
      });
      const result = await verify.json();

      if (!verify.ok) {
        setPinError(result.message || 'PIN salah');
        return;
      }

      const res = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: parseInt(topupAmount) }),
      });

      const data = await res.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert('Gagal top up.');
      }

      setShowPinDialog(false);
      setPinInput('');
    } catch (err) {
      console.error('❌ Verifikasi/topup error:', err);
      setPinError('Terjadi kesalahan.');
    } finally {
      setIsVerifyingPin(false);
    }
  }}
  className={`w-full py-2 rounded text-white ${isVerifyingPin ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
>
  {isVerifyingPin ? 'Memproses...' : 'Konfirmasi'}
</button>

      </div>
    </div>
  </div>
)} 
    <Footer/>

    </main>
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  return { props: { userId: user.id } };
});
