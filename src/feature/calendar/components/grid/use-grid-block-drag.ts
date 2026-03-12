import { useBlockDrag } from "../../hooks";
import useCalendarStore from "../../stores/use-calendar-store";
import type { CalendarBlock } from "../../types";

/**
 * Provides drag behavior for a calendar block so it can be moved within the calendar grid and marked as selected.
 *
 * @param block - The calendar block to enable dragging for; its start and end hours determine the drag duration.
 * @returns The hook result from `useBlockDrag`: drag handlers/state configured to move `block` in the calendar and set it as the selected block.
 */
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
