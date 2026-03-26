import type { Ref } from "react";
import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../constants";
import { useAddDay } from "../hooks/use-add-day";
import useCalendarStore from "../stores/use-calendar-store";
import { formatCurrency } from "../utils";
import { AddDateHeaderCell } from "./add-date-column";

export function DayHeader({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const room = useRoomStore((s) => s.room);
  const { handleAddDayBefore, handleAddDayAfter } = useAddDay();

  return (
    <div ref={ref} className="sticky top-0 z-20 flex bg-elevated border-b border-grid-line">
      <AddDateHeaderCell onClick={handleAddDayBefore} position="left" />
      {tripDays.map((day) => {
        const dayCost = day.blocks.reduce((sum, b) => sum + (b.cost ?? 0), 0);

        return (
          <div
            key={day.date}
            className="flex flex-1 flex-col items-center border-l border-grid-line pb-3 pt-2"
            style={{ minWidth: DAY_COL_MIN_W }}
          >
            <Text variant="body">{day.dayOfWeek}</Text>
            <Text variant="h2" weight="extrabold">
              {day.dateNum}
            </Text>
            {dayCost > 0 && (
              <Text variant="caption" color="muted">
                {formatCurrency(dayCost, room?.currency)}
              </Text>
            )}
          </div>
        );
      })}
      <AddDateHeaderCell onClick={handleAddDayAfter} position="right" />
    </div>
  );
}
