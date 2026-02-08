import { useEffect, useState } from "react";
import { HOUR_HEIGHT, HOURS } from "../../constants";
import type { CalendarBlock } from "../../types";

const snapToHalfHour = (hour: number) => Math.round(hour * 2) / 2;

interface UseGridBlockResizeParams {
  block: CalendarBlock;
  top: number;
  height: number;
  onResize: (startHour: number, endHour: number) => void;
}

export function useGridBlockResize({ block, top, height, onResize }: UseGridBlockResizeParams) {
  const gridStartHour = HOURS[0];

  const [resizeHandle, setResizeHandle] = useState<"top" | "bottom" | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const [startY, setStartY] = useState(0);
  const [currentTop, setCurrentTop] = useState(top);
  const [currentHeight, setCurrentHeight] = useState(height);

  useEffect(() => {
    setCurrentTop(top);
    setCurrentHeight(height);
  }, [top, height]);

  const onPointerDown = (handle: "top" | "bottom") => (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setResizeHandle(handle);
    setStartY(e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsResizing(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizing) {
      return;
    }

    const deltaY = e.clientY - startY;
    const deltaHour = deltaY / HOUR_HEIGHT;

    if (resizeHandle === "top") {
      const newStartHour = snapToHalfHour(block.startHour + deltaHour);
      const snappedTop = (newStartHour - gridStartHour) * HOUR_HEIGHT;
      const snappedHeight = (block.endHour - newStartHour) * HOUR_HEIGHT;
      setCurrentTop(snappedTop);
      setCurrentHeight(snappedHeight);
      return;
    }

    const newEndHour = snapToHalfHour(block.endHour + deltaHour);
    const snappedHeight = (newEndHour - block.startHour) * HOUR_HEIGHT;
    setCurrentHeight(snappedHeight);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newStartHour = currentTop / HOUR_HEIGHT + gridStartHour;
    const newEndHour = newStartHour + currentHeight / HOUR_HEIGHT;

    if (newEndHour <= newStartHour) {
      setCurrentTop(top);
      setCurrentHeight(height);
      e.currentTarget.releasePointerCapture(e.pointerId);

      setIsResizing(false);
      return;
    }

    onResize(newStartHour, newEndHour);

    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsResizing(false);
  };

  return {
    currentTop,
    currentHeight,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
}
