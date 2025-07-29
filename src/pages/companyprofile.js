import React from "react";
import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Navbar from './navbar';
import Footer from "./footer";

export default function CompanyProfile() {
  return (
    <main className="bg-white text-gray-800 min-h-screen">
        <Navbar/>
      <div className="max-w-7xl px-4 mx-auto space-y-16 pt-16">

      <section className="text-center space-y-4">
          <div className="flex justify-center">
          <Image src="/logo.jpg" alt="LIIY Logo" width={200} height={200} className="rounded-full" />
          </div>
          <h1 className="text-3xl font-bold">LIIY</h1>
          <p className="text-lg italic">Leading in Innovation Yonder</p>
          <p>
            Jl. Kebembem Raya No. 100, RT 02 / RW 21, Kel. Abadijaya,<br />
            Kec. Sukmajaya, Kota Depok, Jawa Barat 16417, Indonesia
          </p>
          <p>
            Telepon: <a href="tel:+6287775465062" className="text-blue-600 underline">+62 877-7546-5062</a> |
            Email: <a href="mailto:muhammadsurazharfansyah@liiystore.id" className="text-blue-600 underline">muhammadsurazharfansyah@liiystore.id</a>
          </p>
        </section>

        {/* Tentang Kami */}
        <section className="text-center ">
          <h1 className="text-3xl font-bold mb-4 text-c">TENTANG KAMI</h1>
          <p>
          LIIY (Leading in Innovation Yonder) adalah perusahaan lokal Indonesia yang berfokus pada produksi dan penyediaan perlengkapan muslim secara lengkap di kawasan Asia Tenggara. Kami menawarkan berbagai pilihan fashion muslim mulai dari kualitas ekonomis hingga premium. Dengan tetap mengedepankan kualitas dan inovasi, kami dengan bangga menyatakan bahwa seluruh produk kami 100% Lokal, yang melibatkan berbagai konveksi lokal dalam setiap tahap pembuatannya. Komitmen kami adalah menjadi mitra terbaik bagi pelanggan dalam memenuhi kebutuhan gaya hidup islami, khususnya di era modern seperti saat ini.
          </p>
        </section>

        {/* Visi & Misi */}
        <section id="visimisi" className="py-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">VISI & MISI KAMI</h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-8">
            <div>
              <h3 className="text-lg font-bold">Visi</h3>
              <p>
                Menjadi brand perlengkapan muslim terdepan di Asia Tenggara yang memberi inspirasi gaya hidup islami modern melalui inovasi, kualitas, dan rasa bangga terhadap produk lokal asli buatan Indonesia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Misi</h3>
              <ul className="list-disc ml-5 space-y-2">
                <li>Menyediakan perlengkapan muslim lengkap & variatif, dari kategori ekonomis hingga premium, sesuai kebutuhan pasar yang dinamis.</li>
                <li>Mendorong kolaborasi dengan konveksi & pelak industri lokal untuk memberdayakan UMKM dan mengangkat potensi produk dalam negeri.</li>
                <li>Mengedepankan inovasi dalam desain, teknologi, dan layanan, agar pelanggan merasakan pengalaman belanja yang praktis, nyaman, dan relevan di era digital.</li>
                <li>Menjadi mitra terpercaya bagi pelanggan dalam memenuhi kebutuhan gaya hidup islami yang modern.</li>
                <li>Mengembangkan pasar regional dengan semangat untuk membawa produk lokal indonesia menjadi kebanggaan muslim di Asia Tenggara.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Warehouse & Retail */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center uppercase">Warehouse, Workplace, dan Retail Store Kami</h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="w-full max-w-sm mx-auto">
  <Image 
    src="/companyprofile/maps.png" 
    alt="Foto Warehouse LiiyStore" 
    width={500} 
    height={600} 
    className="rounded shadow-md w-full h-auto object-cover" 
  />
</div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">1. <span className="underline">LiiyStore</span> Warehouse & Workplace</h3>
              <p><strong>Lokasi:</strong> Jalan Kebembem Raya No. 100, RT 02 / RW 21, Kel. Abadijaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16417</p>
              <p><strong>Keterangan:</strong> Bangunan ini merupakan pusat utama operasional <span className="font-semibold">LiiyStore</span>, yang berfungsi sebagai tempat penyimpanan utama stok produk kami serta area kerja bagi seluruh tim kami. Fasilitas ini terdiri dari:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>1 unit kantor dua lantai yang digunakan untuk kegiatan manajemen dan administrasi,</li>
                <li>1 unit gudang dua lantai sebagai pusat penyimpanan stok barang utama,</li>
                <li>1 unit gudang satu lantai untuk penyimpanan barang pendukung dan proses sortir,</li>
                <li>1 unit tower internet pribadi yang mendukung kelancaran konektivitas dan operasional digital.</li>
              </ul>
              <p>
                Dengan fasilitas ini, <span className="font-semibold">LiiyStore</span> berkomitmen menjaga ketersediaan stok, kecepatan layanan, serta mendukung kenyamanan dan produktivitas seluruh tim dalam menghadirkan produk perlengkapan muslim berkualitas untuk pelanggan.
              </p>
              <p>
              

</p>
<div className="mt-4">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.992823724072!2d106.8458047!3d-6.394925499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb576799b631%3A0x8632bf497059763f!2sLiiyStore%20(%20Fashion%20Muslim%20Store%20)!5e0!3m2!1sen!2sid!4v1747067454382!5m2!1sen!2sid"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded shadow"
  ></iframe>
  
</div>
<div className="text-center mt-4">
  <a
    href="https://www.google.com/maps/place/Jl.+Kebembem+Raya+No.+100,+Abadijaya,+Kota+Depok"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
  >
    📍 Lihat Lokasi di Google Maps
  </a>
</div>
              
            </div>
            
          </div>
        </section>

        {/* LiiyStore Kids Retail Store */}
        <section>
          <div className="items-start">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">2. LiiyStore Muslim Wear – Retail Store [Currently Closed]</h3>
              <p><strong>Lokasi:</strong>  Lt. 2 Pasar Agung Proklamasi, Kel. Abadijaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16417</p>
              <p>
              (Kalian bisa pergi ke LiiyStore Warehouse apabila ingin mencari koleksi fashion muslim kami secara langsung. Kami menutup cabang toko ini sampai waktu yang tidak ditentukan dikarenakan sepinya pengunjung, meski begitu kepemilikan toko ini masih milik kami)

              </p>
            </div>
          </div>
        </section>

        <section>
  <div className="space-y-6">
    <h3 className="text-xl font-bold">
      3. LiiyStore Kids – Retail Store
    </h3>

    {/* 2 Gambar berdampingan */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Image 
    src="/companyprofile/kids.png" 
    alt="Foto Depan Toko LiiyStore Kids 1" 
    width={700} 
    height={400} 
    className="rounded shadow-md w-full h-[400px] object-cover" 
  />
  <Image 
    src="/companyprofile/mapskids.png" 
    alt="Foto Depan Toko LiiyStore Kids 2" 
    width={700} 
    height={400} 
    className="rounded shadow-md w-full h-[400px] object-cover" 
  />
</div>


    {/* Teks deskripsi */}
    <div className="space-y-4">
      <p><strong>Lokasi:</strong> Jl. Cimanuk Raya No. 2, Kel. Baktijaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16418</p>
      <p><strong>Keterangan:</strong> <span className="font-semibold">LiiyStore Kids</span> adalah cabang toko retail resmi dari <span className="font-semibold">LiiyStore</span> yang menyediakan perlengkapan bayi dan anak secara lengkap dalam suasana belanja yang nyaman. Fasilitas ini terdiri dari:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>1 unit toko fisik dengan area yang luas, ber-AC, sejuk, dan nyaman untuk keluarga.</li>
        <li>Koleksi produk lengkap dan murah, mulai dari popok, botol susu, pakaian, dress anak, hingga perlengkapan harian lainnya.</li>
        <li>Stok barang selalu terjaga kualitas dan ketersediaannya.</li>
        <li>Pelayanan ramah dan support 24/7, siap membantu kebutuhan perlengkapan si kecil dengan sepenuh hati.</li>
      </ul>
    </div>
  </div>
</section>


<section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">PRODUK & LAYANAN KAMI</h2>
          <p>
            LIIY hadir sebagai brand perlengkapan muslim yang lengkap, terpercaya, dan modern, serta terus berkembang dalam memperluas lini usaha untuk memenuhi kebutuhan masyarakat dan pelaku bisnis. Berikut adalah produk dan layanan utama yang kami tawarkan:
          </p>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">1. Produksi Fashion & Perlengkapan Muslim</h3>
            <p className="italic text-sm">
              (Untuk Video Proses Produksi, Sudah Kami Cantumkan Linknya di Halaman Paling Bawah yang Bisa Ditonton Via Youtube)
            </p>
            <p>
              <span className="font-semibold">LiiyStore</span> tidak hanya menjual, tetapi juga memproduksi langsung berbagai kebutuhan fashion muslim dan perlengkapan ibadah berkualitas. Produk-produk kami dibuat dengan perhatian tinggi pada desain, kenyamanan, dan kualitas material, sehingga mampu memenuhi selera pasar modern sekaligus menjaga nilai-nilai islami.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
    <Image 
      src="/companyprofile/sablon.png"  // Ganti dengan path asli
      alt="Mesin Produksi LiiyStore 1" 
      width={700} 
      height={400} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
    <Image 
      src="/companyprofile/sublim.png"  // Ganti dengan path asli
      alt="Mesin Produksi LiiyStore 2" 
      width={700} 
      height={400} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  <div className="space-y-4">
    <p>
      <span className="font-semibold">LiiyStore</span> memproduksi berbagai perlengkapan muslim seperti mukena, sajadah travel, hijab, hingga gamis anak dan dewasa. Didukung mesin profesional, kami menjaga kualitas dan presisi dalam setiap hasil produksi.
    </p>

    <p className="font-semibold">Mesin Pendukung Produksi Kami:</p>
    <ul className="list-disc ml-5 space-y-2">
      <li>
        <span className="font-semibold">Mesin Sublim Alpha 1804</span><br />
        Digunakan untuk mencetak motif berkualitas tinggi pada bahan polyester seperti sajadah travel, mukena, dan hijab. Mesin ini memastikan hasil cetak yang tajam, tahan lama, dan detail presisi.
      </li>
      <li>
        <span className="font-semibold">Mesin Sablon Texco Imogen Ay</span><br />
        Mesin sablon berkualitas yang digunakan untuk mencetak langsung pada kain, seperti kaos muslim, totebag, dan produk fashion lainnya dengan hasil warna stabil dan rapi.
      </li>
    </ul>
  </div>

  <div className="w-full">
    <Image 
      src="/4A5.png"  // Ganti path sesuai folder public kamu
      alt="Jasa Sablon, Sublim, dan Bordir LiiyStore" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  {/* Deskripsi */}
  <div className="space-y-4">
    <p>
      Selain produksi massal, <span className="font-semibold">LiiyStore</span> juga melayani custom desain sesuai permintaan, baik untuk kebutuhan pribadi maupun keperluan korporasi. Mulai untuk couple, seragaman, hingga motif eksklusif, kami siap membantu Anda mewujudkan desain sesuai keinginan dengan kualitas produksi profesional.
    </p>
  </div>

  <h3 className="text-xl font-bold">
    2. <span className="underline">Agen Resmi Brand Perlengkapan Muslim Ternama</span>
  </h3>

  {/* Gambar Brand */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="text-center">
      <Image 
        src="/companyprofile/wadimor.png"  // Ganti sesuai path
        alt="Wadimor" 
        width={400} 
        height={300} 
        className="rounded shadow-md w-full h-[250px] object-cover"
      />
      <p className="mt-2 text-sm font-medium text-gray-600">( Wadimor )</p>
    </div>
    <div className="text-center">
      <Image 
        src="/companyprofile/gajahduduk.png" 
        alt="Gajah Duduk" 
        width={400} 
        height={300} 
        className="rounded shadow-md w-full h-[250px] object-cover"
      />
      <p className="mt-2 text-sm font-medium text-gray-600">( Gajah Duduk )</p>
    </div>
    <div className="text-center">
      <Image 
        src="/companyprofile/dobby.png" 
        alt="Dobby" 
        width={400} 
        height={300} 
        className="rounded shadow-md w-full h-[250px] object-cover"
      />
      <p className="mt-2 text-sm font-medium text-gray-600">( Dobby )</p>
    </div>
  </div>

  {/* Deskripsi */}
  <div className="space-y-4">
    <p>
      <span className="font-semibold">LiiyStore</span> merupakan agen resmi untuk brand-brand sarung dan perlengkapan muslim ternama di Indonesia, seperti Wadimor, Gajah Duduk, dan Dobby. Ketiga merek ini telah lama dipercaya masyarakat sebagai simbol kualitas dan kenyamanan dalam memenuhi kebutuhan ibadah.
    </p>
    <p>
      Sebagai agen resmi, kami selalu menyediakan stok dalam jumlah besar dan lengkap, sehingga baik pelanggan ataupun reseller kami bisa mendapatkan produk original dengan harga yang kompetitif, baik untuk kebutuhan pribadi maupun grosir/partai besar.
    </p>
  </div>

  <h3 className="text-xl font-bold">
    3. Penyimpanan Stok & Manajemen Inventory
  </h3>

  <p className="italic text-sm">
    (Untuk Video Salah Satu Gudang Penyimpanan Kami, Sudah Kami Cantumkan Linknya di Halaman Paling Bawah yang Bisa Ditonton Via Youtube)
  </p>

  <p>
    <span className="font-semibold">LiiyStore</span> memiliki sistem penyimpanan barang dan manajemen inventori yang terstruktur dan profesional, didukung oleh area gudang yang luas dan aman. Hal ini memastikan ketersediaan stok selalu terjaga dan pengiriman kepada pelanggan maupun reseller berjalan cepat dan efisien.
  </p>

  {/* Banner Konsinyasi */}
  <div className="w-full">
    <Image 
      src="/companyprofile/titipjual.png" 
      alt="Program Konsinyasi LiiyStore" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  <p>
    Selain mendukung kebutuhan distribusi internal, kami juga membuka kesempatan bagi supplier yang ingin menitipkan produk mereka melalui sistem Consignment (Titip Jual), baik untuk dipasarkan di Online Store <span className="font-semibold">LiiyStore</span> maupun di Offline Store kami, sehingga dapat memperluas jangkauan dan potensi penjualan produk mereka dengan sistem yang transparan dan terpercaya.
  </p>

  <h3 className="text-xl font-bold">
    4. Jasa Pembuatan Customized Hampers Sesuai Keinginan
  </h3>

  {/* Banner Hampers */}
  <div className="w-full">
    <Image 
      src="/companyprofile/hampers.png" 
      alt="Jasa Pembuatan Hampers Custom" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  {/* Deskripsi */}
  <div className="space-y-4">
    <p>
      <span className="font-semibold">LiiyStore</span> juga menyediakan layanan pembuatan hampers custom yang bisa disesuaikan dengan keinginan Anda. Cocok untuk hadiah personal, kado spesial, acara kantor, momen keagamaan, hingga bingkisan perusahaan. Kami menghadirkan beragam pilihan produk seperti mukena, sajadah travel, hijab, aksesoris muslim, dan produk perlengkapan ibadah lainnya yang bisa dikombinasikan secara eksklusif dalam satu paket hampers.
    </p>
    <p>
      Dengan desain elegan dan sentuhan personal, setiap hampers kami kemas dengan rapi dan penuh makna, menjadikannya pilihan tepat untuk berbagi kebaikan dengan cara yang istimewa.
    </p>
  </div>

  <h3 className="text-xl font-bold">
    5. Distribusi & Pengiriman Barang ke Seluruh Asia Tenggara
  </h3>

  {/* Banner Pengiriman */}
  <div className="w-full">
    <Image 
      src="/assets/BannerPengiriman.png" 
      alt="Pengiriman Express Nasional & Internasional" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  {/* Deskripsi */}
  <p>
    Kami melayani pengiriman baik ke seluruh Indonesia dan Asia Tenggara dengan estimasi 1–7 hari, dengan sistem fleksibel menggunakan berbagai jasa logistik seperti J&T, JNE, SPX Express, dll untuk pengiriman nasional dan RaySpeed Asia untuk pengiriman internasional yang keduanya sudah dijamin dan dipastikan sampai maksimal 7 hari setelah barang dikirim oleh kami.
  </p>
  <p>
    Opsi asuransi pengiriman juga tersedia untuk memberikan proteksi lebih terhadap produk yang dikirim dengan biaya hanya 2% dari harga total barang <span className="italic">(Sangat Direkomendasikan untuk Diaktifkan)</span>.
  </p>

  <h3 className="text-xl font-bold">
    6. Program Reseller & <span className="underline">Dropshipper</span>
  </h3>

  {/* Banner Reseller */}
  <div className="w-full">
    <Image 
      src="/companyprofile/reseller.png" 
      alt="Program Reseller & Dropshipper LiiyStore" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  {/* Deskripsi */}
  <p>
    <span className="font-semibold">LiiyStore</span> membuka peluang kemitraan melalui program reseller dan dropshipper, dengan sistem mudah, harga kompetitif, tanpa perlu stok barang, serta disiapkan katalog produk bersama dukungan materi promosi yang lengkap.
  </p>

  <h3 className="text-xl font-bold">7. Program Afiliasi</h3>

  {/* Banner Program Afiliasi */}
  <div className="w-full">
    <Image 
      src="/companyprofile/afiliasi.png" 
      alt="Program Afiliasi LiiyStore" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  {/* Deskripsi */}
  <p>
    Melalui program afiliasi, <span className="font-semibold">LiiyStore</span> memberikan kesempatan kepada content creator, pemilik blog, hingga pengguna media sosial untuk mendapatkan penghasilan tambahan dari setiap penjualan yang dihasilkan melalui link referensi mereka.
  </p>
  <h3 className="text-xl font-bold">8. Penyediaan Drop Point & Penyewaan Armada</h3>

  {/* Banner Drop Point & Armada */}
  <div className="w-full">
    <Image 
      src="/companyprofile/droppoint.png" 
      alt="Drop Point & Armada LiiyStore" 
      width={1200} 
      height={600} 
      className="rounded shadow-md w-full h-auto object-cover" 
    />
  </div>

  {/* Deskripsi */}
  <div className="space-y-4">
    <p>
      <span className="font-semibold">LiiyStore</span> tidak hanya melayani distribusi produk, tetapi juga menyediakan fasilitas Drop Point sebagai titik pengumpulan dan pengiriman paket yang strategis, memudahkan proses logistik bagi berbagai layanan ekspedisi dan pelanggan di wilayah sekitar. Kami sudah berpengalaman dalam menyediakan layanan Drop Point untuk ekspedisi besar seperti JNE, J&T, LEX (Lazada Express), ID Express, <span className="font-semibold">Anteraja</span>, hingga SPX (Shopee Express).
    </p>
    <p>
      Selain itu, kami juga menyediakan layanan Penyewaan Armada yang terdiri dari kendaraan operasional seperti Mobil Engkel Bak Kapasitas 1 Ton dan Mobil Van Gran Max yang siap mendukung kebutuhan pengiriman barang skala kecil hingga menengah baik untuk distribusi lokal maupun antar kota.
    </p>
  </div>
        </section>

        <section className="space-y-6">
  <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
    KEUNGGULAN & NILAI UTAMA KAMI
  </h2>

  <ol className="space-y-4 text-gray-800">
    <li>
      <p className="font-semibold">1. Produk Berkualitas Tinggi</p>
      <p>
        Kami berkomitmen menghadirkan perlengkapan muslim yang diproduksi dengan standar mutu terbaik, mulai dari pemilihan bahan hingga proses produksi.
      </p>
    </li>
    <li>
      <p className="font-semibold">2. Harga Kompetitif</p>
      <p>
        <span className="font-semibold">LiiyStore</span> menawarkan harga yang bersaing tanpa mengurangi kualitas, sehingga pelanggan mendapatkan nilai terbaik di setiap pembelian.
      </p>
    </li>
    <li>
      <p className="font-semibold">3. Layanan Pelanggan Responsif</p>
      <p>
        Kami mengutamakan kepuasan pelanggan dengan pelayanan yang ramah, cepat, dan solutif baik untuk retail maupun mitra bisnis.
      </p>
    </li>
    <li>
      <p className="font-semibold">4. Inovasi & Fleksibilitas Produksi</p>
      <p>
        Didukung oleh mesin modern, kami melayani produksi custom sesuai kebutuhan, baik untuk pemakaian pribadi, acara, maupun kebutuhan korporasi.
      </p>
    </li>
    <li>
      <p className="font-semibold">5. Dukungan Distribusi & Logistik</p>
      <p>
        <span className="font-semibold">LiiyStore</span> memiliki sistem pengelolaan stok yang baik, jaringan distribusi yang luas, serta layanan pengiriman terpercaya untuk memastikan produk sampai tepat waktu.
      </p>
    </li>
  </ol>
</section>

<section className="space-y-6">
  <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
    PORTOFOLIO & PENGALAMAN KERJA SAMA
  </h2>

  <p>
    Sebagai usaha yang terus berkembang, <span className="font-semibold">LiiyStore</span> telah dipercaya oleh berbagai pihak untuk mendistribusikan dan menyediakan produk perlengkapan muslim berkualitas. Beberapa pengalaman kerja sama dan kolaborasi yang telah kami jalani meliputi:
  </p>

  <ol className="list-decimal list-outside pl-6 space-y-4 text-gray-800">
    <li>
      <p className="font-semibold">Menjadi Agen Resmi Brand Ternama</p>
      <p>Sebagai agen resmi sarung dari merek-merek ternama di Indonesia seperti Wadimor, Gajah Duduk, dan Dobby.</p>
    </li>
    <li>
      <p className="font-semibold">Penyediaan Dropship & Reseller</p>
      <p>
        Telah menjadi mitra bagi 3.000+ reseller dan dropshipper di seluruh Indonesia, yang mempercayakan <span className="font-semibold">LiiyStore</span> sebagai pemasok utama produk fashion dan perlengkapan muslim.
      </p>
    </li>
    <li>
      <p className="font-semibold">Penyediaan Stok untuk Marketplace & Toko Retail</p>
      <p>
        Kami telah melayani berbagai pembelian dalam skala besar, baik untuk toko offline maupun online, dengan sistem pengelolaan stok yang rapi dan terstruktur.
      </p>
    </li>
    <li>
      <p className="font-semibold">Pengalaman Menjadi Drop Point & Penyewaan Armada</p>
      <p>
        <span className="font-semibold">LiiyStore</span> memiliki riwayat sebagai Drop Point resmi untuk beberapa ekspedisi seperti JNE, J&T, LEX (Lazada Express), ID Express, AnterAja, hingga SPX (Shopee Express) hingga penyewaan armada untuk distribusi barang.
      </p>
    </li>
  </ol>

  <p>
    Dengan pengalaman dan kemitraan yang telah kami bangun, <span className="font-semibold">LiiyStore</span> berkomitmen untuk terus memperluas jaringan bisnis dan menjadi partner terpercaya di industri perlengkapan muslim di Indonesia.
  </p>
</section>

<section id="testimoni" className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      TESTIMONI KLIEN KAMI
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        "/testimoni/1.png",
        "/testimoni/2.png",
        "/testimoni/3.png",
        "/testimoni/4.png",
        "/testimoni/5.png",
        "/testimoni/6.png",
      ].map((src, i) => (
        <div key={i} className="w-full overflow-hidden rounded-lg shadow">
          <img
            src={src}
            alt={`Testimoni ${i + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  </div>
</section>

<section id="ceritasukses" className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
      CERITA SUKSES MITRA KAMI DARI BERBAGAI KALANGAN
    </h2>
    <p className="text-gray-700 mb-8 text-lg">
      Dari Program Reseller & Dropshipper <span className="font-semibold">LiiyStore</span>:
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
      ].map((src, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-md">
          <img
            src={`/ceritasukses/${src}`}
            alt={`Cerita Mitra ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
    <p className="text-gray-700 mb-8 text-lg pt-16">
    Dari Program Afiliasi <span className="font-semibold">LiiyStore</span>:
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        "7.png",
        "8.png",
        "9.png",
        "10.png",
        "11.png",
        "12.png",
      ].map((src, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-md">
          <img
            src={`/ceritasukses/${src}`}
            alt={`Cerita Mitra ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 space-y-6">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
      KOMITMEN KUALITAS & KEPUASAN PELANGGAN
    </h2>

    <p>
      Di LiiyStore, kepuasan pelanggan adalah prioritas utama kami.
      Setiap produk dan layanan kami hadir melalui proses yang terjaga dengan baik demi memastikan pengalaman belanja
      yang aman, nyaman, dan memuaskan. Komitmen ini kami wujudkan melalui:
    </p>

    <ul className="list-disc ml-5 space-y-3 text-gray-800">
      <li>
        <span className="font-semibold">Kualitas Produk Terjamin</span><br />
        Kami hanya menyediakan produk yang telah melalui proses seleksi ketat, mulai dari bahan, model, hingga hasil akhir produksi,
        demi menjamin kualitas terbaik untuk setiap pelanggan.
      </li>
      <li>
        <span className="font-semibold">Pelayanan Ramah & Profesional</span><br />
        Tim customer service kami selalu siap membantu dengan sikap ramah dan tanggap dalam menjawab pertanyaan
        serta menangani setiap kebutuhan pelanggan, baik sebelum maupun sesudah transaksi.
      </li>
      <li>
        <span className="font-semibold">Jaminan Garansi Produk</span><br />
        Produk yang terbukti mengalami cacat produksi dapat dikembalikan dan ditukar sesuai kebijakan retur kami,
        sebagai bentuk komitmen menjaga kepercayaan pelanggan.
      </li>
      <li>
        <span className="font-semibold">Pengiriman Aman & Tepat Waktu</span><br />
        LiiyStore bekerja sama dengan jasa pengiriman terpercaya
        untuk memastikan barang sampai dengan aman, tepat waktu, dan dalam kondisi sempurna ke tangan pelanggan.
      </li>
    </ul>

    <p>
      Kami percaya bahwa bisnis yang sukses dibangun atas dasar kepercayaan.
      Oleh karena itu, LiiyStore berkomitmen untuk selalu menjaga kualitas produk dan layanan,
      demi menciptakan hubungan jangka panjang yang saling menguntungkan dengan setiap pelanggan.
    </p>
  </div>
</section>

<section id="identitas" className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 space-y-6 text-gray-800">
    <h2 className="text-2xl md:text-3xl font-bold text-center">LEGALITAS & IDENTITAS PERUSAHAAN</h2>

    <p>
      Meskipun LiiyStore saat ini masih beroperasi sebagai usaha mandiri
      yang belum berbadan hukum resmi seperti UD, CV, atau PT, kami tetap menjunjung tinggi kepercayaan,
      profesionalisme, dan transparansi dalam setiap transaksi.
    </p>

    <div className="space-y-2">
      <p><strong>Identitas Usaha:</strong></p>
      <p><strong>Nama Usaha:</strong> LIIY</p>
      <p><strong>Slogan Usaha:</strong> <em>Leading in Innovation Yonder</em> (Memimpin dalam Inovasi Tanpa Akhir)</p>
      <p><strong>Lini Usaha:</strong></p>
      <ul className="list-decimal ml-6 space-y-1">
        <li>Produksi, Distribusi, dan Ekspor Fashion dan Perlengkapan Muslim</li>
        <li>Distribusi dan Penjualan Perlengkapan Bayi dan Anak</li>
        <li>Jasa Sablon/Bordir/Sublim pada Kaos, Peci, Baju Koko, Sarung, Sajadah Travel, dan Seluruh Perlengkapan Muslim Lainnya</li>
        <li>Jasa Pembuatan Customized Hampers Sesuai Keinginan Pembeli</li>
        <li>Penyediaan Drop Point dan Penyewaan Armada</li>
      </ul>
      <p><strong>Bentuk Usaha:</strong> Usaha Perorangan (Individual)</p>
      <p><strong>Tahun Berdiri:</strong> 2019 (berdiri menjelang masa pandemi COVID-19 sebagai langkah adaptasi dan peluang baru).</p>
      <p><strong>Alamat Operasional:</strong> Jalan Kebembem Raya No. 100, RT 02 / RW 21, Kel. Abadijaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16417</p>

      <p><strong>Nomor Telepon Resmi:</strong> <a href="tel:+6285220239100" className="text-blue-600 underline">+62 852-2023-9100</a></p>
      <p><strong>Nomor WhatsApp Resmi:</strong> <a href="https://wa.me/6287775465062" className="text-blue-600 underline">+62 877-7546-5062</a></p>
      <p><strong>Alamat Email Resmi:</strong> <a href="mailto:muhammadsurazharfansyah@liiystore.id" className="text-blue-600 underline">muhammadsurazharfansyah@liiystore.id</a></p>
      <p><strong>Alamat Website Resmi:</strong> <a href="https://liiystore.id" target="_blank" className="text-blue-600 underline">liiystore.id</a></p>

      <p><strong>Media Sosial:</strong></p>
      <ul className="ml-4 space-y-1">
        <li><strong>Facebook:</strong> <a href="https://facebook.com/LiiyStoreMuslimWear" className="text-blue-600 underline">LiiyStore Muslim Wear</a></li>
        <li><strong>Youtube:</strong> <a href="https://youtube.com/@LiiyStoreMuslimWear" className="text-blue-600 underline">@LiiyStoreMuslimWear</a></li>
        <li><strong>Instagram:</strong> <a href="https://instagram.com/liiystore" className="text-blue-600 underline">@liiystore</a></li>
        <li><strong>Tiktok:</strong> <a href="https://tiktok.com/@liiystore" className="text-blue-600 underline">@liiystore</a></li>
      </ul>
    </div>

    <p>
      Kami percaya bahwa legalitas bukan hanya sekedar dokumen, tapi tentang komitmen terhadap kualitas produk dan pelayanan yang jujur, aman, dan bertanggung jawab. Seiring pertumbuhan dan kepercayaan pelanggan, LiiyStore berkomitmen untuk secara bertahap melengkapi legalitas formal sebagai wujud keseriusan dan profesionalisme kami dalam melayani kebutuhan Anda.
    </p>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[auto,1fr] gap-6 items-start text-gray-800">

    {/* Kolom Kiri - Foto Profil */}
    <div className="flex justify-center md:justify-start">
      <Image
        src="/pendiri.png"
        alt="Foto Muhammad Suraz Harfansyah"
        width={150}
        height={150}
        className="rounded-full object-cover"
      />
    </div>

    {/* Kolom Kanan - Info dan Deskripsi */}
    <div className="space-y-4">
      <div className="flex justify-between flex-col md:flex-row md:items-center md:gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">PROFIL PENDIRI USAHA</h2>
          <p className="text-lg font-semibold">Muhammad Suraz Harfansyah</p>
          <p>Founder & Owner of <span className="font-semibold ">LIIY</span> / <span className="font-semibold ">LiiyStore</span></p>
          <p>
            Personal Email for Business Collaboration:{' '}
            <a
              href="mailto:muhammadsurazharfansyah@gmail.com"
              className="text-blue-600 underline"
            >
              muhammadsurazharfansyah@gmail.com
            </a>
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0 text-xl text-blue-600">
  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-600 transition"
  >
    <FaLinkedin />
  </a>
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-600 transition"
  >
    <FaInstagram />
  </a>
</div>
      </div>

      {/* Paragraf Deskripsi */}
      <p className="text-sm leading-relaxed">
        Berawal dari ketertarikannya terhadap dunia fashion muslim dan kebutuhan perlengkapan harian,
        Muhammad Suraz Harfansyah mendirikan <span className="italic font-semibold">LIIY – Leading in Innovation Yonder</span>{' '}
        sebagai bentuk jawaban atas permintaan pasar yang inginkan produk berkualitas namun harga masih tetap terjangkau.
        Berbekal komitmennya yang kuat, ia pun membangun <span className="font-semibold ">LiiyStore</span> dari nol hingga kini berhasil memiliki lini produksi sendiri,
        warehouse, jaringan distribusi yang tersebar luas. Mengutamakan pelayanan yang ramah, ketepatan dan kecepatan serta ketelitian dalam produksi,
        juga kepuasan terhadap seluruh pelanggan sebagai prioritas paling utama dalam mengembangkan bisnis.
      </p>
    </div>
  </div>
</section>


<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 text-gray-800 space-y-6 text-center">
    <h2 className="text-2xl md:text-3xl font-bold">TEMUKAN KAMI DI MARKETPLACE FAVORIT ANDA!</h2>

    <p>
      Untuk kemudahan belanja Anda, <span className="font-semibold ">LiiyStore</span> hadir di berbagai platform e-commerce populer.
      Dapatkan produk asli dan layanan terbaik kami melalui toko resmi di Tokopedia, Shopee, Lazada, TikTok Shop, Blibli, dan website LiiyStore.id
    </p>
    
    <p className="italic text-sm text-gray-600">
      (Website Kami Merupakan Rekomendasi Terbaik untuk Promo dan Stok Terbaru)
    </p>

    {/* Gambar Banner Marketplace */}
    <div className="w-full">
      <Image 
        src="/companyprofile/onlinestore.png" 
        alt="Marketplace LiiyStore" 
        width={800} 
        height={500} 
        className="rounded shadow-md mx-auto w-full h-auto object-contain"
      />
    </div>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-6xl mx-auto px-4 space-y-8 text-gray-800">
    <h2 className="text-2xl md:text-3xl font-bold text-center">
      TOTAL <span className="">PESANAN</span> & PENJUALAN KAMI DI SETIAP MARKETPLACE
    </h2>
    <p className="text-center italic text-sm">
      (Ringkasan Data Penjualan Ini Hanya Mencakup Akun <span className="font-semibold ">LiiyStore Muslim</span> Wear)
    </p>
    <p>
      <span className="font-semibold ">LiiyStore</span> telah dipercaya oleh ribuan pelanggan di berbagai platform marketplace terkemuka. Komitmen kami dalam menyediakan produk fashion muslim berkualitas tinggi serta pelayanan prima membuat kami tumbuh secara konsisten setiap bulan.
    </p>

    <h3 className="text-xl md:text-2xl font-bold">BERIKUT DATA RINGKASAN PENJUALAN DAN PERFORMA KAMI:</h3>
    <p><strong>MARKETPLACE PLATFORM:</strong> SHOPEE & SHOPEE LIVE</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    "/shopee/1.png",
    "/shopee/2.png",
    "/shopee/3.png",
    "/shopee/4.png"
  ].map((src, index) => (
    <div key={index} className="w-full h-[500px] overflow-hidden rounded shadow">
      <Image
        src={src}
        alt={`Data Penjualan ${index + 1}`}
        width={300}
        height={300}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>


    <div className="text-sm mt-6 space-y-1">
      <p>1. (Shopee: 1 Bulan Sebelum Ramadhan 2025)</p>
      <p>2. (Shopee Live: Akhir 2024, karena setelahnya pesanan melonjak dan tidak sempat live lagi sebab harus mengurus orderan yang meningkatnya pesat.)</p>
    </div>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 space-y-8 text-gray-800">
    <h3 className="text-xl md:text-2xl font-bold">
      MARKETPLACE PLATFORM: <span className="text-indigo-600">LAZADA</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
  <div className="w-full max-w-sm h-[500px] overflow-hidden rounded shadow">
    <Image
      src="/lazada/1.png"
      alt="Lazada Performance 1"
      width={400}
      height={200}
      className="w-full h-full object-cover"
    />
  </div>
  <div className="w-full max-w-sm h-[500px] overflow-hidden rounded shadow">
    <Image
      src="/lazada/2.png"
      alt="Lazada Performance 2"
      width={400}
      height={200}
      className="w-full h-full object-cover"
    />
  </div>
</div>


    <p className="text-sm text-center mt-4 italic text-gray-600">
      (Saat Bulan Ramadhan 2025)
    </p>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 space-y-8 text-gray-800">
    <h3 className="text-xl md:text-2xl font-bold">
      MARKETPLACE PLATFORM: <span className="text-purple-600">TIKTOK SHOP & TIKTOK LIVE</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
  {["/tiktok/1.png", "/tiktok/2.png", "/tiktok/3.png"].map((src, index) => (
    <div key={index} className="w-full max-w-xs h-[500px] overflow-hidden rounded shadow">
      <Image
        src={src}
        alt={`TikTok Shop ${index + 1}`}
        width={300}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>


    <ul className="text-sm mt-4 text-gray-600 list-disc ml-5 space-y-1">
      <li>(TikTok Shop: Saat Bulan Ramadhan 2025)</li>
      <li>(TikTok Live: Pertengahan 2024, karena setelahnya pesanan melonjak dan tidak sempat live lagi sebab harus urus orderan yang meningkat pesat)</li>
    </ul>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 space-y-8 text-gray-800">
    <h3 className="text-xl md:text-2xl font-bold">
      MARKETPLACE PLATFORM: <span className="text-green-600">TOKOPEDIA</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
  {["/tokopedia/1.png", "/tokopedia/2.png"].map((src, index) => (
    <div key={index} className="w-full max-w-sm h-[500px] overflow-hidden rounded shadow">
      <Image
        src={src}
        alt={`Tokopedia Statistik ${index + 1}`}
        width={400}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>


    <p className="text-sm text-gray-600 mt-4 italic">
      (Saat Bulan Ramadhan 2025)
    </p>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 space-y-8 text-gray-800">
    <h3 className="text-xl md:text-2xl font-bold">
      MARKETPLACE PLATFORM: <span className="text-blue-600">BLIBLI</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
  {["/blibli/1.png", "/blibli/2.png"].map((src, index) => (
    <div key={index} className="w-full max-w-sm h-[500px] overflow-hidden rounded shadow">
      <Image
        src={src}
        alt={`Statistik Blibli ${index + 1}`}
        width={400}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>


    <p className="text-sm text-gray-600 mt-4 italic">
      (1 Bulan Setelah Ramadhan)
    </p>
  </div>
</section>

<section className="py-8 bg-white">
  <div className="max-w-7xl mx-auto px-4 text-gray-800 space-y-4">
    <h3 className="text-xl md:text-2xl font-bold">
      MARKETPLACE PLATFORM: <span className="">BUKALAPAK [CLOSED]</span>
    </h3>
    <p>
      <span className="font-semibold">Keterangan:</span> Saat ini kami tidak dapat menyajikan data terbaru penjualan dari Bukalapak karena platform tersebut telah menghentikan layanan jual beli produk fisik di marketplace-nya. Bukalapak kini hanya berfokus pada penjualan produk digital, sehingga <span className="font-semibold ">LiiyStore</span> telah menghentikan operasional toko di platform tersebut.
    </p>
  </div>
</section>

<section className="py-8 bg-white text-gray-800">
  <div className="max-w-7xl mx-auto space-y-6 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center">KOLABORASI & KERJA SAMA</h2>

    <p>
      <span className="font-semibold ">LiiyStore</span> selalu terbuka untuk berbagai bentuk <span className="underline">kerja sama</span> yang saling menguntungkan, baik dengan individu, komunitas, maupun perusahaan.
    </p>

    <p>
      Jika Anda memiliki ide, peluang, atau bentuk kolaborasi yang ingin dijalankan bersama kami, silakan hubungi kami melalui:
    </p>

    <ul className="list-disc ml-6 space-y-1">
      <li><strong>Email:</strong> <a href="mailto:muhammadsurazharfansyah@liiystore.id" className="text-blue-600 underline">muhammadsurazharfansyah@liiystore.id</a></li>
      <li><strong>WhatsApp:</strong> <a href="https://wa.me/6287775465062" className="text-blue-600 underline">+62 877-7546-5062</a></li>
      <li><strong>Telepon:</strong> <a href="tel:+6285220239100" className="text-blue-600 underline">+62 852-2023-9100</a></li>
    </ul>

    <p>
      Kami dengan senang hati akan mendengarkan dan menjajaki kemungkinan <span className="underline">kerja sama</span> terbaik bersama Anda.
    </p>

    <div>
      <h4 className="font-bold mt-6">Link Video Proses Produksi & Video Salah Satu Gudang Penyimpanan <span className="font-normal">[ VIA YOUTUBE ]</span></h4>
      <ol className="list-decimal ml-6 mt-2 space-y-1 text-blue-600 underline mb-20">
        <li><a href="https://youtu.be/_KbBL4HDVpE?si=j-8X8Y0PIAu1sqRy" target="_blank" rel="noopener noreferrer">Link Video Produksi</a></li>
        <li><a href="https://youtu.be/At8XZk-bkEE?si=kDblEL3uh8nJcbWB" target="_blank" rel="noopener noreferrer">Link Video Gudang</a></li>
      </ol>
    </div>
  </div>
</section>

      </div>
      <Footer/>
    </main>
  );
}
