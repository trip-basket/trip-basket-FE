import { useMutation } from "@tanstack/react-query";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { toast } from "@/src/lib/toast";
import useCalendarStore from "../stores/use-calendar-store";
import { formatLocalDate } from "../utils";

export function useAddDay() {
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

  return { handleAddDayBefore, handleAddDayAfter };
}
