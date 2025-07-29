import { PrismaClient } from '@prisma/client';
import { FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import { withAuth } from '../../middleware/withAuth';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';

function ProfilePage({ user }) {
  const [orderList, setOrderList] = useState([]);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
 
  const router = useRouter();
const [section, setSection] = useState(router.query.section || 'akun');
 // default tab
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
const [cancelReason, setCancelReason] = useState('');
const [selectedOrderId, setSelectedOrderId] = useState(null);
const [showPinDialog, setShowPinDialog] = useState(false);
const [newPin, setNewPin] = useState('');
const [pinPassword, setPinPassword] = useState('');
const [pinError, setPinError] = useState('');
const [showPayNowDialog, setShowPayNowDialog] = useState(false);
const [payNowPin, setPayNowPin] = useState('');
const [payNowError, setPayNowError] = useState('');
const [selectedPayOrder, setSelectedPayOrder] = useState(null);
const [walletBalance, setWalletBalance] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const getStatusColor = (status) => {
  switch (status) {
    case 'Dibayar':
      return 'bg-green-100 text-green-700';
    case 'Belum-Dibayar':
      return 'bg-yellow-100 text-yellow-700';
    case 'Dibatalkan':
      return 'bg-red-100 text-red-700';
    case 'Diproses':
      return 'bg-blue-100 text-blue-700';
    case 'Dikirim':
    case 'Sedang-Dikirim':
      return 'bg-purple-100 text-purple-700';
    case 'Telah-Sampai':
      return 'bg-indigo-100 text-indigo-700';
    case 'Selesai':
      return 'bg-gray-100 text-gray-800';
    case 'Pengembalian-Diterima':
      return 'bg-orange-100 text-orange-700';
    case 'Diterima Penjual':
      return 'bg-pink-100 text-pink-700';
    case 'Dikirim Ulang':
      return 'bg-teal-100 text-teal-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};







  useEffect(() => {
    if (router.query.section) {
      setSection(router.query.section);
    }
  }, [router.query.section]);
  

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
  };

  const handleDeleteAccount = async () => {
    await fetch('/api/user/delete', {
      method: 'DELETE',
      body: JSON.stringify({ userId: user.id }),
    });
    router.push('/auth/login');
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

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(`/api/order?userId=${user.id}`);
          const data = await res.json();
      
          // Urutkan berdasarkan waktu terbaru
          const sorted = [...(data.orders || [])].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
      
          setOrderList(sorted);
        } catch (err) {
          console.error('Gagal ambil pesanan:', err);
        } finally {
      setIsLoading(false); // Selesai loading
    }
        
      };
      
    
      if (user?.id) fetchOrders();
    }, [user]);
    

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}&category=${category}`); // ✅ hasil akhir
  };

  const handleCancelOrder = async () => {
    if (!cancelReason || !selectedOrderId) return;
  
    try {
      const res = await fetch('/api/order-cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrderId,
          reason: cancelReason,
        }),
      });
      
      
  
      if (res.ok) {
        alert('Pesanan berhasil dibatalkan.');
        setShowCancelDialog(false);
        setCancelReason('');
        setSelectedOrderId(null);
        // Refresh list pesanan
        const updated = await fetch(`/api/order?userId=${user.id}`);
        const data = await updated.json();
        setOrderList(data.orders || []);
        // Urutkan: Belum-Dibayar dan Dibayar di atas, Dibatalkan di bawah


      } else {
        alert('Gagal membatalkan pesanan.');
      }
    } catch (err) {
      console.error('❌ Gagal cancel order:', err);
    }
  };

  const sortedOrders = [...orderList].sort((a, b) => {
    const statusOrder = { 'Belum-Dibayar': 1, 'Dibayar': 2, 'Dibatalkan': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const handleSetPin = async () => {
    try {
      const res = await fetch('/api/user/set-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, pin: newPin }),
      });
  
      if (res.ok) {
        alert('PIN berhasil diperbarui.');
        setShowPinDialog(false);
        setNewPin('');
      } else {
        alert('Gagal memperbarui PIN.');
      }
    } catch (err) {
      console.error('❌ Gagal setel PIN:', err);
    }
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch(`/api/wallet/${user.id}`);
        const data = await res.json();
        setWalletBalance(data.walletBalance || 0);
      } catch (err) {
        console.error('Gagal ambil saldo wallet:', err);
      }
    };
    if (user?.id) fetchWallet();
  }, [user]);
  
  
  

  return (
    <main className="bg-white">
      <Navbar/>
      <div className="w-full md:max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-0">


      
      {/* Sidebar */}
      <aside
  className="w-full md:w-64 text-black bg-white p-6 border-b md:border-b-0 md:border-r shadow-sm md:sticky md:top-[100px] md:max-h-[calc(100vh-100px)] md:overflow-y-auto"
>



  <h2 className="text-xl font-bold mb-6">Dashboard Profil</h2>
  <nav className="space-y-4 text-sm">
    <button onClick={() => setSection('akun')} className={`block text-left w-full ${section === 'akun' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
      Informasi Akun
    </button>
    <button onClick={() => setSection('pesanan')} className={`block text-left w-full ${section === 'pesanan' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
      Riwayat Pesanan
    </button>
    <button onClick={() => setSection('keamanan')} className={`block text-left w-full ${section === 'keamanan' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
      Keamanan
    </button>
    <button onClick={() => setSection('bantuan')} className={`block text-left w-full ${section === 'bantuan' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
      Pusat Bantuan
    </button>
    <hr className="my-4" />
    <button onClick={handleLogout} className="block text-left text-red-600 w-full">Logout</button>
    <button onClick={() => setShowConfirmDelete(true)} className="block text-left text-red-500 w-full text-sm hover:underline mt-2">
      Hapus Akun
    </button>
  </nav>
</aside>


      {/* Content */}
      <main className="flex-1 p-8 bg-white">
      {section === 'akun' && (
  <section className="w-full px-4 sm:px-6 md:px-8">


    <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">👤 Informasi Akun</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm">
      <div>
        <p className="text-gray-500 mb-1">Nama Lengkap</p>
        <div className="border rounded-md px-4 py-2 bg-gray-50 text-gray-800 font-medium">
          {user.name || '-'}
        </div>
      </div>

      <div>
        <p className="text-gray-500 mb-1">Email</p>
        <div className="border rounded-md px-4 py-2 bg-gray-100 text-gray-800 font-medium">
          {user.email || '-'}
        </div>
      </div>

      <div>
        <p className="text-gray-500 mb-1">Nomor Telepon</p>
        <div className="border rounded-md px-4 py-2 bg-white text-gray-800 font-medium">
          {user.phone || '-'}
        </div>
      </div>

      <div>
        <p className="text-gray-500 mb-1">Alamat Pengiriman</p>
        <div className="border rounded-md px-4 py-2 bg-white text-gray-800 font-medium">
          {user.address || '-'}
        </div>
      </div>
    </div>

    <div className="mt-8 flex justify-center md:justify-start">
      <Link href="/profile/edit">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm shadow-md">
          Edit Profil
        </button>
      </Link>
    </div>
  </section>
)}

{section === 'pesanan' && (
  <section className="text-black">
    <h2 className="text-xl font-bold mb-4">Riwayat Pesanan</h2>

    {isLoading ? (
      <p className="text-sm text-gray-600 animate-pulse">Memuat data pesanan...</p>
    ) : orderList.length === 0 ? (
      <p className="text-sm text-gray-600">
        Belum ada pesanan.{' '}
        <Link href="/produk" className="text-blue-600 hover:underline">
          Belanja sekarang
        </Link>.
      </p>
    ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {sortedOrders.map((order) => (
  <div
    key={order.id}
    className="border border-gray-200 rounded-lg p-5 shadow hover:shadow-lg transition cursor-pointer"
    onClick={() => router.push(`/pesanan/${order.id}`)}
  >
    <div className="flex justify-between items-center mb-1">
      <p className="text-sm text-gray-700">
        Waktu: {new Date(order.createdAt).toLocaleString('id-ID')}
      </p>
      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(order.status)}`}>
  {order.status.toUpperCase()}
</span>

    </div>

    <p className="text-sm text-gray-700 mb-2">
      Total: <strong>Rp{order.total.toLocaleString('id-ID')}</strong>
    </p>

    {/* ✅ Tambahin kondisi disini */}
    {order.status === 'Pengembalian-Diterima' && (
      <p className="text-xs text-red-600 font-medium mb-2">
        Silakan kirimkan produk ke penjual.
      </p>
    )}

    {/* Produk singkat (satu atau beberapa) */}
    {order.items && order.items.length > 0 && (
      <div className="space-y-2 mt-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={
                typeof item.product.imageUrls[0] === 'string'
                  ? item.product.imageUrls[0]
                  : item.product.imageUrls[0]?.url
              }
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="text-sm">
              <p className="font-medium">{item.product.name}</p>
              {item.color && (
                  <p className="text-gray-500 text-xs">Model/Warna: {item.color}</p>
                )}
                {item.size && (
                  <p className="text-gray-500 text-xs">Model/Ukuran: {item.size}</p>
                )}

              <p className="text-xs">Jumlah: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
))}


      </div>
    )}
  </section>
)}


{section === 'keamanan' && (
  <section className="w-full max-w-3xl px-4 text-black sm:px-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">Keamanan & Login</h2>

    <div className="space-y-4 text-sm text-gray-700 mb-12">
      <div className="border px-4 py-3 rounded-md bg-gray-50">
        <p className="font-medium">Email yang terhubung</p>
        <p className="text-gray-500 break-all">{user.email}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <p className="font-medium">Ganti Password</p>
          <p className="text-gray-500">Pastikan password baru minimal 8 karakter.</p>
        </div>
        <Link
          href="/auth/change-password"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm text-center"
        >
          Ubah Password
        </Link>
      </div>
    </div>

    <div className="border px-4 py-3 rounded-md bg-gray-50">
      <p className="font-medium mb-1">PIN LiiyPay</p>
      <p className="text-gray-500">PIN digunakan untuk keamanan saat transaksi.</p>
      <button
        onClick={() => setShowPinDialog(true)}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
      >
        Setel / Ganti PIN
      </button>
    </div>

    {/* PIN Dialog */}
    {showPinDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-4 shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-center">Ganti PIN LiiyPay</h3>
          <p className="text-sm text-gray-700 text-center">Masukkan password akun dan PIN baru.</p>

          <input
            type="password"
            placeholder="Password Akun"
            className="w-full border px-3 py-2 rounded"
            value={pinPassword}
            onChange={(e) => setPinPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="PIN Baru (6 digit)"
            maxLength={6}
            pattern="\d*"
            inputMode="numeric"
            className="w-full border px-3 py-2 rounded"
            value={newPin}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) setNewPin(val);
            }}
          />

          {pinError && <p className="text-sm text-red-600">{pinError}</p>}

          <div className="flex justify-end gap-2">
            <button onClick={() => setShowPinDialog(false)} className="text-sm text-gray-600 hover:underline">
              Batal
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              onClick={async () => {
                setPinError('');
                if (!pinPassword || !newPin || newPin.length !== 6 || !/^\d{6}$/.test(newPin)) {
                  setPinError('Password dan PIN wajib diisi, dan PIN harus 6 digit angka.');
                  return;
                }

                try {
                  const res = await fetch('/api/user/change-pin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: pinPassword, newPin }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    alert('PIN berhasil diubah!');
                    setShowPinDialog(false);
                    setPinPassword('');
                    setNewPin('');
                  } else {
                    setPinError(data.message || 'Gagal mengubah PIN');
                  }
                } catch (err) {
                  setPinError('Gagal terhubung ke server.');
                  console.error('Error ganti PIN:', err);
                }
              }}
            >
              Simpan PIN
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
)}



        {section === 'bantuan' && (
  <section className="text-black">
    <h2 className="text-xl font-bold mb-4">Pusat Bantuan</h2>
    <Link href="/bantuan" className="text-sm text-blue-600 hover:underline block">
      Kunjungi halaman Bantuan & FAQ →
    </Link>
    <p className="text-sm mt-1">Atau hubungi Customer Service kami untuk bantuan langsung.</p>
  </section>
)}


        {showConfirmDelete && (
          <div className="mt-8 bg-red-50 border border-red-300 p-4 rounded">
            <p className="text-sm text-red-700 mb-2">Apakah kamu yakin ingin menghapus akun? Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Ya, Hapus Akun
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
    {showCancelDialog && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-4 shadow-lg">
      <h3 className="text-lg font-semibold text-red-600">Batalkan Pesanan?</h3>
      <p className="text-sm text-gray-700">Kenapa kamu ingin membatalkan pesanan ini?</p>

      <select
        className="w-full border p-2 rounded text-sm"
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
      >
        <option value="">-- Pilih alasan --</option>
        <option value="Ganti ukuran">Ganti ukuran</option>
        <option value="Ganti produk">Ganti produk</option>
        <option value="Pesanan tidak sengaja">Pesanan tidak sengaja</option>
        <option value="Ingin batalkan saja">Ingin batalkan saja</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowCancelDialog(false)}
          className="text-sm text-gray-600 hover:underline"
        >
          Batal
        </button>
        <button
          onClick={handleCancelOrder}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
          disabled={!cancelReason}
        >
          Konfirmasi
        </button>
      </div>
    </div>
  </div>
)}

{showPayNowDialog && selectedPayOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
      <h3 className="text-lg font-semibold text-center">Masukkan PIN LiiyPay</h3>
      <input
        type="password"
        maxLength={6}
        className="border p-2 w-full rounded text-center tracking-widest"
        placeholder="••••••"
        value={payNowPin}
        onChange={(e) => setPayNowPin(e.target.value)}
      />
      {payNowError && <p className="text-sm text-red-600">{payNowError}</p>}
      <div className="flex justify-between gap-2">
        <button
          onClick={() => setShowPayNowDialog(false)}
          className="w-full text-sm text-gray-600 hover:underline"
        >
          Batal
        </button>
        <button
          onClick={async () => {
            try {
              setPayNowError('');
              const verify = await fetch('/api/wallet/verify-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, pin: payNowPin }),
              });
              const verifRes = await verify.json();

              if (!verify.ok) return setPayNowError(verifRes.message || 'PIN salah');

              if (walletBalance < selectedPayOrder.total) {
                return setPayNowError('Saldo tidak cukup.');
              }

              const res = await fetch('/api/order/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: selectedPayOrder.id, userId: user.id }),
              });

              const result = await res.json();
              if (res.ok) {
                router.push(`/invoice?orderId=${selectedPayOrder.id}`);
              } else {
                setPayNowError(result.message || 'Gagal melakukan pembayaran');
              }
            } catch (err) {
              console.error(err);
              setPayNowError('Terjadi kesalahan saat memproses');
            }
          }}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Konfirmasi Bayar
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
  const prisma = new PrismaClient();
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
    },
  });

  return { props: { user: fullUser } };
});

export default ProfilePage;
