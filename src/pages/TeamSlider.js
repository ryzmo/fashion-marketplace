"use client"; // Komponen ini interaktif, jadi harus Client Component

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import style Swiper yang sudah ada di proyek Anda
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Data Anggota Tim (Ganti dengan data asli tim Anda)
const teamMembers = [
  {
    name: "M. Suraz Harfansyah",
    role: "Founder & CEO",
    image: "/team/suraz.jpg",
    accolade: "Top 50 Tiktok Indonesia",
  },
  {
    name: "Jane Doe",
    role: "Head of SEO & Content",
    image: "/team/jane.jpg",
    accolade: "Google Certified Partner",
  },
  {
    name: "John Smith",
    role: "Lead Ads Strategist",
    image: "/team/john.jpg",
    accolade: "Meta Blueprint Certified",
  },
  {
    name: "Emily White",
    role: "Creative Director",
    image: "/team/emily.jpg",
    accolade: "Award-Winning Designer",
  },
  {
    name: "Michael Brown",
    role: "Marketplace Specialist",
    image: "/team/michael.jpg",
    accolade: "Shopee Certified Trainer",
  },
    {
    name: "Sarah Green",
    role: "Client Relations Manager",
    image: "/team/sarah.jpg",
    accolade: "Customer Service Excellence",
  }
];

export default function TeamSlider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 rounded-lg overflow-hidden text-center group">
              <div className="relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 left-0 w-full bg-gradient-to-t from-transparent to-black/50 p-3">
                  <p className="text-white text-sm font-semibold tracking-wider uppercase">{member.accolade}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">{member.name}</h3>
                <p className="text-sm text-yellow-400">{member.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}