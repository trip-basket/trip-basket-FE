"use client";

import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import useCalendarBlockStore from "../stores/use-calendar-block-store";

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    `${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  return `${fmt(s)} – ${fmt(e)}`;
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
    <header className="flex items-center justify-between rounded-lg bg-surface px-6 py-4 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <Text variant="h2" className="truncate">
          {room.name}
        </Text>
        <Text variant="small" color="muted" className="shrink-0">
          {formatDateRange(room.tripStartDate, room.tripEndDate)}
        </Text>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Text variant="small" color="muted">
          {room.currency} {totalCost.toLocaleString()}
        </Text>
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
                <span className="text-[10px] font-semibold text-gray-500">
                  {member.nickname.charAt(0)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
