import { useEffect, useRef } from "react";
import { useBlockDrag } from "../../hooks";
import useBlockStore from "../../stores/use-block-store";
import type { Place } from "../../types";

export function useBucketDrag(place: Place) {
  const moveToCalendar = useBlockStore((s) => s.moveToCalendar);
  const setIsBucketDragging = useBlockStore((s) => s.setIsBucketDragging);
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
