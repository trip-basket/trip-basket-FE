import { useMutation } from "@tanstack/react-query";
import type { Ref } from "react";
import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { toast } from "@/src/lib/toast";
import { DAY_COL_MIN_W } from "../constants";
import useCalendarStore from "../stores/use-calendar-store";
import { formatCurrency, formatLocalDate } from "../utils";
import { AddDateHeaderCell } from "./add-date-column";

export function DayHeader({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const addDayBefore = useCalendarStore((s) => s.addDayBefore);
  const addDayAfter = useCalendarStore((s) => s.addDayAfter);
  const room = useRoomStore((s) => s.room);

  const updateMutation = useMutation({
    mutationFn: (data: { roomId: string; tripStartDate?: string; tripEndDate?: string }) =>
      roomApi.update(data.roomId, data),
    onError: () => toast.error(ROOM_ERROR_MESSAGES.update),
  });

  const handleAddDayBefore = () => {
    if (!room || tripDays.length === 0) {
      return;
    }
    const newStart = new Date(`${tripDays[0].date}T00:00:00`);
    newStart.setDate(newStart.getDate() - 1);

    updateMutation.mutate(
      { roomId: room.id, tripStartDate: formatLocalDate(newStart) },
      { onSuccess: addDayBefore },
    );
  };

  const handleAddDayAfter = () => {
    if (!room || tripDays.length === 0) {
      return;
    }
    const newEnd = new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`);
    newEnd.setDate(newEnd.getDate() + 1);

    updateMutation.mutate(
      { roomId: room.id, tripEndDate: formatLocalDate(newEnd) },
      { onSuccess: addDayAfter },
    );
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
