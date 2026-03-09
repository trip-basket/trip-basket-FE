"use client";

import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { Member } from "@/src/feature/room/types";
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

function MemberAvatar({ member }: { member: Member }) {
  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden"
      style={{
        width: 28,
        height: 28,
        border: member.isOnline ? "2px solid #34D399" : "2px solid var(--gray-200)",
        opacity: member.isOnline ? 1 : 0.5,
      }}
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
        <div className="flex h-full w-full items-center justify-center bg-gray-200">
          <span className="text-[10px] font-semibold text-gray-500">
            {member.nickname.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}

export function CalendarMetaBar() {
  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
  const calendarBlocks = useBlockStore((s) => s.calendarBlocks);
  const bucketBlocks = useBlockStore((s) => s.bucketBlocks);

  const totalCost = [...calendarBlocks, ...bucketBlocks].reduce((sum, b) => sum + (b.cost ?? 0), 0);

  if (!room) {
    return null;
  }

  return (
    <div className="flex items-center justify-between shrink-0 px-3 py-2 border-b border-black/6">
      <div className="flex items-center gap-1.5">
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
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          {members.map((member) => (
            <MemberAvatar key={member.id} member={member} />
          ))}
        </div>
        <button
          type="button"
          className="flex items-center justify-center h-6 w-6 rounded-full border border-dashed border-black/15 text-muted transition-colors hover:bg-black/5 hover:text-main"
          aria-label="멤버 초대"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
