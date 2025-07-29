  import { PrismaClient } from '@prisma/client';
  import React, { useState } from 'react';
  import Navbar from '../navbar';
  import Footer from '../footer';
  

  export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const { id } = context.params;
    


    try {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) return { notFound: true };

      return {
        props: {
          order: {
            ...order,
            createdAt: order.createdAt.toISOString(),
            user: {
              ...order.user,
              createdAt: order.user.createdAt?.toISOString() || null,
            },
            items: order.items.map((item) => ({
              ...item,
              product: {
                ...item.product,
                createdAt: item.product.createdAt?.toISOString() || null,
              },
            })),
          },
        },
      };
    } catch (error) {
      console.error('❌ getServerSideProps error:', error);
      return { notFound: true };
    }
  }

  
  
  

  export default function DetailPesananPage({ order }) {

    const [returnReason, setReturnReason] = useState('');
    const [returnEvidence, setReturnEvidence] = useState(null);
    const [loadingReturn, setLoadingReturn] = useState(false);
    const [showReturnForm, setShowReturnForm] = useState(false); // ini baru
    const [showPinDialog, setShowPinDialog] = useState(false);
const [pinInput, setPinInput] = useState('');
const [pinError, setPinError] = useState('');
const [loadingPin, setLoadingPin] = useState(false);
const [cancelLoading, setCancelLoading] = useState(false);
const [loadingCancel, setLoadingCancel] = useState(false);



    const formatRupiah = (val) =>
      typeof val === 'number' ? `Rp${val.toLocaleString('id-ID')}` : '-';

    const handleAjukanPengembalian = async (e) => {
      e.preventDefault();
      if (!returnReason.trim()) {
        alert('Alasan wajib diisi.');
        return;
      }

      const formData = new FormData();
      formData.append('orderId', order.id);
      formData.append('reason', returnReason);
      if (returnEvidence) {
        formData.append('evidence', returnEvidence);
      }

      setLoadingReturn(true);
      try {
        const res = await fetch('/api/order-return', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          alert('Permintaan pengembalian berhasil diajukan!');
          location.reload();
        } else {
          alert('Gagal mengajukan pengembalian.');
        }
      } catch (err) {
        console.error('Gagal ajukan pengembalian:', err);
        alert('Terjadi kesalahan.');
      } finally {
        setLoadingReturn(false);
      }
    };

    const handleBayarSekarang = () => {
      const konfirmasi = confirm('Bayar sekarang dengan saldo LiiyPay?');
      if (!konfirmasi) return;
    
      // Reset state dan tampilkan modal input PIN
      setPinInput('');
      setPinError('');
      setShowPinDialog(true);
    };
  
    const handleBatalkanPesanan = async () => {
      const reason = prompt('Masukkan alasan pembatalan:');
      if (!reason) return;
      
      setLoadingCancel(true);
      try {
        const res = await fetch('/api/order-cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id, reason }),
        });
    
        const data = await res.json();
        if (res.ok && data.success) {
          alert('Pesanan berhasil dibatalkan.');
          location.reload();
        } else {
          alert(data.message || 'Gagal membatalkan pesanan.');
        }
      } catch (err) {
        console.error('❌ Error batalkan pesanan:', err);
        alert('Terjadi kesalahan.');
      } finally {
    setLoadingCancel(false); // ⬅️ selesai loading
  }
    };

    return (
      <main className='bg-white'>
        <Navbar/>
        <div className="max-w-4xl mx-auto p-6 bg-white text-black">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Detail Pesanan</h1>

        {/* Informasi Umum */}
        <div className="bg-gray-50 border p-4 rounded-md mb-6 space-y-1 text-sm">
          <p><strong>ID:</strong> {order.invoiceNumber}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`font-semibold ${
                order.status === 'Dibayar'
                  ? 'text-green-600'
                  : order.status === 'Belum-Dibayar'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {order.status.toUpperCase()}
            </span>
          </p>
          <p><strong>Tanggal Pemesanan:</strong> {new Date(order.createdAt).toLocaleString('id-ID')}</p>

          {order.trackingNumber && (
            <>
              <p><strong>No Resi:</strong> {order.trackingNumber}</p>
              <p><strong>Ekspedisi:</strong> SPX</p>

              {order.estimateArrival && (
    <p><strong>Estimasi Tiba:</strong> {order.estimateArrival}</p>
  )}
  {['Sedang-Dikirim', 'Telah-Sampai'].includes(order.status) && order.trackingNumber && (
    <button
      onClick={() =>
        window.open(
          `https://spx.co.id/tracking?tracking_number=${order.trackingNumber}`,
          '_blank'
        )
      }
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
    >
      Lacak Pengiriman di SPX
    </button>
  )}






            </>
          )}
        </div>

        {/* Produk */}
        {/* Produk */}
  <div className="bg-white border p-4 rounded-md mb-6">
    <h2 className="font-semibold text-lg mb-4">Produk Dipesan</h2>

    {order.items && order.items.length > 0 ? (
      <div className="space-y-3 mt-2">
        {order.items.map((item) => {
          const hargaSatuan = item.price ?? 0;


          const totalItem = hargaSatuan * item.quantity;

          return (
            <div key={item.id} className="flex items-center gap-3 border-b pb-3">
              <img
                src={
                  typeof item.product.imageUrls?.[0] === 'string'
                    ? item.product.imageUrls[0]
                    : item.product.imageUrls?.[0]?.url || '/placeholder.jpg'
                }
                alt={item.product.name || 'Produk'}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.product.name}</p>
                {item.color && (
  <p className="text-gray-500 text-xs">Model/Warna: {item.color}</p>
)}
{item.size && (
  <p className="text-gray-500 text-xs">Model/Ukuran: {item.size}</p>
)}

                <p className="text-xs">Jumlah: {item.quantity}</p>
              </div>
              <div className="text-sm font-semibold text-right">
                Rp{totalItem.toLocaleString('id-ID')}
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="text-sm text-gray-600">Tidak ada produk dalam pesanan ini.</p>
    )}
  </div>


        {/* Ringkasan Biaya */}
        <div className="bg-gray-50 border p-4 rounded-md mb-6">
          <h2 className="font-semibold text-lg mb-3">Ringkasan Biaya</h2>
          <div className="flex justify-between text-sm mt-4 border-t pt-2">
    <span>Subtotal Produk</span>
    <span>
      Rp{order.items.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity || 0), 0).toLocaleString('id-ID')}


    </span>
  </div>

          <div className="flex justify-between text-sm">
            <span>Ongkos Kirim</span>
            <span>{formatRupiah(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold mt-2">
            <span>Total</span>
            <span>{formatRupiah(order.total)}</span>
          </div>
        </div>

        {['Dibayar', 'Sedang-Dikirim', 'Telah-Sampai', 'Dibatalkan', 'Pengajuan-Pengembalian', 'Pengembalian-Diterima' ].includes(order.status) && (
    <div className="mt-4 mb-6">
      <a
        href={`/invoice?orderId=${order.id}`}
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        Lihat Invoice Pembayaran
      </a>
    </div>
  )}


        {/* Alamat Pengiriman */}
        <div className="bg-white border p-4 rounded-md mb-6">
          <h2 className="font-semibold text-lg mb-2">Alamat Pengiriman</h2>
          <p>{order.user.name}</p>
          <p>{order.user.phone}</p>
          <p>{order.user.address}</p>
          {order.user.province && (
            <p>{order.user.city}, {order.user.province}</p>
          )}
        </div>

        {/* Catatan Pembeli */}
        {order.buyerNote && (
          <div className="bg-gray-50 border p-4 rounded-md mb-6">
            <h2 className="font-semibold text-lg mb-2">Catatan Pembeli</h2>
            <p className="text-sm text-gray-800">{order.buyerNote}</p>
          </div>
        )}

        {/* Tombol Aksi */}
        {order.status === 'Belum-Dibayar' && (
          <div className="flex gap-3 mt-6">
            <button
  onClick={handleBayarSekarang}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
>
  Bayar Sekarang
</button>

<button
  onClick={handleBatalkanPesanan}
  disabled={loadingCancel}
  className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm ${loadingCancel ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {loadingCancel ? 'Membatalkan...' : 'Batalkan'}
</button>


          </div>
        )}

        {/* Tombol Aksi Tambahan */}
  {order.status === 'Dibayar' && (
    <div className="mt-8">
      <button
  onClick={async () => {
    const reason = prompt('Alasan pembatalan:');
    if (!reason) return;

    setCancelLoading(true); // mulai loading
    try {
      const res = await fetch('/api/order-cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, reason }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert('Pesanan berhasil dibatalkan!');
        location.reload();
      } else {
        alert(data.message || 'Gagal membatalkan pesanan.');
      }
    } catch (err) {
      console.error('❌ Gagal batalkan pesanan:', err);
      alert('Terjadi kesalahan.');
    } finally {
      setCancelLoading(false); // selesai loading
    }
  }}
  disabled={cancelLoading}
  className={`bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 text-sm ${
    cancelLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {cancelLoading ? 'Membatalkan...' : 'Batalkan Pesanan'}
</button>

    </div>
  )}

  {order.status === 'Telah-Sampai' && (
          <div className="mt-8 space-y-4">
            {/* Beri Ulasan */}
            <a
              href={`/ulasan/${order.items[0].product.id}`}
              className="block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm text-center"
            >
              Beri Ulasan Produk
            </a>

            {/* Tombol Ajukan Pengembalian */}
            {!showReturnForm ? (
              <button
                onClick={() => setShowReturnForm(true)}
                className="w-full bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 text-sm"
              >
                Ajukan Pengembalian Produk
              </button>
            ) : (
              <form
                onSubmit={handleAjukanPengembalian}
                encType="multipart/form-data"
                className="space-y-2"
              >
                <textarea
                  name="reason"
                  placeholder="Masukkan alasan pengembalian..."
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  required
                  className="w-full border rounded p-2 text-sm"
                ></textarea>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReturnEvidence(e.target.files[0])}
                  className="block text-sm"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loadingReturn}
                    className="w-full bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 text-sm"
                  >
                    {loadingReturn ? 'Mengajukan...' : 'Kirim Pengajuan'}
                  </button>

                  {/* Tombol Batal */}
                  <button
                    type="button"
                    onClick={() => setShowReturnForm(false)}
                    className="w-full bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 text-sm"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

{order.status === 'Pengembalian-Diterima' && (
  <div className="mt-8 space-y-4">

<div className="bg-gray-100 p-4 rounded text-sm">
  <h2 className="font-semibold text-lg mb-2">📢 Pengajuan Pengembalian Diterima</h2>
  <p className="mb-2">Silakan kirimkan produk ke alamat berikut:</p>
  
  <p><strong>Toko Liiystore</strong></p>
  <p>Jl. Contoh No.123, Kota Besar, Provinsi Indonesia</p>
  <p>Telepon: 0812-3456-7890</p>
</div>


    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const ekspedisi = e.target.elements.ekspedisi.value.trim();
        const resi = e.target.elements.resi.value.trim();
        if (!ekspedisi || !resi) {
          alert('Harap isi ekspedisi dan nomor resi!');
          return;
        }

        const res = await fetch('/api/order-send-return', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            returnCourierName: ekspedisi, // 🔥 pakai nama field yang sesuai di backend
            returnTrackingNumber: resi,   // 🔥 pakai nama field yang sesuai di backend
          }),
        });
        

        const data = await res.json();
        if (data.success) {
          alert('Data pengiriman pengembalian berhasil dikirim.');
          location.reload();
        } else {
          alert('Gagal menyimpan data.');
        }
      }}
      className="space-y-3"
    >
      <input
        type="text"
        name="ekspedisi"
        placeholder="Nama Ekspedisi (contoh: JNE, J&T)"
        className="w-full border rounded p-2 text-sm"
        required
      />

      <input
        type="text"
        name="resi"
        placeholder="Nomor Resi Pengiriman"
        className="w-full border rounded p-2 text-sm"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
      >
        🚚 Kirim Data Pengembalian
      </button>
    </form>
  </div>
)}

{['Proses-Pengembalian', 'Diterima-Penjual'].includes(order.status) && (
  <div className="mt-8 space-y-4">
    <div className="bg-gray-100 p-4 rounded text-sm">
      <h2 className="font-semibold text-lg mb-2">🚚 Detail Pengiriman Pengembalian</h2>
      <p><strong>Ekspedisi:</strong> {order.returnCourierName || '—'}</p>
      <p><strong>No Resi:</strong> {order.returnTrackingNumber || '—'}</p>

      {/* Tombol Edit hanya tampil kalau statusnya Proses-Pengembalian */}
      {order.status === 'Proses-Pengembalian' && (
        <button
          onClick={() => setShowReturnForm(true)}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
        >
          ✏️ Edit Data Pengiriman
        </button>
      )}
    </div>

    {/* Form edit juga hanya muncul kalau klik Edit di status Proses-Pengembalian */}
    {showReturnForm && order.status === 'Proses-Pengembalian' && (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const ekspedisi = e.target.elements.ekspedisi.value.trim();
          const resi = e.target.elements.resi.value.trim();
          if (!ekspedisi || !resi) {
            alert('Harap isi ekspedisi dan nomor resi!');
            return;
          }

          const res = await fetch('/api/order-send-return', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: order.id,
              returnCourierName: ekspedisi,
              returnTrackingNumber: resi,
            }),
          });

          const data = await res.json();
          if (data.success) {
            alert('Data pengiriman berhasil diperbarui.');
            location.reload();
          } else {
            alert('Gagal menyimpan perubahan.');
          }
        }}
        className="space-y-3 mt-4"
      >
        <input
          type="text"
          name="ekspedisi"
          defaultValue={order.returnCourierName || ''}
          placeholder="Nama Ekspedisi (contoh: JNE, J&T)"
          className="w-full border rounded p-2 text-sm"
          required
        />

        <input
          type="text"
          name="resi"
          defaultValue={order.returnTrackingNumber || ''}
          placeholder="Nomor Resi Pengiriman"
          className="w-full border rounded p-2 text-sm"
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
          >
            💾 Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={() => setShowReturnForm(false)}
            className="w-full bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 text-sm"
          >
            ❌ Batal
          </button>
        </div>
      </form>
    )}
  </div>
)}

{/* Kalau sudah ada permintaan pengembalian, tampilkan alasannya */}
{order.returnReason && (
  <div className="mt-4 bg-yellow-50 border border-yellow-300 p-3 rounded space-y-2">
    <h4 className="font-semibold text-yellow-700 text-sm">🔄 Permintaan Pengembalian</h4>
    <p className="text-gray-700 text-sm"><strong>Alasan:</strong> {order.returnReason}</p>

    {/* Kalau ada foto bukti */}
    {order.returnEvidence && (
      <div className="mt-2">
        <p className="text-sm mb-1 font-medium text-gray-800">Bukti Foto:</p>
        <img
          src={order.returnEvidence}
          alt="Bukti Pengembalian"
          className="w-40 h-40 object-cover rounded border"
        />
      </div>
    )}
  </div>
)}




  {/* Tombol Kembali */}
  <div className="mt-10">
    <a
      href="/profile?section=pesanan"
      className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm transition"
    >
      Kembali ke Pesanan Saya
    </a>
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
        disabled={loadingPin}
      />
      {pinError && <p className="text-sm text-red-600">{pinError}</p>}
      <div className="flex justify-between gap-2">
        <button
          onClick={() => setShowPinDialog(false)}
          className="w-full text-sm text-gray-600 hover:underline"
          disabled={loadingPin}
        >
          Batal
        </button>
        <button
          onClick={async () => {
            setLoadingPin(true);
            try {
              const res = await fetch('/api/wallet/verify-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: order.user.id, pin: pinInput }),
              });

              const result = await res.json();
              if (res.ok) {
                // Jika PIN benar, lanjutkan bayar
                const bayar = await fetch('/api/order/pay', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ orderId: order.id, userId: order.user.id }),
                });

                const hasil = await bayar.json();
                if (bayar.ok) {
                  alert('Pembayaran berhasil!');
                  location.reload();
                } else {
                  alert(hasil.message || 'Gagal membayar pesanan.');
                }

                setShowPinDialog(false);
              } else {
                setPinError(result.message || 'PIN salah');
              }
            } catch (err) {
              console.error('❌ Error verifikasi PIN:', err);
              setPinError('Gagal verifikasi PIN.');
            } finally {
              setLoadingPin(false);
            }
          }}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loadingPin}
        >
          {loadingPin ? 'Memverifikasi...' : 'Konfirmasi'}
        </button>
      </div>
    </div>
  </div>
)}



      </div>
      <Footer/>
      </main>
    );
  }
