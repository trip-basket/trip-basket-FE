import type { Ref } from "react";
import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { request } from "@/src/lib/request";
import { DAY_COL_MIN_W } from "../constants";
import useCalendarStore from "../stores/use-calendar-store";
import { formatCurrency, formatLocalDate } from "../utils";
import { AddDateHeaderCell } from "./add-date-column";

export function DayHeader({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const addDayBefore = useCalendarStore((s) => s.addDayBefore);
  const addDayAfter = useCalendarStore((s) => s.addDayAfter);
  const room = useRoomStore((s) => s.room);

  const handleAddDayBefore = async () => {
    if (!room || tripDays.length === 0) {
      return;
    }
    const newStart = new Date(`${tripDays[0].date}T00:00:00`);
    newStart.setDate(newStart.getDate() - 1);

    const result = await request(
      () => roomApi.update(room.id, { tripStartDate: formatLocalDate(newStart) }),
      ROOM_ERROR_MESSAGES.update,
    );
    if (result) {
      addDayBefore();
    }
  };

  const handleAddDayAfter = async () => {
    if (!room || tripDays.length === 0) {
      return;
    }
    const newEnd = new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`);
    newEnd.setDate(newEnd.getDate() + 1);

    const result = await request(
      () => roomApi.update(room.id, { tripEndDate: formatLocalDate(newEnd) }),
      ROOM_ERROR_MESSAGES.update,
    );
    if (result) {
      addDayAfter();
    }
  };

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
