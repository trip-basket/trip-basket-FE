"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui";
import { Calendar } from "@/src/feature/calendar";
import { BlockBucket } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

export function RoomMobile() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 min-h-0 flex-col p-grid-gap overflow-y-auto">
        <div className="flex shrink-0 min-h-0 flex-col overflow-hidden">
          <Calendar />
        </div>

        <BlockBucket direction="horizontal" />
      </div>

      {/* 지도 열기 버튼 (화면 하단 중앙 고정) */}
      <Button
        variant="solid"
        onClick={() => setIsMapOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        지도 보기
      </Button>

      {/* 전체 화면 지도 오버레이 */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <button
            type="button"
            onClick={() => setIsMapOpen(false)}
            className="absolute top-20 right-4 z-50 bg-white rounded-full p-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <Maps />
        </div>
      )}
    </>
  );
}
