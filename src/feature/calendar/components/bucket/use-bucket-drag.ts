import { useBlockDrag } from "../../hooks";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import type { Place } from "../../types";

export function useBucketDrag(place: Place) {
  const { moveToCalendar } = useCalendarBlockStore();

  return useBlockDrag((dayIndex, hour) => {
    moveToCalendar(place, dayIndex, hour);
  });
}
