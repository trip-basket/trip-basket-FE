import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/query-keys";
import { toast } from "@/src/lib/toast";
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

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: { roomId: string; tripStartDate: string; tripEndDate: string }) =>
      roomApi.update(data.roomId, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms });
      updateDateRange(variables.tripStartDate, variables.tripEndDate);
      onOpenChange(false);
    },
    onError: () => toast.error(ROOM_ERROR_MESSAGES.update),
  });

  const handleConfirm = useCallback(() => {
    if (!range?.from || !range?.to || !room) {
      return;
    }

    if (blocksToDelete > 0 && !showWarning) {
      setShowWarning(true);
      return;
    }

    updateMutation.mutate({
      roomId: room.id,
      tripStartDate: formatLocalDate(range.from),
      tripEndDate: formatLocalDate(range.to),
    });
  }, [range, room, blocksToDelete, showWarning, updateMutation]);

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
