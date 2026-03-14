"use client";

import Image from "next/image";
import { useState } from "react";

// ========== Data ==========

const FLOATING_PHOTOS = [
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

// ========== Shared Components ==========

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function WindowDots({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      <span className="ml-2 text-xs text-gray-400 font-medium">{title}</span>
    </div>
  );
}

// ========== Radial Glow Backdrop ==========

function RadialGlow() {
  return (
    <div
      className="absolute -inset-12 pointer-events-none -z-10"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%)",
      }}
    />
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="border-t border-dashed border-gray-200" />
    </div>
  );
}

// ========== Feature 1: Place Basket Demo ==========

function PlaceBasketDemo() {
  const [saved, setSaved] = useState<Set<string>>(new Set(["a"]));

  const places = [
    {
      id: "a",
      name: "이치란 라멘 본점",
      sub: "맛집 · 하카타",
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "#F59E0B",
    },
    {
      id: "b",
      name: "후시미 이나리 신사",
      sub: "관광지 · 교토",
      bg: "bg-sky-50",
      border: "border-sky-100",
      icon: "#0EA5E9",
    },
    {
      id: "c",
      name: "아라시야마 대나무숲",
      sub: "자연 · 교토",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: "#10B981",
    },
  ];

  const toggle = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-5">
        <WindowDots title="장소 바구니" />
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-4">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-sm text-gray-400">장소 검색...</span>
        </div>
        <div className="space-y-2.5">
          {places.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 p-3 rounded-xl ${p.bg} border ${p.border} transition-all duration-300 ${
                saved.has(p.id) ? "ring-2 ring-brand-300 ring-offset-1" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill={p.icon} aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2" fill="white" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-400">{p.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={saved.has(p.id) ? "#818CF8" : "none"}
                  stroke={saved.has(p.id) ? "#818CF8" : "#D1D5DB"}
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-gray-300 mt-3">
          북마크를 눌러 장소를 저장해보세요
        </p>
      </div>
    </div>
  );
}

// ========== Feature 2: Schedule Drag Demo ==========

type DayId = "day1" | "day2";

interface ScheduleBlock {
  id: string;
  label: string;
  time: string;
  bg: string;
  border: string;
  text: string;
}

const INITIAL_SCHEDULE: Record<DayId, ScheduleBlock[]> = {
  day1: [
    {
      id: "a",
      label: "에펠탑",
      time: "10:00 - 12:00",
      bg: "bg-sky-50",
      border: "border-l-sky-400",
      text: "text-sky-700",
    },
    {
      id: "b",
      label: "루브르 박물관",
      time: "13:00 - 16:00",
      bg: "bg-amber-50",
      border: "border-l-amber-400",
      text: "text-amber-700",
    },
  ],
  day2: [
    {
      id: "c",
      label: "몽마르뜨 언덕",
      time: "10:00 - 11:30",
      bg: "bg-violet-50",
      border: "border-l-violet-400",
      text: "text-violet-700",
    },
    {
      id: "d",
      label: "개선문",
      time: "14:00 - 15:30",
      bg: "bg-rose-50",
      border: "border-l-rose-400",
      text: "text-rose-700",
    },
  ],
};

function ScheduleDragDemo() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [dragged, setDragged] = useState<{ id: string; from: DayId } | null>(null);
  const [overCol, setOverCol] = useState<DayId | null>(null);

  const onDragStart = (id: string, from: DayId) => (e: React.DragEvent) => {
    setDragged({ id, from });
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (col: DayId) => (e: React.DragEvent) => {
    e.preventDefault();
    setOverCol(col);
  };

  const onDrop = (toCol: DayId) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragged) {
      return;
    }
    if (dragged.from === toCol) {
      setDragged(null);
      setOverCol(null);
      return;
    }
    setSchedule((prev) => {
      const src = [...prev[dragged.from]];
      const idx = src.findIndex((b) => b.id === dragged.id);
      if (idx === -1) {
        return prev;
      }
      const [block] = src.splice(idx, 1);
      return { ...prev, [dragged.from]: src, [toCol]: [...prev[toCol], block] };
    });
    setDragged(null);
    setOverCol(null);
  };

  const onDragEnd = () => {
    setDragged(null);
    setOverCol(null);
  };

  const renderCol = (id: DayId, label: string, date: string) => (
    <div
      role="listbox"
      className={`flex-1 rounded-2xl border-2 border-dashed p-3 transition-colors duration-200 min-h-[160px] ${
        overCol === id ? "border-brand-400 bg-brand-50/50" : "border-gray-200 bg-gray-50/30"
      }`}
      onDragOver={onDragOver(id)}
      onDragLeave={() => setOverCol(null)}
      onDrop={onDrop(id)}
    >
      <p className="text-xs font-bold text-gray-800 mb-0.5">{label}</p>
      <p className="text-[10px] text-gray-400 mb-3">{date}</p>
      <div className="space-y-2">
        {schedule[id].map((b) => (
          <div
            key={b.id}
            role="option"
            aria-selected={false}
            tabIndex={0}
            draggable
            onDragStart={onDragStart(b.id, id)}
            onDragEnd={onDragEnd}
            className={`p-2.5 rounded-xl border-l-[3px] ${b.bg} ${b.border} cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 select-none ${
              dragged?.id === b.id ? "opacity-30 scale-95" : ""
            }`}
          >
            <p className={`text-xs font-semibold ${b.text}`}>{b.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{b.time}</p>
          </div>
        ))}
        {schedule[id].length === 0 && (
          <div className="flex items-center justify-center h-16 rounded-xl border border-dashed border-gray-200 text-[11px] text-gray-300">
            여기에 놓으세요
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-5">
        <WindowDots title="파리 여행 일정" />
        <div className="flex gap-3">
          {renderCol("day1", "Day 1", "3월 15일 (토)")}
          {renderCol("day2", "Day 2", "3월 16일 (일)")}
        </div>
        <p className="text-center text-[11px] text-gray-300 mt-3">
          블록을 드래그해서 다른 날짜로 옮겨보세요
        </p>
      </div>
    </div>
  );
}

// ========== Feature 3: Collaboration Demo ==========

function CollabDemo() {
  return (
    <>
      <style>
        {`
          @keyframes float-cursor-1 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(30px, 15px); }
            50% { transform: translate(15px, -8px); }
            75% { transform: translate(-8px, 12px); }
          }
          @keyframes typing-dot {
            0%, 80%, 100% { opacity: 0.3; }
            40% { opacity: 1; }
          }
        `}
      </style>
      <div className="w-full max-w-sm">
        <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-xs text-gray-400 font-medium">오사카 여행</span>
            <div className="ml-auto flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-rose-400 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                J
              </div>
              <div className="w-6 h-6 rounded-full bg-emerald-400 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                M
              </div>
              <div className="w-6 h-6 rounded-full bg-violet-400 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                S
              </div>
            </div>
          </div>

          {/* Mini calendar grid */}
          <div className="grid grid-cols-3 gap-2 relative">
            <div>
              <p className="text-[10px] text-gray-400 mb-2 text-center">Day 1</p>
              <div className="space-y-1.5">
                <div className="h-9 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <span className="text-[10px] text-sky-600 font-medium">도톤보리</span>
                </div>
                <div className="h-12 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <span className="text-[10px] text-amber-600 font-medium">오사카성</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-2 text-center">Day 2</p>
              <div className="space-y-1.5">
                <div className="h-10 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center relative">
                  <span className="text-[10px] text-violet-600 font-medium">나라 공원</span>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm">
                    M
                  </div>
                </div>
                <div className="h-7 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <span className="text-[10px] text-rose-600 font-medium">신사이바시</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-2 text-center">Day 3</p>
              <div className="space-y-1.5">
                <div className="h-9 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <span className="text-[10px] text-teal-600 font-medium">유니버셜</span>
                </div>
                <div className="h-9 rounded-lg border-2 border-dashed border-violet-300 flex items-center justify-center animate-pulse relative">
                  <span className="text-[10px] text-violet-400">추가 중...</span>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-violet-400 border-2 border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm">
                    S
                  </div>
                </div>
              </div>
            </div>

            {/* Animated cursor */}
            <div
              className="absolute top-8 left-6 pointer-events-none"
              style={{ animation: "float-cursor-1 4s ease-in-out infinite" }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16" fill="#F43F5E" aria-hidden="true">
                <path d="M0 0l12 8.5-5 1L4.5 16 0 0z" />
              </svg>
              <span className="text-[8px] bg-rose-500 text-white px-1 py-0.5 rounded ml-0.5 whitespace-nowrap">
                지민
              </span>
            </div>
          </div>

          {/* Editing indicator */}
          <div className="mt-4 flex items-center gap-3 text-[10px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>민수님이 Day 2 편집 중</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ========== Feature 4: Route Demo ==========

function RouteDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-5">
        <WindowDots title="이동 경로" />

        <div className="relative pl-8">
          {/* Vertical dashed line */}
          <div className="absolute left-[11px] top-3 bottom-3 border-l-2 border-dashed border-teal-200" />

          {/* Waypoint 1 */}
          <div className="relative mb-5">
            <div className="absolute -left-[21px] top-0.5 w-6 h-6 rounded-full bg-teal-500 border-2 border-white shadow-sm flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">1</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">에펠탑</p>
            <p className="text-[11px] text-gray-400">10:00 - 12:00</p>
          </div>

          {/* Transport 1 */}
          <div className="relative mb-5 -ml-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-medium">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
              </svg>
              도보 15분 · 1.2km
            </span>
          </div>

          {/* Waypoint 2 */}
          <div className="relative mb-5">
            <div className="absolute -left-[21px] top-0.5 w-6 h-6 rounded-full bg-teal-500 border-2 border-white shadow-sm flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">2</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">루브르 박물관</p>
            <p className="text-[11px] text-gray-400">13:00 - 16:00</p>
          </div>

          {/* Transport 2 */}
          <div className="relative mb-5 -ml-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-medium">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 11H6V6h12v5z" />
              </svg>
              버스 8분 · 3.5km
            </span>
          </div>

          {/* Waypoint 3 */}
          <div className="relative">
            <div className="absolute -left-[21px] top-0.5 w-6 h-6 rounded-full bg-teal-500 border-2 border-white shadow-sm flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">3</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">몽마르뜨 언덕</p>
            <p className="text-[11px] text-gray-400">17:00 - 18:30</p>
          </div>
        </div>

        {/* Total */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">총 이동</span>
          <span className="text-xs font-semibold text-teal-700">23분 · 4.7km</span>
        </div>
      </div>
    </div>
  );
}

// ========== Main Page ==========

export default function LandingPage() {
  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return;
    }
    window.location.href = `${apiUrl}/oauth2/authorization/google`;
  };

  return (
    <div className="relative">
      {/* Global grid pattern — scrolls with page */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ===== Hero Section ===== */}
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
          <g transform="translate(520, 133) rotate(8)">
            <path
              d="M-2-8 L0-10 L2-8 L2-2 L6 2 L6 4 L2 1 L2 6 L4 8 L4 9.5 L0 8 L-4 9.5 L-4 8 L-2 6 L-2 1 L-6 4 L-6 2 L-2-2Z"
              fill="currentColor"
            />
          </g>
          <path
            d="M -50 620 Q 150 750, 400 680 Q 600 620, 800 700 Q 1000 770, 1250 650"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeDasharray="8 8"
            strokeLinecap="round"
            opacity="0.6"
          />
          <g transform="translate(700, 695) rotate(20)" opacity="0.6">
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

        {/* Dots */}
        <div className="absolute top-[30%] left-[18%] w-2.5 h-2.5 rounded-full bg-brand-400 opacity-25" />
        <div className="absolute top-[25%] right-[25%] w-2 h-2 rounded-full bg-brand-300 opacity-30" />
        <div className="absolute bottom-[35%] left-[28%] w-2 h-2 rounded-full bg-brand-300 opacity-20" />
        <div className="absolute bottom-[30%] right-[22%] w-1.5 h-1.5 rounded-full bg-brand-400 opacity-25" />

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
              onClick={handleGoogleLogin}
              className="inline-flex items-center gap-3 h-12 px-7 rounded-lg bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            >
              <GoogleIcon />
              <span className="text-gray-700 font-medium text-base">Google로 시작하기</span>
            </button>
            <p className="text-xs text-gray-400">무료로 시작 · 로그인 후 바로 일정 만들기</p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ===== Feature 1: 장소 모아두기 ===== */}
      <section className="py-24 lg:py-32 px-6">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 max-w-lg relative">
            <RadialGlow />
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 text-xs font-semibold mb-6">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                장소 저장
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                가고 싶은 장소,
                <br />
                일단 담아두세요
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-lg">
                지도에서 발견한 장소를 바구니에 모아두고, 원할 때 일정으로 옮기세요. 흩어진 여행
                정보가 한곳에 정리됩니다.
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <RadialGlow />
            <div className="relative">
              <PlaceBasketDemo />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ===== Feature 2: 드래그 앤 드롭 ===== */}
      <section className="py-24 lg:py-32 px-6">
        <div className="mx-auto max-w-5xl flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex justify-center lg:justify-start relative">
            <RadialGlow />
            <div className="relative">
              <ScheduleDragDemo />
            </div>
          </div>
          <div className="flex-1 max-w-lg relative">
            <RadialGlow />
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200/60 text-violet-600 text-xs font-semibold mb-6">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#8B5CF6" opacity="0.4" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#8B5CF6" />
                  <path
                    d="M17.5 17v-3m0 3l-2-2m2 2l2-2"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                일정 관리
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                끌어서
                <br />
                일정 완성
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-lg">
                블록을 드래그해서 원하는 날짜와 시간에 배치하세요. 리사이즈로 체류 시간도 자유롭게
                조절할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ===== Feature 3: 실시간 협업 ===== */}
      <section className="py-24 lg:py-32 px-6">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 max-w-lg relative">
            <RadialGlow />
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-600 text-xs font-semibold mb-6">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                실시간 협업
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                함께 만드는
                <br />
                여행 일정
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-lg">
                친구, 가족과 동시에 일정을 편집하세요. 누가 어디를 수정하는지 실시간으로 확인할 수
                있습니다.
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <RadialGlow />
            <div className="relative">
              <CollabDemo />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ===== Feature 4: 이동시간/거리 ===== */}
      <section className="py-24 lg:py-32 px-6">
        <div className="mx-auto max-w-5xl flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex justify-center lg:justify-start relative">
            <RadialGlow />
            <div className="relative">
              <RouteDemo />
            </div>
          </div>
          <div className="flex-1 max-w-lg relative">
            <RadialGlow />
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-600 text-xs font-semibold mb-6">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z" />
                </svg>
                이동 경로
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                장소 사이,
                <br />
                얼마나 걸릴까?
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-lg">
                일정 사이의 이동 시간과 거리를 자동으로 계산합니다. 대중교통, 도보, 자차까지 한눈에
                비교하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom CTA ===== */}
      <SectionDivider />

      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-lg text-center relative">
          <RadialGlow />
          <h2 className="relative text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="relative text-gray-500 mb-8">
            복잡한 가입 절차 없이, Google 계정으로 바로 여행 계획을 시작할 수 있습니다.
          </p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="relative inline-flex items-center gap-3 h-12 px-7 rounded-lg bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            <GoogleIcon />
            <span className="text-gray-700 font-medium text-base">Google로 시작하기</span>
          </button>
        </div>
      </section>
    </div>
  );
}
