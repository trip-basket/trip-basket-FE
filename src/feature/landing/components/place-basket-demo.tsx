"use client";

import { useState } from "react";
import { WindowDots } from "./window-dots";

const PLACES = [
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

export function PlaceBasketDemo() {
  const [saved, setSaved] = useState<Set<string>>(new Set(["a"]));

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
      <div className="rounded-3xl bg-white border border-outline shadow-xl p-5">
        <WindowDots title="장소 바구니" />
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-inset border border-outline mb-4">
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
          <span className="text-sm text-muted">장소 검색...</span>
        </div>
        <div className="space-y-2.5">
          {PLACES.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 p-3 rounded-xl ${p.bg} border ${p.border} transition-all duration-300 ${
                saved.has(p.id) ? "ring-2 ring-accent-outline ring-offset-1" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill={p.icon} aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2" fill="white" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-main truncate">{p.name}</p>
                <p className="text-xs text-muted">{p.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                aria-label={saved.has(p.id) ? "저장 해제" : "저장"}
                aria-pressed={saved.has(p.id)}
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
        <p className="text-center text-[11px] text-muted mt-3">북마크를 눌러 장소를 저장해보세요</p>
      </div>
    </div>
  );
}
