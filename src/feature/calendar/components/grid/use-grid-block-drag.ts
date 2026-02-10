import { useBlockDrag } from "../../hooks";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import type { CalendarBlock } from "../../types";

export function useGridBlockDrag(block: CalendarBlock) {
  const { moveInCalendar } = useCalendarBlockStore();

  const duration = block.endHour - block.startHour;

  return useBlockDrag((dayIndex, hour) => {
    moveInCalendar(block.id, dayIndex, hour);
  }, duration);
}
