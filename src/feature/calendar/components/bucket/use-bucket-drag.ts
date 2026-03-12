import { useEffect, useRef } from "react";
import { useBlockDrag } from "../../hooks";
import useCalendarStore from "../../stores/use-calendar-store";
import type { Place } from "../../types";

/**
 * Attaches block-drag behavior to a bucket `place` and synchronizes calendar drag state.
 *
 * When the place is dragged and dropped onto a calendar slot, it will be moved to that day and hour,
 * and the calendar store's "is bucket dragging" flag is set while a drag is active and cleared when it ends.
 *
 * @param place - The bucket item to be dragged; used as the payload when moving to a calendar slot
 * @returns The object returned by `useBlockDrag`, exposing drag state and controls (e.g., `isDragging`, handlers)
 */
export function useBucketDrag(place: Place) {
  const moveToCalendar = useCalendarStore((s) => s.moveToCalendar);
  const setIsBucketDragging = useCalendarStore((s) => s.setIsBucketDragging);
  const wasDraggingRef = useRef(false);

  const result = useBlockDrag((dayIndex, hour) => {
    moveToCalendar(place, dayIndex, hour);
  });

  useEffect(() => {
    if (result.isDragging) {
      setIsBucketDragging(true);
      wasDraggingRef.current = true;
    }

    return () => {
      if (wasDraggingRef.current) {
        setIsBucketDragging(false);
        wasDraggingRef.current = false;
      }
    };
  }, [result.isDragging, setIsBucketDragging]);

  return result;
}
