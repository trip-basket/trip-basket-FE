import { useBlockDrag } from "../../hooks";
import useCalendarStore from "../../stores/use-calendar-store";
import type { CalendarBlock } from "../../types";

export function useGridBlockDrag(block: CalendarBlock) {
  const { moveInCalendar, setSelectedBlockId } = useCalendarStore();

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
