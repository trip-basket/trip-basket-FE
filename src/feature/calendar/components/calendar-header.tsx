"use client";

import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";

export function CalendarHeader() {
  const room = useRoomStore((s) => s.room);

  if (!room) {
    return null;
  }

  return (
    <header className="flex items-center justify-between shrink-0">
      {/* 왼쪽: 홈 + 여행 제목 */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          className="flex items-center justify-center h-8 w-8 rounded-lg shrink-0 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="홈으로 이동"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 13L5 8L10 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Text variant="body" weight="bold" className="truncate text-white">
          {room.name}
        </Text>
      </div>

      {/* 오른쪽: 액션 */}
      <div className="flex items-center gap-1 shrink-0 ml-4">
        <button
          type="button"
          className="flex items-center justify-center h-8 w-8 rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
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
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-8 w-8 rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="설정"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="3" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="13" r="1.2" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}
