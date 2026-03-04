import type { Ref } from "react";
import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../constants";
import useCalendarBlockStore from "../stores/use-calendar-block-store";

export function DayHeader({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const days = useRoomStore((s) => s.days);
  const room = useRoomStore((s) => s.room);
  const calendarBlocks = useCalendarBlockStore((s) => s.calendarBlocks);

  return (
    <div ref={ref} className="sticky top-0 z-20 flex bg-elevated border-b border-grid-line">
      {days.map((day, index) => {
        const dayCost = calendarBlocks
          .filter((b) => b.dayIndex === index)
          .reduce((sum, b) => sum + (b.cost ?? 0), 0);
        return (
          <div
            key={day.date}
            className="flex flex-1 flex-col items-center pb-3 pt-2"
            style={{ minWidth: DAY_COL_MIN_W }}
          >
            <Text variant="body">{day.dayOfWeek}</Text>
            <Text variant="h2">{day.date}</Text>
            {dayCost > 0 && (
              <Text variant="caption" color="muted">
                {room?.currency ?? ""} {dayCost.toLocaleString()}
              </Text>
            )}
          </div>
        );
      })}
    </div>
  );
}
