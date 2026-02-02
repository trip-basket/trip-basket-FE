"use client";

import { Calendar } from "@/src/feature/calendar";
import { BlockBucket } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

export function RoomDesktop() {
  return (
    <div className="flex flex-1 p-grid-gap gap-grid-gap overflow-hidden">
      {/* 왼쪽: 캘린더 + Bucket (하나의 플로팅 박스) */}
      <div className="flex flex-1 flex-col bg-canvas rounded-xl p-grid-gap gap-grid-gap min-w-0">
        <Calendar />
        <BlockBucket />
      </div>

      {/* 오른쪽: 지도 */}
      <div className="flex-1">
        <Maps />
      </div>
    </div>
  );
}
