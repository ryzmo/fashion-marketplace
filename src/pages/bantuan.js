// pages/bantuan.js
import { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Image from 'next/image';

export default function BantuanPage() {
  const [activeTab, setActiveTab] = useState('panduan');

  const tabClass = (tab) =>
    `px-4 py-2 text-sm font-medium rounded-t-md ${
      activeTab === tab
        ? 'bg-white border-t border-l border-r text-blue-600'
        : 'bg-gray-100 text-gray-600 hover:text-blue-600'
    }`;

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

const [activeIndex, setActiveIndex] = useState(null);


  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Pusat Bantuan</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b mb-6">
            <button onClick={() => setActiveTab('panduan')} className={tabClass('panduan')}>
            Panduan Belanja
          </button>
          <button onClick={() => setActiveTab('terms')} className={tabClass('terms')}>
            Terms & Condition
          </button>
          <button onClick={() => setActiveTab('faq')} className={tabClass('faq')}>
            FAQ
          </button>
          <button onClick={() => setActiveTab('privacy')} className={tabClass('privacy')}>
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded shadow text-sm leading-relaxed text-gray-800">
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Syarat dan Ketentuan Pengguna</h2>
              <p className="mb-4">
                Selamat datang di website resmi LiiyStore (<a href="https://liiystore.id" className="text-blue-600 hover:underline">liiystore.id</a>).
                Dengan mengakses dan menggunakan layanan kami, Anda menyetujui untuk terikat oleh Syarat & Ketentuan berikut ini. Harap membaca dengan cermat sebelum menggunakan situs kami.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">1. Akun Pengguna</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Untuk berbelanja di LiiyStore.id, pengguna wajib membuat akun terlebih dahulu.</li>
                <li>Anda bertanggung jawab atas keamanan informasi akun Anda, termasuk kerahasiaan kata sandi.</li>
                <li>Segala aktivitas yang terjadi dalam akun Anda adalah tanggung jawab Anda.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">2. Pemesanan & Pembayaran</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Transaksi difasilitasi oleh HitPay: Kartu Kredit/Debit, QRIS, E-Wallet (Dana, ShopeePay, GoPay, OVO), COD, dan LIIY PAY.</li>
                <li>Harga sudah termasuk pajak dan dapat berubah tanpa pemberitahuan sebelumnya.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">3. Pengiriman</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Pengiriman oleh Biteship: J&T, JNE, SiCepat, Anteraja, Shopee Express, dan lainnya.</li>
                <li>Estimasi tergantung lokasi dan jasa kirim.</li>
                <li>Nomor resi diberikan setelah pengiriman.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">4. Retur & Pengembalian Produk</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Retur hanya untuk produk rusak karena produksi.</li>
                <li>Kerusakan akibat pengguna tidak dapat diklaim.</li>
                <li>Tidak bisa refund jika produk sesuai dan tidak cacat.</li>
                <li>Ajukan retur maksimal 3x24 jam dengan bukti foto/video.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">5. Ketersediaan Produk</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Dapat berubah sewaktu-waktu.</li>
                <li>Kami berhak menolak pesanan jika stok tidak tersedia atau ada kesalahan harga.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">6. Hak Kekayaan Intelektual</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Seluruh konten situs milik LiiyStore dan dilindungi hukum.</li>
                <li>Dilarang menyalin atau menyebarkan tanpa izin tertulis.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">7. Perubahan Syarat & Ketentuan</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Kami dapat memperbarui syarat ini kapan saja.</li>
                <li>Perubahan berlaku segera setelah dipublikasikan di halaman ini.</li>
              </ul>
            </div>
          )}

          {activeTab === 'faq' && (
  <div className="space-y-4">
    {faqs.map((faq, idx) => (
      <div key={idx} className="border rounded-md overflow-hidden">
        <button
          onClick={() => setActiveIndex(idx === activeIndex ? null : idx)}
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
)}

          {activeTab === 'privacy' && (
  <div className="text-sm leading-relaxed space-y-6">
    <h2 className="text-2xl font-bold text-center">Kebijakan Privasi</h2>
    <p>
      Di LiiyStore, yang dapat diakses melalui liiystore.id, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini menjelaskan jenis informasi yang dikumpulkan dan dicatat oleh LiiyStore, serta bagaimana kami menggunakannya.
    </p>
    <p>
      Kebijakan ini hanya berlaku untuk aktivitas online kami dan berlaku bagi pengunjung situs web kami sehubungan dengan informasi yang mereka bagikan dan/atau kumpulkan di LiiyStore. Kebijakan ini tidak berlaku untuk informasi yang dikumpulkan secara offline atau melalui saluran selain situs ini.
    </p>

    <h3 className="font-semibold text-lg">Persetujuan</h3>
    <p>Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui ketentuannya.</p>

    <h3 className="font-semibold text-lg">Informasi yang Kami Kumpulkan</h3>
    <ul className="list-disc ml-5 space-y-1">
      <li>Nama lengkap</li>
      <li>Alamat email</li>
      <li>Nomor telepon</li>
      <li>Alamat pengiriman</li>
      <li>Informasi transaksi dan pembayaran</li>
      <li>Pesan dan lampiran jika Anda menghubungi kami langsung</li>
    </ul>

    <p className="mt-2">Informasi dikumpulkan saat Anda:</p>
    <ul className="list-disc ml-5 space-y-1">
      <li>Menghubungi kami melalui formulir kontak</li>
      <li>Mendaftar akun</li>
      <li>Melakukan pembelian atau transaksi</li>
      <li>Berlangganan newsletter</li>
      <li>Mengisi survei atau promosi lainnya</li>
    </ul>

    <h3 className="font-semibold text-lg">Bagaimana Kami Menggunakan Informasi Anda</h3>
    <ul className="list-disc ml-5 space-y-1">
      <li>Mengelola dan mengoperasikan layanan kami</li>
      <li>Memproses transaksi dan pengiriman</li>
      <li>Memberikan dukungan pelanggan</li>
      <li>Mengirim email berkala dan penawaran</li>
      <li>Menganalisis penggunaan situs</li>
      <li>Mendeteksi dan mencegah aktivitas ilegal</li>
    </ul>

    <h3 className="font-semibold text-lg">Log File</h3>
    <p>LiiyStore menggunakan file log untuk analitik hosting. Data ini termasuk alamat IP, jenis browser, ISP, tanggal dan waktu, halaman rujukan/keluar, dan jumlah klik. Tidak terkait langsung dengan identitas pribadi.</p>

    <h3 className="font-semibold text-lg">Cookies dan Web Beacon</h3>
    <p>Cookies digunakan untuk menyimpan preferensi dan riwayat akses guna meningkatkan pengalaman pengguna sesuai jenis browser dan perilaku pengguna.</p>

    <h3 className="font-semibold text-lg">Dasar Hukum Pengolahan Data</h3>
    <ul className="list-disc ml-5 space-y-1">
      <li>Persetujuan pengguna</li>
      <li>Perjanjian atau kontrak</li>
      <li>Kepatuhan hukum</li>
      <li>Kepentingan sah bisnis</li>
    </ul>

    <h3 className="font-semibold text-lg">Pihak Ketiga</h3>
    <ul className="list-disc ml-5 space-y-1">
      <li>Payment gateway: Hitpay, Midtrans, Xendit</li>
      <li>Jasa pengiriman: J&T, JNE, SiCepat, Anteraja, Shopee Express</li>
      <li>Analitik: Google Analytics</li>
      <li>Pemasaran: Facebook Pixel</li>
    </ul>
    <p>Pihak ketiga hanya menerima informasi yang diperlukan dan wajib menjaga kerahasiaannya.</p>

    <h3 className="font-semibold text-lg">Retensi Data</h3>
    <p>Data pribadi disimpan sesuai kebutuhan kebijakan ini atau hukum berlaku. Pengguna dapat meminta penghapusan kapan saja.</p>

    <h3 className="font-semibold text-lg">Keamanan Data</h3>
    <p>Kami menerapkan langkah teknis wajar untuk melindungi data, namun tidak dapat menjamin 100% keamanannya.</p>

    <h3 className="font-semibold text-lg">Hak Anda atas Data Pribadi</h3>
    <ul className="list-disc ml-5 space-y-1">
      <li>Akses data pribadi</li>
      <li>Perbaikan data yang tidak akurat</li>
      <li>Penghapusan data</li>
      <li>Menolak pemrosesan tertentu</li>
      <li>Meminta salinan data</li>
    </ul>
    <p>Silakan hubungi kami untuk menggunakan hak-hak ini.</p>

    <h3 className="font-semibold text-lg">Perubahan Kebijakan Privasi</h3>
    <p>Kami dapat memperbarui kebijakan ini kapan saja. Perubahan berlaku setelah dipublikasikan di halaman ini.</p>

    <h3 className="font-semibold text-lg">Privasi Anak-anak</h3>
    <p>Kami tidak mengumpulkan data anak-anak di bawah 13 tahun. Jika terjadi, data akan dihapus segera.</p>

    <h3 className="font-semibold text-lg">Kontak Kami</h3>
    <p>Email: <a href="mailto:muhammadsurazharfansyah@liiystore.id" className="text-blue-600 hover:underline">muhammadsurazharfansyah@liiystore.id</a></p>
    <p>Alamat: Jl. Kebembem Raya No. 100 RT02/RW21 Kel. Abadijaya, Kec. Sukmajaya, Kota Depok, Provinsi Jawa Barat, Indonesia (16417)</p>
    <p>Telepon/WhatsApp: <a href="tel:+6287775465062" className="text-blue-600 hover:underline">+62 877-7546-5062</a></p>
  </div>
)}


          {activeTab === 'panduan' && (
  <div className="space-y-6 text-sm leading-relaxed text-gray-800">
    <h2 className="text-2xl font-bold text-center mb-6">Panduan Belanja di LiiyStore.id</h2>

    <div className="md:flex md:items-start md:space-x-6 mb-6">
      <div className="md:w-1/3 w-full mb-4 md:mb-0">
        <Image
          src="/panduanbelanja.png"
          alt="Panduan Belanja"
          width={300}
          height={300}
          className="rounded w-full h-auto"
        />
      </div>
      <div className="md:w-3/4">
        <h3 className="text-lg font-semibold mb-2">1. Buat Akun</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Kunjungi website kami di <a href="https://liiystore.id" className="text-blue-600 hover:underline">liiystore.id</a></li>
          <li>Klik tombol "Daftar / Masuk" di pojok kanan atas</li>
          <li>Masukkan email aktif, nama lengkap, dan buat password</li>
          <li>Setelah akun dibuat, kamu bisa mulai berbelanja</li>
        </ul>
        <h3 className="text-lg pt-6 font-semibold">2. Pilih Produk</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Telusuri katalog produk dari kategori yang tersedia (busana muslim, hijab, aksesoris, dll)</li>
        <li>Klik produk yang kamu suka untuk melihat detailnya (ukuran, warna, bahan, dll)</li>
        <li>Pilih varian yang diinginkan dan klik "Tambah ke Keranjang"</li>
      </ul>
      <h3 className="text-lg font-semibold pt-6">3. Checkout & Pembayaran</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Klik ikon keranjang dan pilih "Checkout"</li>
        <li>Isi alamat pengiriman dengan lengkap</li>
        <li>Pilih metode pengiriman yang tersedia</li>
        <li>Pilih metode pembayaran:</li>
        <ul className="list-disc ml-6 space-y-1">
          <li>E-Wallet: Dana, OVO, ShopeePay, GoPay</li>
          <li>Kartu Debit/Kredit</li>
          <li>QRIS</li>
          <li>COD (Bayar di Tempat)</li>
          <li>LIIY PAY (dompet digital dari website kami)</li>
        </ul>
        <li>Klik "Bayar Sekarang" dan selesaikan proses pembayaran</li>
      </ul>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold">4. Pengiriman</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Pesanan akan diproses maksimal 1x24 jam setelah pembayaran diterima</li>
        <li>Kami menggunakan jasa kirim terpercaya seperti J&T, JNE, SiCepat, Anteraja, Shopee Express, dan lainnya</li>
        <li>Estimasi pengiriman mengikuti lokasi tujuan</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold">5. Retur Produk</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Klaim retur hanya jika produk rusak karena kesalahan dari kami</li>
        <li>Tidak berlaku jika rusak karena pemakaian atau produk sesuai pesanan</li>
        <li>Ajukan retur maksimal 3x24 jam setelah barang diterima</li>
        <li>Kirim bukti video unboxing melalui WhatsApp atau email kami</li>
      </ul>
    </div>
  </div>
)}


        </div>
      </div>

      <Footer />
    </main>
  );
}
