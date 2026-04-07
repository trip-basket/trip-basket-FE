"use client";

import Image from "next/image";
import { Button, DashedBorder, Text } from "@/src/components/ui";
import { GoogleIcon } from "@/src/feature/landing/components/google-icon";

type FloatingItem =
  | { type: "photo"; src: string; alt: string; className: string }
  | { type: "empty"; className: string };

export const FLOATING_ITEMS: FloatingItem[] = [
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
    alt: "런던 타워 브릿지와 시티 스카이라인",
    className: "top-[6%] left-[8%] w-52 h-40 -rotate-6",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80",
    alt: "산토리니 하얀 마을과 푸른 바다",
    className: "top-[23%] right-[6%] w-46 h-34 -rotate-4",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
    alt: "파리 에펠탑 석양",
    className: "top-[8%] right-[12%] w-50 h-38 rotate-4",
  },
  {
    type: "empty",
    className: "top-[18%] left-[18%] w-40 h-32 rotate-2",
  },
  // {
  //   type: "photo",
  //   src: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80",
  //   alt: "오사카 도톤보리 거리 야경",
  //   className: "top-[38%] left-[5%] w-48 h-36 rotate-6",
  // }
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80",
    alt: "열대 해변과 에메랄드빛 바다",
    className: "bottom-[8%] left-[12%] w-48 h-36 -rotate-3",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
    alt: "호수와 산이 어우러진 풍경",
    className: "bottom-[6%] right-[8%] w-52 h-40 rotate-5",
  },
  {
    type: "empty",
    className: "bottom-[22%] right-[15%] w-40 h-32 -rotate-6",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80",
    alt: "그리스 파란 지붕 성당과 바다",
    className: "bottom-[20%] left-[6%] w-40 h-32 rotate-3",
  },
];

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full rounded-card overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" sizes="240px" />
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="flex items-center justify-center w-full h-full text-muted">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
}

export function HeroSection({ onGoogleLogin }: { onGoogleLogin: () => void }) {
  return (
    <section className="relative h-dvh overflow-hidden bg-page">
      {/* Dashed flight paths */}
      <svg
        className="absolute inset-0 w-full h-full text-amber-400 opacity-70"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Path 1: 좌 → 우 상단 곡선 */}
        {/* <path
          d="M -50 350 Q 100 80, 350 120 Q 550 150, 700 80 Q 900 -10, 1250 180"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="10 8"
          strokeLinecap="round"
        /> */}
        {/* <g transform="translate(524, 127) rotate(85)" className="text-amber-600">
          <path
            d="M-2-8 L0-10 L2-8 L2-2 L6 2 L6 4 L2 1 L2 6 L4 8 L4 9.5 L0 8 L-4 9.5 L-4 8 L-2 6 L-2 1 L-6 4 L-6 2 L-2-2Z"
            fill="currentColor"
          />
        </g> */}
        {/* Path 2: 좌측에서 들어와 좌상단 카드를 감싸고 다시 좌측으로 */}
        <path
          d="M -50 -30 Q 100 50, 280 20 Q 450 -10, 400 120 Q 350 250, 150 300 Q -20 340, -500 420"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
        <g transform="translate(396, 130) rotate(205)" className="text-amber-600">
          <path
            d="M-2-8 L0-10 L2-8 L2-2 L6 2 L6 4 L2 1 L2 6 L4 8 L4 9.5 L0 8 L-4 9.5 L-4 8 L-2 6 L-2 1 L-6 4 L-6 2 L-2-2Z"
            fill="currentColor"
          />
        </g>
        {/* Path 3: 우상단 밖 → 파리 → 산토리니 → 빈슬롯 → 호수 → 우하단 밖 (둥근 곡선) */}
        <path
          d="M 1300 -50 Q 1100 40, 1060 100 Q 1000 180, 1080 250 Q 1160 320, 1100 450 Q 1020 580, 1080 680 Q 1150 760, 1350 830"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
        <g transform="translate(1100, 450) rotate(30)" className="text-amber-600">
          <path
            d="M-2-8 L0-10 L2-8 L2-2 L6 2 L6 4 L2 1 L2 6 L4 8 L4 9.5 L0 8 L-4 9.5 L-4 8 L-2 6 L-2 1 L-6 4 L-6 2 L-2-2Z"
            fill="currentColor"
          />
        </g>
      </svg>

      {/* Floating photos & empty slots */}
      {FLOATING_ITEMS.map((item, i) => (
        <div
          key={item.type === "photo" ? item.alt : `empty-${i}`}
          className={`absolute hidden lg:block rounded-container bg-white p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] border-[1.5px] border-outline backface-visibility-hidden will-change-transform ${item.className}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.type === "photo" ? (
            <PhotoCard src={item.src} alt={item.alt} />
          ) : (
            <div className="relative w-full h-full rounded-card">
              <DashedBorder radius={16} />
              <EmptySlot />
            </div>
          )}
        </div>
      ))}

      {/* Hero content */}
      <div className="relative flex flex-col items-center justify-center h-full px-6">
        <Text variant="caption" weight="bold" className="tracking-widest uppercase mb-4">
          Travel Basket
        </Text>

        <Text variant="display" align="center" className="max-w-lg">
          여행의 설렘을
          <br />
          <span className="relative">
            함께 담다
            <span
              className="absolute bottom-0 left-0 w-full h-[6px] bg-amber-400 rounded-full -z-1 opacity-60"
              aria-hidden="true"
            />
          </span>
        </Text>

        <Text variant="body" color="soft" align="center" className="mt-5 max-w-sm">
          가고 싶은 장소를 모아두고, 함께 일정을 짜보세요.
          <br />
          실시간 협업으로 완벽한 여행을 계획합니다.
        </Text>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={onGoogleLogin}
            className="px-7 shadow-md hover:shadow-lg"
          >
            <GoogleIcon />
            Google로 시작하기
          </Button>
          <Text variant="caption" color="muted">
            무료로 시작 · 로그인 후 바로 일정 만들기
          </Text>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted animate-bounce motion-reduce:animate-none">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
