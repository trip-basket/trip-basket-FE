import { useBlockDrag } from "../../hooks";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import type { CalendarBlock } from "../../types";

export function useGridBlockDrag(block: CalendarBlock) {
  const { moveInCalendar } = useCalendarBlockStore();

  return useBlockDrag((dayIndex, hour) => {
    moveInCalendar(block.id, dayIndex, hour);
  });
}
