"use client";

import { useState } from "react";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import useCalendarStore from "../stores/use-calendar-store";
import { DateRangePickerModal } from "./date-picker";
import { CostChip, DateChip, MemberList } from "./meta";

export function CalendarMetaBar() {
  const room = useRoomStore((s) => s.room);
  const members = room?.members ?? [];
  const tripDays = useCalendarStore((s) => s.tripDays);
  const bucketBlocks = useCalendarStore((s) => s.bucketBlocks);

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const startDate = tripDays[0]?.date;
  const endDate = tripDays[tripDays.length - 1]?.date;

  const calendarCost = tripDays.reduce(
    (sum, day) => sum + day.blocks.reduce((s, b) => s + (b.cost ?? 0), 0),
    0,
  );
  const bucketCost = bucketBlocks.reduce((sum, b) => sum + (b.cost ?? 0), 0);
  const totalCost = calendarCost + bucketCost;

  if (!room) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between shrink-0 px-3 py-2 border-b border-black/6">
        <div className="flex items-center gap-1.5">
          {startDate && endDate && (
            <DateChip
              startDate={startDate}
              endDate={endDate}
              onClick={() => setDatePickerOpen(true)}
            />
          )}
          <CostChip cost={totalCost} currency={room.currency} />
        </div>
        <MemberList members={members} />
      </div>
      <DateRangePickerModal open={datePickerOpen} onOpenChange={setDatePickerOpen} />
    </>
  );
}
