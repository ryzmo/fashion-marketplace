// pages/faq.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const faqs = [
  {
    question: 'Apakah saya harus membuat akun untuk berbelanja di LiiyStore.id?',
    answer: 'Ya. Untuk melakukan pemesanan, Anda perlu membuat akun terlebih dahulu. Ini bertujuan untuk keamanan transaksi dan kemudahan pelacakan pesanan.'
  },
  {
    question: 'Apa saja metode pembayaran yang tersedia?',
    answer: 'Pembayaran difasilitasi oleh HitPay. Anda bisa memilih metode berikut: COD, Debit/Credit Card (Mastercard / VISA), QRIS, E-Wallet: Dana, ShopeePay, GoPay, OVO, dan LIIY PAY.'
  },
  {
    question: 'Ekspedisi apa saja yang digunakan untuk pengiriman?',
    answer: 'Kami bekerja sama dengan Biteship yang menyediakan berbagai jasa pengiriman seperti J&T, JNE, SiCepat, Anteraja, Shopee Express, dan jasa kirim terdaftar lainnya.'
  },
  {
    question: 'Apakah Pengiriman Bisa Diasuransikan?',
    answer: 'Ya, tersedia opsi Asuransi Pengiriman. Biaya asuransi hanya 2% dari total harga barang dan Anda akan mendapat ganti rugi barang dan ongkir penuh jika terjadi kerusakan/kehilangan.'
  },
  {
    question: 'Apakah saya bisa mengembalikan produk?',
    answer: 'Bisa, jika terjadi kerusakan karena kesalahan produksi. Produk tidak bisa diretur jika rusak akibat pengguna atau sudah sesuai pesanan.'
  },
  {
    question: 'Bagaimana prosedur pengajuan retur?',
    answer: 'Ajukan melalui email/WhatsApp maksimal 3x24 jam setelah produk diterima, sertakan nomor pesanan, foto/video produk, dan keterangan singkat.'
  },
  {
    question: 'Apakah semua produk bisa dikembalikan?',
    answer: 'Ya, selama kerusakan berasal dari pihak kami. Tidak ada pengecualian produk.'
  },
  {
    question: 'Apakah harga sudah termasuk pajak?',
    answer: 'Ya, harga di website sudah termasuk pajak.'
  },
  {
    question: 'Bagaimana jika stok produk habis setelah saya pesan?',
    answer: 'Kami akan menghubungi Anda untuk refund penuh atau penggantian produk, sesuai pilihan Anda.'
  }
];

const FAQ = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <main>
      <div className="w-full shadow-sm max-w-4xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
</div>
    <div className="bg-white text-gray-800 py-10 mb-6 px-4 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Pertanyaan yang Sering Diajukan (FAQ)</h1>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-md overflow-hidden">
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium"
            >
              {faq.question}
            </button>
            {activeIndex === idx && (
              <div className="px-4 py-3 bg-white border-t text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </main>
    
  );
};

export default FAQ;
