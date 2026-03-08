"use client";

import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import useBlockStore from "../stores/use-block-store";

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
  const calendarBlocks = useBlockStore((s) => s.calendarBlocks);
  const bucketBlocks = useBlockStore((s) => s.bucketBlocks);

  const totalCost = [...calendarBlocks, ...bucketBlocks].reduce((sum, b) => sum + (b.cost ?? 0), 0);

  if (!room) {
    return null;
  }

  return (
    <header className="flex items-center justify-between shrink-0">
      {/* 왼쪽: 여행 제목 + 날짜 */}
      <div className="flex items-center gap-3 min-w-0">
        <Text variant="h3" className="truncate">
          {room.name}
        </Text>
      </div>

      {/* 오른쪽: 비용 + 멤버 + 초대 */}
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <button type="button" className="chip-inset chip-inset--strong shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M3 10h18M8 2v4M16 2v4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <Text variant="caption" className="text-inherit">
            {formatDateRange(room.tripStartDate, room.tripEndDate)}
          </Text>
        </button>
        <button type="button" className="chip-inset chip-inset--strong tabular-nums">
          <Text variant="caption" className="text-inherit tabular-nums">
            {room.currency} {totalCost.toLocaleString()}
          </Text>
        </button>
        <button type="button" className="chip-inset chip-inset--strong gap-1.5">
          <div className="flex -space-x-1.5">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 overflow-hidden"
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
                  <span className="text-[10px] font-semibold text-gray-500">
                    {member.nickname.charAt(0)}
                  </span>
                )}
              </div>
            ))}
          </div>
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
    </header>
  );
}
