"use client";

import useRoomStore from "@/src/feature/room/stores/use-room-store";
import useBlockStore from "../stores/use-block-store";
import { CostChip, DateChip, MemberList } from "./meta";

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
        <DateChip startDate={room.tripStartDate} endDate={room.tripEndDate} />
        <CostChip cost={totalCost} currency={room.currency} />
      </div>
      <MemberList members={members} />
    </div>
  );
}
