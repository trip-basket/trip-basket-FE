import { useMutation } from "@tanstack/react-query";
import { useCalendarStore } from "@/src/feature/calendar/stores";
import { formatLocalDate } from "@/src/feature/calendar/utils";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { getErrorMessage, ROOM_TOAST_MESSAGES, roomApi } from "@/src/lib/api";
import { toast } from "@/src/lib/toast";

export function AddDayButton({ label, position }: { label: string; position: "before" | "after" }) {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const addDayBefore = useCalendarStore((s) => s.addDayBefore);
  const addDayAfter = useCalendarStore((s) => s.addDayAfter);
  const room = useRoomStore((s) => s.room);

  const updateMutation = useMutation({
    mutationFn: (data: { roomId: string; tripStartDate?: string; tripEndDate?: string }) =>
      roomApi.update(data.roomId, data),
    onError: (error) => toast.error(getErrorMessage(error, ROOM_TOAST_MESSAGES.update)),
  });

  const handleClick = () => {
    if (!room || tripDays.length === 0) {
      return;
    }

    if (position === "before") {
      const newStart = new Date(`${tripDays[0].date}T00:00:00`);
      newStart.setDate(newStart.getDate() - 1);
      updateMutation.mutate(
        { roomId: room.id, tripStartDate: formatLocalDate(newStart) },
        { onSuccess: addDayBefore },
      );
    } else {
      const newEnd = new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`);
      newEnd.setDate(newEnd.getDate() + 1);
      updateMutation.mutate(
        { roomId: room.id, tripEndDate: formatLocalDate(newEnd) },
        { onSuccess: addDayAfter },
      );
    }
  };

  return (
    <button
      type="button"
      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-400 rounded-lg border border-transparent hover:!bg-hover transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M6 2.5V9.5M2.5 6H9.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </button>
  );
}
