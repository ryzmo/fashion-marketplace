// pages/checkout.js
import { useState, useEffect } from 'react';
import { withAuth } from '../../middleware/withAuth';
import { getProvinsiList, getKotaList } from '../../lib/daftarWilayah';
import LoadingBar from './LoadingBar';

function generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    // Menghasilkan 5 karakter random alphanumeric
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    
    return `INV-${year}${month}${day}-${randomPart}`;
}


export default function CheckoutPage({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [alamat, setAlamat] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [editingAlamat, setEditingAlamat] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [metodePembayaran, setMetodePembayaran] = useState('');
  const [loading, setLoading] = useState(true);
  const [biayaPengiriman, setBiayaPengiriman] = useState(0);
  const [kurirLabel, setKurirLabel] = useState('');
  const [selectedProvinsi, setSelectedProvinsi] = useState('');
const [selectedKota, setSelectedKota] = useState('');
const [provinsiList, setProvinsiList] = useState([]);
const [kotaList, setKotaList] = useState([]);
const [walletBalance, setWalletBalance] = useState(0);
const [showPinDialog, setShowPinDialog] = useState(false);
const [pinInput, setPinInput] = useState('');
const [pinError, setPinError] = useState('');
const [discount, setDiscount] = useState(0);
const [autoDiscountActive, setAutoDiscountActive] = useState(false);
const [isVerifyingPin, setIsVerifyingPin] = useState(false);




const ongkirByWilayah = (provinsiNama, kotaNama) => {
  const prov = provinsiNama.toUpperCase();
  const kota = kotaNama.toUpperCase();

  // 🟢 Jabodetabek
  const isJabodetabek =
    prov === 'DKI JAKARTA' ||
    (prov === 'JAWA BARAT' && (kota.includes('DEPOK') || kota.includes('BEKASI') || kota.includes('BOGOR'))) ||
    (prov === 'BANTEN' && kota.includes('TANGERANG'));

  if (isJabodetabek) return 16000;

  // 🟠 Non-Jabodetabek Jawa Barat
  if (prov === 'JAWA BARAT') return 18000;

  // 🟡 Jateng, Jatim, DIY
  if (['JAWA TENGAH', 'JAWA TIMUR', 'DAERAH ISTIMEWA YOGYAKARTA'].includes(prov)) return 28000;

  // 🔵 Sumatera Selatan & Barat
  if (['SUMATERA SELATAN', 'SUMATERA BARAT'].includes(prov)) return 40000;

  // 🟣 Daerah lain
  if (['ACEH', 'SUMATERA UTARA', 'NTB', 'NTT', 'BALI', 'KALIMANTAN TIMUR', 'SULAWESI SELATAN'].includes(prov)) return 60000;

  // 🔴 Papua
  if (prov === 'PAPUA') return 80000;

  // ⚪ Default lainnya
  return 60000;
};





  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`/api/cart/${userId}`);
      const data = await res.json();
      setCartItems(data);
      setLoading(false);
    };

    
    

    if (userId) {
      fetchCart();
      fetchAlamat();
    }
  }, [userId]);

  
  useEffect(() => {
    getProvinsiList().then((list) => {
      setProvinsiList(list);
    });
  }, []);
  const fetchAlamat = async () => {
    const res = await fetch(`/api/user/${userId}`);
    const data = await res.json();
  
    setAlamat(data.address || '');
    setNamaPenerima(data.name || '');
    setNomorTelepon(data.phone || '');
  
    // 🟢 Simpan provinsi & kota langsung
    setSelectedKota(data.city || '');
  
    // Tunggu provinsiList tersedia sebelum cari ID
    const matchingProv = provinsiList.find(p => p.nama === data.province);
    if (matchingProv) {
      setSelectedProvinsi(matchingProv.id);
    }
  
    // Set ongkir berdasarkan data province + city
    if (data.province && data.city) {
      const ongkir = ongkirByWilayah(data.province, data.city);
      setBiayaPengiriman(ongkir);
      setKurirLabel(`Biaya flat: Rp${ongkir.toLocaleString('id-ID')}`);
    }
  };

  useEffect(() => {
    if (provinsiList.length && userId) {
      fetchAlamat(); // dipanggil setelah provinsi siap
    }
  }, [provinsiList, userId]);
  
  

useEffect(() => {
  if (selectedProvinsi) {
    getKotaList(selectedProvinsi).then(setKotaList);
  } else {
    setKotaList([]);
  }
}, [selectedProvinsi]);

const handleUpdateAlamat = async () => {
  if (!namaPenerima || !nomorTelepon || !alamat || !selectedProvinsi || !selectedKota) {
    alert('Semua kolom alamat wajib diisi.');
    return;
  }

  try {
    const provNama = provinsiList.find((p) => p.id === selectedProvinsi)?.nama || '';

    const res = await fetch(`/api/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: namaPenerima,
        phone: nomorTelepon,
        address: alamat,
        province: provNama,
        city: selectedKota
      })
    });

    const data = await res.json();
    if (res.ok) {
      setAlamat(alamat);
      setKurirLabel(`Biaya flat: Rp${ongkirByWilayah(provNama, selectedKota).toLocaleString('id-ID')}`);
      setBiayaPengiriman(ongkirByWilayah(provNama, selectedKota));
      setEditingAlamat(false);
    } else {
      alert(data.message || 'Gagal menyimpan alamat.');
    }
  } catch (err) {
    console.error('Gagal update alamat:', err);
  }
};







const handleBuatPesanan = async () => {
  if (!namaPenerima || !nomorTelepon || !alamat || !selectedProvinsi || !selectedKota) {
    alert('Mohon lengkapi alamat pengiriman terlebih dahulu.');
    return;
  }

  const isSaldoCukup = walletBalance >= totalPembayaran;
  if (!isSaldoCukup) {
    const lanjut = confirm(`Saldo kamu tidak cukup. Pesanan akan dibuat berstatus menunggu pembayaran. Lanjutkan?`);
    if (!lanjut) return;
  }

  if (isSaldoCukup) {
    setShowPinDialog(true);
    return;
  }

  await createOrder('Belum-Dibayar');
};


const createOrder = async (status = 'Dibayar') => {
  try {
    const newInvoiceNumber = generateInvoiceNumber();
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoiceNumber: newInvoiceNumber,
        userId,
        items: cartItems.map(item => ({
  productId: item.product.id,
  quantity: item.quantity,
  color: item.color || null,
  size: item.size || null,
  price: item.price
})),
        total: totalPembayaran,
        shippingCost: biayaPengiriman,
        metode: 'LiiyPay',
        alamat,
        provinsi: provinsiList.find(p => p.id === selectedProvinsi)?.nama || '',
        kota: selectedKota,
        phone: nomorTelepon,
        buyerNote: catatan,
        status,
        expireAt: status === 'Belum-Dibayar'
          ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          : null
      })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Kirim email notifikasi ke admin (panggil server API, bukan lib langsung)
      try {
        await fetch('/api/notify-admin-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderId })
        });
      } catch (err) {
        console.error('❌ Gagal kirim notifikasi ke admin:', err);
      }

      // 🧹 Hapus item dari cart
      await Promise.all(
        cartItems.map((item) =>
          fetch(`/api/cart/${userId}?itemId=${item.id}`, {
            method: 'DELETE',
          })
        )
      );

      // 🔀 Redirect user
      if (status === 'Dibayar') {
        window.location.href = `/terimakasih?orderId=${data.orderId}`;
      } else {
        window.location.href = '/profile?section=pesanan';
      }
    } else {
      alert(data.message || 'Gagal membuat pesanan.');
    }
  } catch (err) {
    console.error('❌ Error buat pesanan:', err);
    alert('Terjadi kesalahan.');
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
  } else {
    setAutoDiscountActive(false);
    setDiscount(0);
  }
}, [cartItems]);



  const subtotalProduk = cartItems.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);


  const biayaLayanan = 1000;
  const totalPembayaran = subtotalProduk - (discount / 100) * subtotalProduk + biayaPengiriman + biayaLayanan;


  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch(`/api/wallet/${userId}`);
        const data = await res.json();
        setWalletBalance(data.walletBalance || 0);
      } catch (err) {
        console.error('Gagal ambil saldo wallet:', err);
      }
    };
  
    if (userId) fetchWallet();
  }, [userId]);
  

  if (loading) return <LoadingBar/>;

  return (
    
    <main className="bg-white">
      {/* Minimal Checkout Navbar */}
<div className="w-full shadow-sm max-w-5xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
  <span className="text-sm text-gray-500 hidden sm:block">
    Checkout 🔒
  </span>
</div>


      <div className="max-w-5xl bg-white text-black mx-auto px-4 py-10 space-y-6">
      
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="border p-4 rounded shadow">
  <div className="flex justify-between items-center mb-2">
    <h2 className="text-lg font-semibold text-red-600">Alamat Pengiriman</h2>
    <button
      onClick={editingAlamat ? handleUpdateAlamat : () => setEditingAlamat(true)}
      className="text-blue-600 text-sm hover:underline"
    >
      {editingAlamat ? 'Simpan' : 'Ubah'}
    </button>
  </div>

  {editingAlamat ? (
    <div className="space-y-2">
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={namaPenerima}
        onChange={(e) => setNamaPenerima(e.target.value)}
        placeholder="Nama Penerima"
      />
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={nomorTelepon}
        onChange={(e) => setNomorTelepon(e.target.value)}
        placeholder="Nomor Telepon"
      />
      <textarea
        className="w-full border p-2 rounded"
        rows={2}
        value={alamat}
        onChange={(e) => setAlamat(e.target.value)}
        placeholder="Alamat Lengkap (Nama Jalan, RT/RW, dsb)"
      />

      <select
        className="w-full border p-2 rounded"
        value={selectedProvinsi}
        onChange={(e) => {
          setSelectedProvinsi(e.target.value);
          setSelectedKota('');
          setBiayaPengiriman(0);
          setKurirLabel('');
        }}
      >
        <option value="">-- Pilih Provinsi --</option>
        {provinsiList.map((prov) => (
          <option key={prov.id} value={prov.id}>{prov.nama}</option>
        ))}
      </select>

      {selectedProvinsi && (
        <select
          className="w-full border p-2 rounded"
          value={selectedKota}
          onChange={(e) => {
            setSelectedKota(e.target.value);
            const provNama = provinsiList.find((p) => p.id === selectedProvinsi)?.nama || '';
            const ongkir = ongkirByWilayah(provNama, e.target.value);
            setBiayaPengiriman(ongkir);
            setKurirLabel(`Biaya flat: Rp${ongkir.toLocaleString('id-ID')}`);
          }}
        >
          <option value="">-- Pilih Kota/Kabupaten --</option>
          {kotaList.map((kota) => (
            <option key={kota.id} value={kota.nama}>{kota.nama}</option>
          ))}
        </select>
      )}
    </div>
  ) : (
    <>
      <p className="font-bold">{namaPenerima} (+62) {nomorTelepon}</p>
<p className="text-sm text-gray-700 mt-1">{alamat}</p>
<p className="text-sm text-gray-700">{selectedKota}, {provinsiList.find(p => p.id === selectedProvinsi)?.nama || ''}</p>
{kurirLabel && (
  <p className="text-xs text-green-600 mt-1">{kurirLabel}</p>
)}
    </>
  )}
</div>


      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">🛍️ Produk Dipesan</h2>
        {cartItems.map((item) => (
  <div key={item.id} className="flex items-center gap-4 border-b py-3">
    <img
      src={typeof item.product.imageUrls[0] === 'string' ? item.product.imageUrls[0] : item.product.imageUrls[0]?.url}
      alt={item.product.name}
      className="w-20 h-20 object-cover rounded"
    />
    <div className="flex-1">
      <p className="text-sm font-medium">{item.product.name}</p>
      {item.color && <p className="text-xs text-gray-600">Warna: {item.color}</p>}
      <p className="text-xs text-gray-600">Ukuran: {item.size}</p>
      <p className="text-xs text-gray-600">Jumlah: {item.quantity}</p>
    </div>
    <p className="text-sm font-semibold">
      Rp{(item.price * item.quantity).toLocaleString('id-ID')}
    </p>
  </div>
))}


        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Pesan untuk Penjual</label>
          <input className="w-full border p-2 rounded" value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="(Opsional) Tinggalkan pesan" />
        </div>
      </div>

      <div className="border p-4 rounded shadow">
        <div className="flex justify-between items-center">
        <p className="text-sm font-medium">
  Opsi Pengiriman: <strong>{kurirLabel || 'Biaya akan ditentukan setelah memilih provinsi'}</strong>
</p>

          <p className="text-sm">Rp{biayaPengiriman.toLocaleString('id-ID')}</p>
        </div>
        {kurirLabel && (
  <p className="text-xs text-green-600 mt-1">Estimasi pengiriman berdasarkan provinsi tujuan</p>
)}

      </div>

      <div className="border p-4 rounded shadow relative">
  <h2 className="text-lg font-semibold mb-2">💳 Metode Pembayaran</h2>
  <p className="text-sm font-medium">Pembayaran akan menggunakan saldo LiiyPay kamu.</p>
  <p className="text-sm text-green-700 mt-2">
    Saldo LiiyPay kamu: <strong>Rp{walletBalance.toLocaleString('id-ID')}</strong>
  </p>
  {walletBalance < totalPembayaran && (
    <p className="text-sm text-red-600 mt-1">
      ❗ Saldo kamu kurang sebesar <strong>Rp{(totalPembayaran - walletBalance).toLocaleString('id-ID')}</strong>. Pesanan akan berstatus <em>menunggu pembayaran</em>.
    </p>
  )}
  <a
    href="/wallet"
    className="absolute top-4 right-4 text-sm text-blue-600 hover:text-blue-800 font-semibold"
  >
    ➕ Top Up
  </a>
</div>

      <div className="border p-4 rounded shadow">
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal Produk</span>
            <span>Rp{subtotalProduk.toLocaleString('id-ID')}</span>
          </div>
          {discount > 0 && (
  <div className="flex justify-between text-sm text-green-600">
    <span>Diskon Otomatis</span>
    <span>-Rp{((discount / 100) * subtotalProduk).toLocaleString('id-ID')}</span>
  </div>
)}

          <div className="flex justify-between">
            <span>Subtotal Pengiriman</span>
            <span>Rp{biayaPengiriman.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Layanan</span>
            <span>Rp{biayaLayanan.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between font-bold text-red-600 text-base pt-2">
            <span>Total Pembayaran</span>
            <span>Rp{totalPembayaran.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <button
  onClick={handleBuatPesanan}
  className="mt-6 w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 font-semibold"
>
  Buat Pesanan
</button>
      </div>
      {showPinDialog && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs space-y-4">
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
    setIsVerifyingPin(true);
    setPinError('');
    try {
      const res = await fetch('/api/wallet/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, pin: pinInput }),
      });

      const result = await res.json();
      if (res.ok) {
        await createOrder('Dibayar');
      } else {
        setPinError(result.message || 'PIN salah');
      }
    } catch (err) {
      console.error('❌ Error verifikasi PIN:', err);
      setPinError('Gagal verifikasi PIN.');
    } finally {
      setIsVerifyingPin(false);
    }
  }}
  className={`w-full py-2 rounded ${isVerifyingPin ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
>
  {isVerifyingPin ? 'Memverifikasi...' : 'Konfirmasi'}
</button>

      </div>
    </div>
  </div>
)}

    </div>
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