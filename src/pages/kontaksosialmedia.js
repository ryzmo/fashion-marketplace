import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";
import React from "react";

const KontakPage = () => {
  const router = useRouter();

  return (
    <main className="bg-white text-black min-h-screen">
      {/* Header */}
      <div className="w-full shadow-sm max-w-4xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-gray-800">LiiyStore</span>
        </a>
      </div>

      {/* Konten */}
      <div className="bg-white text-gray-800 py-10 px-4 max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Kembali
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">Kontak</h1>

        {/* Kontak Info */}
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-semibold">WhatsApp:</p>
            <p>+6287775465062</p>
            <a
              href="https://wa.me/+6287775465062"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              wa.me/+6287775465062
            </a>
          </div>

          <div>
            <p className="font-semibold">Email:</p>
            <p>
              <a
                href="mailto:muhammadsurazharfansyah@liiystore.id"
                className="text-blue-600 underline"
              >
                muhammadsurazharfansyah@liiystore.id
              </a>
            </p>
          </div>
        </div>

        {/* Sosial Media */}
        <h2 className="text-xl font-bold mb-4">Sosial Media</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaFacebookF className="text-blue-600 text-xl" />
            <a
              href="https://www.facebook.com/share/1FQ9oHKHzq/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LiiyStore Muslim Wear
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaInstagram className="text-pink-500 text-xl" />
            <a
              href="https://instagram.com/liiystore"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @liiystore
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaTiktok className="text-black text-xl" />
            <a
              href="https://tiktok.com/@liiystore"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @liiystore
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaYoutube className="text-red-600 text-xl" />
            <a
              href="https://youtube.com/@LiiyStoreMuslimWear"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @LiiyStoreMuslimWear
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KontakPage;
