"use client";

import { useState } from "react";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import useCalendarStore from "../stores/use-calendar-store";
import { DateRangePickerModal } from "./date-picker";
import { CostChip, DateChip, MemberList } from "./meta";

/**
 * Renders a meta bar showing the trip date range, aggregated cost, and member list, and provides a date-range picker modal.
 *
 * The component reads room, members, trip days, and bucket blocks from stores to compute the displayed date range and total cost. Tapping the date chip opens an internal date-range picker.
 *
 * @returns The rendered meta bar element, or `null` when no room data is available.
 */
export function CalendarMetaBar() {
  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
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
