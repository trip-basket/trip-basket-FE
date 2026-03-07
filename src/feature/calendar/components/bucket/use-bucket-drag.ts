import { useEffect } from "react";
import { useBlockDrag } from "../../hooks";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import type { Place } from "../../types";

export function useBucketDrag(place: Place) {
  const moveToCalendar = useCalendarBlockStore((s) => s.moveToCalendar);
  const setIsBucketDragging = useCalendarBlockStore((s) => s.setIsBucketDragging);

  const result = useBlockDrag((dayIndex, hour) => {
    moveToCalendar(place, dayIndex, hour);
  });

  useEffect(() => {
    if (result.isDragging) {
      setIsBucketDragging(true);
    }
    return () => {
      setIsBucketDragging(false);
    };
  }, [result.isDragging, setIsBucketDragging]);

  return result;
}
