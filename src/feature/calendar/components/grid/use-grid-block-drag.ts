import { useBlockDrag } from "../../hooks";
import useBlockStore from "../../stores/use-block-store";
import type { CalendarBlock } from "../../types";

export function useGridBlockDrag(block: CalendarBlock) {
  const { moveInCalendar, setSelectedBlockId } = useBlockStore();

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
