import { useBlockDrag } from "../../hooks";
import useCalendarStore from "../../stores/use-calendar-store";
import type { CalendarBlock } from "../../types";

export function useGridBlockDrag(block: CalendarBlock) {
  const moveInCalendar = useCalendarStore((s) => s.moveInCalendar);
  const setSelectedBlockId = useCalendarStore((s) => s.setSelectedBlockId);

  const duration = block.endHour - block.startHour;

  return useBlockDrag(
    (dayIndex, hour) => {
      moveInCalendar(block.id, dayIndex, hour);
    },
    duration,
    () => {
      setSelectedBlockId(block.id);
    },
  );
}
