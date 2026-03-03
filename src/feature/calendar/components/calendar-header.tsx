"use client";

import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import useCalendarBlockStore from "../stores/use-calendar-block-store";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const days = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${dateFormatter.format(s)} – ${dateFormatter.format(e)} · ${days}일`;
}

export function CalendarHeader() {
  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
  const calendarBlocks = useCalendarBlockStore((s) => s.calendarBlocks);
  const bucketBlocks = useCalendarBlockStore((s) => s.bucketBlocks);

  const totalCost = [...calendarBlocks, ...bucketBlocks].reduce((sum, b) => sum + (b.cost ?? 0), 0);

  if (!room) {
    return null;
  }

  return (
    <header className="flex rounded-lg bg-canvas px-4 py-2 shrink-0">
      <div className="flex flex-1 items-center justify-between min-w-0">
        {/* 왼쪽: 여행 정보 (클릭 → 편집 팝오버) */}
        <div className="group flex flex-col min-w-0 mb-1">
          <Text
            variant="h4"
            color="sub"
            className="truncate transition-colors group-hover:text-main cursor-pointer"
          >
            {room.name}
          </Text>
          <Text
            variant="caption"
            color="muted"
            className="transition-colors group-hover:text-sub cursor-pointer"
          >
            {formatDateRange(room.tripStartDate, room.tripEndDate)}
          </Text>
        </div>

        {/* 오른쪽: 비용 + 멤버 + 초대 */}
        <div className="flex flex-col items-end gap-0.5 shrink-0 ml-4">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-canvas bg-gray-200 overflow-hidden"
                  title={member.nickname}
                >
                  {member.profileImageUrl ? (
                    // biome-ignore lint/performance/noImgElement: mock 아바타 (프로토타입)
                    <img
                      src={member.profileImageUrl}
                      alt={member.nickname}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[11px] font-semibold text-gray-500">
                      {member.nickname.charAt(0)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-500 cursor-pointer"
              aria-label="멤버 초대"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <Text variant="caption" color="muted" className="tabular-nums cursor-pointer">
            {room.currency} {totalCost.toLocaleString()}
          </Text>
        </div>
      </div>
    </header>
  );
}
