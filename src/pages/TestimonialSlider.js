"use client"; // <-- Ini sangat penting! Menandakan ini adalah Client Component.

import React from 'react';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Ikon
import { FaQuoteLeft } from 'react-icons/fa';

// Data testimoni (Anda bisa ganti dengan data asli)
const testimonials = [
  {
    name: "Ahmad Maulana",
    title: "Member Tahunan",
    image: "/avatars/avatar1.jpg",
    quote: "Materinya luar biasa lengkap! Dari yang tadinya bingung mau mulai dari mana, sekarang omzet toko saya naik 300% dalam 2 bulan. Mentoring 1-on-1 nya benar-benar mengubah cara saya berbisnis."
  },
  {
    name: "Siti Nurhaliza",
    title: "Member Bulanan",
    image: "/avatars/avatar2.jpg",
    quote: "E-book dan webinarnya sangat praktis dan mudah diikuti. Saya suka karena bisa belajar kapan saja. Grup komunitasnya juga sangat aktif, jadi bisa saling sharing dengan member lain."
  },
  {
    name: "Budi Santoso",
    title: "Peserta Workshop",
    image: "/avatars/avatar3.jpg",
    quote: "Awalnya saya ragu, tapi setelah ikut workshop offline, saya langsung praktek dan hasilnya kelihatan. Trainer-nya asik dan mau menjawab semua pertanyaan sampai tuntas. Recommended!"
  },
  {
    name: "Dewi Lestari",
    title: "Member Tahunan",
    image: "/avatars/avatar4.jpg",
    quote: "Fitur 'Tools & Konten Siap Pakai' adalah penyelamat. Saya tidak perlu pusing lagi mikirin desain atau caption. Tinggal upload, jualan jalan terus. Investasi terbaik untuk bisnis saya."
  },
    {
    name: "Rian Hidayat",
    title: "Pengguna Jasa Iklan",
    image: "/avatars/avatar5.jpg",
    quote: "Tim iklannya profesional banget. ROAS (Return on Ad Spend) saya selalu di atas target. Laporan mingguannya juga detail, jadi saya tahu uang saya dipakai untuk apa saja. Mantap!"
  }
];

export default function TestimonialSlider() {
  return (
    <div className="py-16">
      <Swiper
        // Konfigurasi Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          // Tampilan untuk layar lebih besar
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg min-h-[320px] flex flex-col justify-between">
              <div>
                <FaQuoteLeft className="text-yellow-400 text-3xl mb-4" />
                <p className="text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover mr-4 border-2 border-yellow-400"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-yellow-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}