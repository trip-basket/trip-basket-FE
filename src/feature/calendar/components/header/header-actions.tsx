"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui";
import { EditRoomNameModal } from "./edit-room-name-modal";

export function HeaderActions() {
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1 shrink-0 ml-4">
        {/* 내보내기 버튼 */}
        <Button
          variant="icon"
          color="neutral"
          size="sm"
          className="hover-item"
          aria-label="내보내기"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M5.5 2H3.5C2.67 2 2 2.67 2 3.5V12.5C2 13.33 2.67 14 3.5 14H12.5C13.33 14 14 13.33 14 12.5V10.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M8.5 7.5L14 2M14 2H10.5M14 2V5.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        {/* 설정 버튼 — 방 이름 수정 */}
        <Button
          variant="icon"
          color="neutral"
          size="sm"
          className="hover-item cursor-pointer"
          aria-label="설정"
          onClick={() => setIsEditNameOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="3" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="13" r="1.2" fill="currentColor" />
          </svg>
        </Button>
      </div>

      <EditRoomNameModal open={isEditNameOpen} onOpenChange={setIsEditNameOpen} />
    </>
  );
}
