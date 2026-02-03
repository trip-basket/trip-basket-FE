"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui";
import { Calendar } from "@/src/feature/calendar";
import { BlockBucket } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";
import { BottomSheet } from "./components";

export function RoomMobile() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 min-h-0 flex-col p-grid-gap overflow-y-auto">
        <div className="flex shrink-0 flex-col bg-canvas rounded-xl p-grid-gap gap-grid-gap">
          <Calendar />
          <BlockBucket />
        </div>
      </div>

      {/* 지도 열기 버튼 (화면 하단 중앙 고정) */}
      <Button
        variant="solid"
        onClick={() => setIsMapOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        지도 보기
      </Button>

      {/* 지도 바텀시트 */}
      <BottomSheet isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
        <Maps />
      </BottomSheet>
    </>
  );
}
