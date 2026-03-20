import { useBlockDrag } from "../../../hooks";
import useCalendarStore from "../../../stores/use-calendar-store";
import type { ScheduledBlock } from "../../../types";

export function useGridBlockDrag(block: ScheduledBlock) {
  const moveInCalendar = useCalendarStore((s) => s.moveInCalendar);
  const setSelectedBlockId = useCalendarStore((s) => s.setSelectedBlockId);

  const duration = block.endHour - block.startHour;

  return useBlockDrag(
    (date, hour) => {
      moveInCalendar(block.id, date, hour);
    },
    duration,
    () => {
      setSelectedBlockId(block.id);
    },
  );
}
