import { useCallback, useLayoutEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

export function useTimePopoverLayout(
  hoveredDayIndex: number | null,
  setHoveredDayIndex: (index: number | null) => void,
) {
  const [timeStyle, setTimeStyle] = useState<{ top?: number; bottom?: number }>({});
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [dateListRef, { height: dateListH }] = useMeasure();
  const [timeRef, { height: timeH }] = useMeasure();
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const pendingItemCenter = useRef(0);

  const setItemRef = useCallback((index: number, el: HTMLButtonElement | null) => {
    if (el) {
      itemRefs.current.set(index, el);
    } else {
      itemRefs.current.delete(index);
    }
  }, []);

  useLayoutEffect(() => {
    if (hoveredDayIndex === null || dateListH === 0 || timeH === 0) {
      return;
    }

    const itemCenter = pendingItemCenter.current;

    if (timeH >= dateListH) {
      setTimeStyle({ bottom: 0 });
    } else {
      const idealTop = itemCenter - timeH / 2;
      const maxTop = dateListH - timeH;
      setTimeStyle({ top: Math.max(0, Math.min(idealTop, maxTop)) });
    }
  }, [hoveredDayIndex, dateListH, timeH]);

  const handleMouseEnter = (dayIndex: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const item = itemRefs.current.get(dayIndex);
    if (item) {
      const parentEl = item.closest("[data-date-list]");
      if (parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        pendingItemCenter.current = itemRect.top - parentRect.top + itemRect.height / 2;
      }
    }

    setHoveredDayIndex(dayIndex);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredDayIndex(null);
    }, 150);
  };

  const handleTimeHoverEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return {
    dateListRef,
    timeRef,
    timeStyle,
    setItemRef,
    handleMouseEnter,
    handleMouseLeave,
    handleTimeHoverEnter,
  };
}
