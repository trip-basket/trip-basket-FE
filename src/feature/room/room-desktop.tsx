"use client";

import { useCallback, useRef, useState } from "react";
import { Calendar } from "@/src/feature/calendar";
import { BlockBucket } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

const MIN_RATIO = 0.25;
const MAX_RATIO = 0.75;
const DEFAULT_RATIO = 0.5;

export function RoomDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(DEFAULT_RATIO);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onMove = (ev: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width;
      setRatio(Math.min(MAX_RATIO, Math.max(MIN_RATIO, x)));
    };

    const onUp = () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-1 p-grid-gap overflow-hidden">
      {/* 왼쪽: 캘린더 + Bucket */}
      <div
        className="flex flex-col bg-canvas rounded-xl p-grid-gap gap-grid-gap min-w-0 overflow-hidden"
        style={{ width: `${ratio * 100}%` }}
      >
        <Calendar />
        <BlockBucket />
      </div>

      {/* 리사이저 */}
      <div
        onPointerDown={onPointerDown}
        className="shrink-0 w-3 cursor-col-resize flex items-center justify-center group"
      >
        <div className="w-1 h-12 rounded-full bg-gray-300 group-hover:bg-gray-400 group-active:bg-gray-500 transition-colors" />
      </div>

      {/* 오른쪽: 지도 */}
      <div className="flex-1 min-w-0">
        <Maps />
      </div>
    </div>
  );
}
