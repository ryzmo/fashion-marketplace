// pages/privacy-policy.js
import React from 'react';
import { useRouter } from 'next/router';

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <main className="bg-white">
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

      <h1 className="text-3xl font-bold mb-6 text-center">Kebijakan Privasi</h1>

      <p className="mb-4">
        Di LiiyStore, yang dapat diakses melalui liiystore.id, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini menjelaskan jenis informasi yang dikumpulkan dan dicatat oleh LiiyStore, serta bagaimana kami menggunakannya.
      </p>

      <p className="mb-4">
        Kebijakan ini hanya berlaku untuk aktivitas online kami dan berlaku bagi pengunjung situs web kami sehubungan dengan informasi yang mereka bagikan dan/atau kumpulkan di LiiyStore. Kebijakan ini tidak berlaku untuk informasi yang dikumpulkan secara offline atau melalui saluran selain situs ini.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Persetujuan</h2>
      <p className="mb-4">Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui ketentuannya.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Informasi yang Kami Kumpulkan</h2>
      <p className="mb-2">Kami mengumpulkan informasi pribadi yang relevan dan hanya jika dibutuhkan, termasuk:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Nama lengkap</li>
        <li>Alamat email</li>
        <li>Nomor telepon</li>
        <li>Alamat pengiriman</li>
        <li>Informasi transaksi dan pembayaran</li>
        <li>Pesan dan lampiran jika Anda menghubungi kami langsung</li>
      </ul>

      <p className="mb-2">Informasi dikumpulkan saat Anda:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Menghubungi kami melalui formulir kontak</li>
        <li>Mendaftar akun</li>
        <li>Melakukan pembelian atau transaksi</li>
        <li>Berlangganan newsletter</li>
        <li>Mengisi survei atau promosi lainnya</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Bagaimana Kami Menggunakan Informasi Anda</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Mengelola dan mengoperasikan layanan kami</li>
        <li>Memproses transaksi dan pengiriman</li>
        <li>Memberikan dukungan pelanggan</li>
        <li>Mengirim email berkala dan penawaran</li>
        <li>Menganalisis penggunaan situs</li>
        <li>Mendeteksi dan mencegah aktivitas ilegal</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Log File</h2>
      <p className="mb-4">LiiyStore menggunakan file log untuk analitik hosting. Data ini termasuk alamat IP, jenis browser, ISP, tanggal dan waktu, halaman rujukan/keluar, dan jumlah klik. Tidak terkait langsung dengan identitas pribadi.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Cookies dan Web Beacon</h2>
      <p className="mb-4">Cookies digunakan untuk menyimpan preferensi dan riwayat akses guna meningkatkan pengalaman pengguna sesuai jenis browser dan perilaku pengguna.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Dasar Hukum Pengolahan Data</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Persetujuan pengguna</li>
        <li>Perjanjian atau kontrak</li>
        <li>Kepatuhan hukum</li>
        <li>Kepentingan sah bisnis</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Pihak Ketiga</h2>
      <p className="mb-2">Data dapat dibagikan ke pihak ketiga terpercaya:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Payment gateway: Hitpay, Midtrans, Xendit</li>
        <li>Jasa pengiriman: J&T, JNE, SiCepat, Anteraja, Shopee Express</li>
        <li>Analitik: Google Analytics</li>
        <li>Pemasaran: Facebook Pixel</li>
      </ul>

      <p className="mb-4">Pihak ketiga hanya menerima informasi yang diperlukan dan wajib menjaga kerahasiaannya.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Retensi Data</h2>
      <p className="mb-4">Data pribadi disimpan sesuai kebutuhan kebijakan ini atau hukum berlaku. Pengguna dapat meminta penghapusan kapan saja.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Keamanan Data</h2>
      <p className="mb-4">Kami menerapkan langkah teknis wajar untuk melindungi data, namun tidak dapat menjamin 100% keamanannya.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Hak Anda atas Data Pribadi</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Akses data pribadi</li>
        <li>Perbaikan data yang tidak akurat</li>
        <li>Penghapusan data</li>
        <li>Menolak pemrosesan tertentu</li>
        <li>Meminta salinan data</li>
      </ul>

      <p className="mb-4">Silakan hubungi kami untuk menggunakan hak-hak ini.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Perubahan Kebijakan Privasi</h2>
      <p className="mb-4">Kami dapat memperbarui kebijakan ini kapan saja. Perubahan berlaku setelah dipublikasikan di halaman ini.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Privasi Anak-anak</h2>
      <p className="mb-4">Kami tidak mengumpulkan data anak-anak di bawah 13 tahun. Jika terjadi, data akan dihapus segera.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Kontak Kami</h2>
      <p>Email: <a href="mailto:muhammadsurazharfansyah@liiystore.id" className="text-blue-600 hover:underline">muhammadsurazharfansyah@liiystore.id</a></p>
      <p>Alamat: Jl. Kebembem Raya No. 100 RT02/RW21 Kel. Abadijaya, Kec. Sukmajaya, Kota Depok, Provinsi Jawa Barat, Indonesia (16417)</p>
      <p>Telepon/WhatsApp: <a href="tel:+6287775465062" className="text-blue-600 hover:underline">+62 877-7546-5062</a></p>
    </div>
    </main>
    
  );
};

export default PrivacyPolicy;
