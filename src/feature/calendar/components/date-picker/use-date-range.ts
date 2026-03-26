import { useCallback, useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { request } from "@/src/lib/request";
import useCalendarStore from "../../stores/use-calendar-store";
import { formatLocalDate } from "../../utils";

export function useDateRange(open: boolean, onOpenChange: (open: boolean) => void) {
  const room = useRoomStore((s) => s.room);
  const tripDays = useCalendarStore((s) => s.tripDays);
  const updateDateRange = useCalendarStore((s) => s.updateDateRange);

  const [range, setRange] = useState<DateRange | undefined>();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (open && tripDays.length > 0) {
      setRange({
        from: new Date(`${tripDays[0].date}T00:00:00`),
        to: new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`),
      });
      setShowWarning(false);
    }
  }, [open, tripDays]);

  const blocksToDelete = useMemo(() => {
    if (!range?.from || !range?.to) {
      return 0;
    }

    const newStart = range.from.getTime();
    const newEnd = range.to.getTime();

    let count = 0;
    for (const day of tripDays) {
      const dayTime = new Date(`${day.date}T00:00:00`).getTime();
      if (dayTime < newStart || dayTime > newEnd) {
        count += day.blocks.length;
      }
    }
    return count;
  }, [range, tripDays]);

  const isRangeComplete = !!(range?.from && range?.to);

  const handleConfirm = useCallback(async () => {
    if (!range?.from || !range?.to || !room) {
      return;
    }

    if (blocksToDelete > 0 && !showWarning) {
      setShowWarning(true);
      return;
    }

    const startDate = formatLocalDate(range.from);
    const endDate = formatLocalDate(range.to);

    const result = await request(
      () => roomApi.update(room.id, { tripStartDate: startDate, tripEndDate: endDate }),
      ROOM_ERROR_MESSAGES.update,
    );

    if (result) {
      updateDateRange(startDate, endDate);
      onOpenChange(false);
    }
  }, [range, room, blocksToDelete, showWarning, updateDateRange, onOpenChange]);

  const handleRangeSelect = useCallback((newRange: DateRange | undefined) => {
    setRange(newRange);
    setShowWarning(false);
  }, []);

  const defaultMonth = range?.from ?? new Date();

  return {
    range,
    showWarning,
    blocksToDelete,
    isRangeComplete,
    defaultMonth,
    handleConfirm,
    handleRangeSelect,
  };
}
