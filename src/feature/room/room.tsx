"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui";
import { Calendar } from "@/src/feature/calendar";
import { BlockBucket, SidebarToggle } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

export function RoomContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row p-grid-gap overflow-y-auto lg:overflow-hidden">
        <div className="flex lg:basis-3/5 shrink-0 lg:min-w-[500px] min-h-0 flex-col overflow-hidden">
          <Calendar />
        </div>

        {/* 데스크톱: 토글 사이드바 */}
        <div className="hidden lg:contents">
          {isSidebarOpen && <BlockBucket />}
          <SidebarToggle onClick={() => setIsSidebarOpen((prev) => !prev)} />
        </div>

        {/* 모바일: BlockBucket은 캘린더 아래에 항상 표시 */}
        <div className="lg:hidden">
          <BlockBucket />
        </div>

        {/* 데스크톱: 지도 패널 */}
        <div className="hidden lg:block min-h-[300px] lg:min-h-0 flex-1 lg:min-w-[300px] lg:ml-2">
          <Maps />
        </div>
      </div>

      {/* 모바일: 지도 열기 버튼 (화면 하단 중앙 고정) */}
      <Button
        variant="solid"
        onClick={() => setIsMapOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        지도 보기
      </Button>

      {/* 모바일: 전체 화면 지도 오버레이 */}
      {isMapOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
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
