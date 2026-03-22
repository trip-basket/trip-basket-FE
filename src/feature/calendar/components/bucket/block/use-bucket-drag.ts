import { useEffect, useRef } from "react";
import { useBlockDrag } from "../../../hooks";
import useCalendarStore from "../../../stores/use-calendar-store";
import type { BucketBlock } from "../../../types";

export function useBucketDrag(block: BucketBlock) {
  const moveToCalendar = useCalendarStore((s) => s.moveToCalendar);
  const setIsBucketDragging = useCalendarStore((s) => s.setIsBucketDragging);
  const wasDraggingRef = useRef(false);

  const result = useBlockDrag((date, hour) => {
    moveToCalendar(block, date, hour);
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
