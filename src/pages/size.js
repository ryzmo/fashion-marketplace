// components/SizeRecommendationPopup.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function SizeRecommendationPopup({ isVisible, onClose }) {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [size, setSize] = useState('');
  
    // Fungsi perhitungan ukuran
    const calculateSize = () => {
      const h = parseInt(height);
      const w = parseInt(weight);
  
      if (h >= 160 && h <= 170 && w >= 50 && w <= 60) {
        setSize('S');
      } else if (h >= 171 && h <= 180 && w >= 61 && w <= 75) {
        setSize('M');
      } else if (h > 180 || w > 75) {
        setSize('L');
      } else {
        setSize('Tidak Ditemukan');
      }
    };
  
    return (
      <>
        {isVisible && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
              className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm"
              onClick={onClose}
            ></div>
  
            <div className="relative bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-lg transform transition-all duration-300 ease-in-out scale-105 z-50">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
              >
                <FaTimes className="text-2xl" />
              </button>
  
              <h2 className="text-3xl font-extrabold mb-6 text-green-800 text-center">
                Rekomendasi Ukuran
              </h2>
              <p className="text-lg mb-6 text-gray-600 text-center">
                Masukkan data tubuhmu untuk mendapatkan rekomendasi ukuran yang tepat.
              </p>
  
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-lg font-bold mb-2">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    placeholder="Contoh: 170"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 text-lg font-bold mb-2">Berat Badan (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    placeholder="Contoh: 60"
                  />
                </div>
  
                <button
                  onClick={calculateSize}
                  className="w-full bg-yellow-400 text-gray-800 px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
                >
                  Dapatkan Rekomendasi Ukuran
                </button>
  
                {size && (
                  <div className="mt-6 text-xl font-bold text-green-700 text-center">
                    Rekomendasi Ukuran: <span className="text-3xl">{size}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }