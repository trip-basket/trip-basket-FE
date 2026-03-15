"use client";

import Image from "next/image";
import { GoogleIcon } from "./google-icon";

export const FLOATING_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
    alt: "London",
    className: "top-[6%] left-[8%] w-48 h-36 -rotate-6",
  },
  {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
    alt: "Paris",
    className: "top-[4%] right-[12%] w-44 h-32 rotate-4",
  },
  {
    src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80",
    alt: "Venice",
    className: "top-[18%] left-[22%] w-36 h-28 rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80",
    alt: "Osaka",
    className: "top-[38%] left-[5%] w-44 h-34 rotate-6",
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80",
    alt: "Santorini",
    className: "top-[42%] right-[6%] w-48 h-36 -rotate-4",
  },
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80",
    alt: "Beach",
    className: "bottom-[8%] left-[12%] w-44 h-32 -rotate-3",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
    alt: "Lake",
    className: "bottom-[6%] right-[8%] w-48 h-36 rotate-5",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    alt: "Tropical",
    className: "bottom-[22%] right-[20%] w-36 h-28 -rotate-6",
  },
  {
    src: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=400&q=80",
    alt: "Greek",
    className: "bottom-[20%] left-[6%] w-36 h-28 rotate-3",
  },
];

export function HeroSection({ onGoogleLogin }: { onGoogleLogin: () => void }) {
  return (
    <section className="relative h-dvh overflow-hidden">
      {/* Dashed flight paths */}
      <svg
        className="absolute inset-0 w-full h-full text-brand-400 opacity-25"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M -50 350 Q 100 80, 350 120 Q 550 150, 700 80 Q 900 -10, 1250 180"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />
        <g transform="translate(524, 127) rotate(85)" color="#1d4ed8">
          <path
            d="M-2-8 L0-10 L2-8 L2-2 L6 2 L6 4 L2 1 L2 6 L4 8 L4 9.5 L0 8 L-4 9.5 L-4 8 L-2 6 L-2 1 L-6 4 L-6 2 L-2-2Z"
            fill="currentColor"
          />
        </g>
        <path
          d="M -50 620 Q 150 750, 400 680 Q 600 620, 800 700 Q 1000 770, 1250 650"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />
        <g transform="translate(707, 671) rotate(103)" color="#1d4ed8">
          <path
            d="M-2-8 L0-10 L2-8 L2-2 L6 2 L6 4 L2 1 L2 6 L4 8 L4 9.5 L0 8 L-4 9.5 L-4 8 L-2 6 L-2 1 L-6 4 L-6 2 L-2-2Z"
            fill="currentColor"
          />
        </g>
      </svg>

      {/* Floating photos */}
      {FLOATING_PHOTOS.map((photo) => (
        <div
          key={photo.alt}
          className={`absolute hidden lg:block rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white p-1 ${photo.className}`}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="240px" />
          </div>
        </div>
      ))}

      {/* Hero content */}
      <div className="relative flex flex-col items-center justify-center h-full px-6">
        <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-200">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>

        <p className="text-brand-500 font-bold text-sm tracking-widest uppercase mb-4">
          Travel Basket
        </p>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center leading-tight max-w-lg">
          여행의 설렘을
          <br />
          <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
            함께 담다
          </span>
        </h1>

        <p className="mt-5 text-gray-500 text-center max-w-sm leading-relaxed">
          가고 싶은 장소를 모아두고, 함께 일정을 짜세요.
          <br />
          실시간 협업으로 완벽한 여행을 계획합니다.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onGoogleLogin}
            className="inline-flex items-center gap-3 h-12 px-7 rounded-lg bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            <GoogleIcon />
            <span className="text-gray-700 font-medium text-base">Google로 시작하기</span>
          </button>
          <p className="text-xs text-gray-400">무료로 시작 · 로그인 후 바로 일정 만들기</p>
        </div>
      </div>
    </section>
  );
}
