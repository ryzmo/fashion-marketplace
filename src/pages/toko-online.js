import { useRouter } from "next/router";
import React from "react";
import {
  FaShoppingCart,
  FaShoppingBag,
  FaStore,
  FaTiktok,
} from "react-icons/fa";

const TokoOnlinePage = () => {
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

        <h1 className="text-3xl font-bold mb-6 text-center">Toko Online Kami</h1>

        <div className="space-y-5 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-orange-500 text-lg" />
            <a
              href="https://shopee.co.id/liiystore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Shopee: shopee.co.id/liiystore
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaTiktok className="text-black text-lg" />
            <span className="text-gray-600">TikTok Shop: … (lagi perbaikan)</span>
          </div>

          <div className="flex items-center gap-3">
            <FaStore className="text-purple-700 text-lg" />
            <a
              href="https://lazada.co.id/liiystore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lazada: lazada.co.id/liiystore
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-green-600 text-lg" />
            <a
              href="https://tokopedia.com/liiystore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Tokopedia: tokopedia.com/liiystore
            </a>
          </div>

          <div className="flex items-center gap-3">
            <FaStore className="text-blue-500 text-lg" />
            <a
              href="https://blibli.com/merchant/liiystore-muslim-wear/LIF-70081"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Blibli: blibli.com/merchant/liiystore-muslim-wear/LIF-70081
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TokoOnlinePage;
