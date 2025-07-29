import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import LoadingBar from '../LoadingBar';

export default function SuccessPage() {
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      const { order_id } = router.query;
      if (!order_id) return;

      try {
        const res = await fetch(`/api/midtrans/transaction?order_id=${order_id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Gagal memuat transaksi');
        setTransaction(data);
      } catch (err) {
        console.error("❌ Gagal ambil transaksi:", err);
        setError("Transaksi tidak ditemukan atau belum diproses.");
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady && router.query.order_id) {
      fetchTransaction();
    }
  }, [router.isReady, router.query.order_id]);

  if (loading) {
    return <LoadingBar/>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 bg-white">
        <p>{error}</p>
        <Link href="/wallet">
          <button className="mt-4 bg-black text-white px-5 py-2 rounded-lg">Kembali ke Dompet</button>
        </Link>
      </div>
    );
  }

  const status = transaction.transaction_status;
  const isSuccess = status === 'settlement';
  const isPending = status === 'pending';
  const isFailed = ['deny', 'cancel', 'expire', 'failure'].includes(status);

  const statusIcon = isSuccess
    ? <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
    : isPending
    ? <FaClock className="text-yellow-500 text-6xl mx-auto mb-4" />
    : <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />;

  const title = isSuccess
    ? "Top Up Berhasil!"
    : isPending
    ? "Menunggu Pembayaran"
    : "Top Up Gagal";

  const subtitle = isSuccess
    ? "Transaksi kamu telah berhasil diproses."
    : isPending
    ? "Silakan selesaikan pembayaran kamu terlebih dahulu."
    : "Transaksi tidak berhasil. Silakan coba lagi.";

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 bg-white text-black">
      <div className="text-center mb-10">
        {statusIcon}
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow space-y-4 text-sm">
        <Info label="ID Transaksi" value={transaction.transaction_id || '-'} />
        <Info label="Order ID" value={transaction.order_id || '-'} />
        <Info
          label="Jumlah Top Up"
          value={transaction.gross_amount ? `Rp${Number(transaction.gross_amount).toLocaleString('id-ID')}` : '-'}
          highlight
        />
        <Info
          label="Waktu Pembayaran"
          value={transaction.transaction_time ? new Date(transaction.transaction_time).toLocaleString('id-ID') : '-'}
        />
        <Info
          label="Status"
          value={status}
          highlight={isSuccess}
        />
      </div>

      <div className="text-center mt-8">
        <Link href="/wallet">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Kembali ke Dompet
          </button>
        </Link>
      </div>
    </main>
  );
}

function Info({ label, value, highlight }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">{label}</span>
      <span className={`text-sm ${highlight ? 'text-green-600 font-semibold capitalize' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
