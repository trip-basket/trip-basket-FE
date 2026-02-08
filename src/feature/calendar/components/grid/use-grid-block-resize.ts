import { useEffect, useState } from "react";
import { HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import type { CalendarBlock } from "../../types";

const snapToHalfHour = (hour: number) => Math.round(hour * 2) / 2;

interface UseGridBlockResizeParams {
  block: CalendarBlock;
  top: number;
  height: number;
}

export function useGridBlockResize({ block, top, height }: UseGridBlockResizeParams) {
  const gridStartHour = HOURS[0];
  const gridEndHour = HOURS[HOURS.length - 1];
  const { resizeBlock } = useCalendarBlockStore();

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
      const newStartHour = Math.max(
        gridStartHour,
        Math.min(block.endHour - 0.5, snapToHalfHour(block.startHour + deltaHour)),
      );
      const snappedTop = (newStartHour - gridStartHour) * HOUR_HEIGHT;
      const snappedHeight = (block.endHour - newStartHour) * HOUR_HEIGHT;
      setCurrentTop(snappedTop);
      setCurrentHeight(snappedHeight);
      return;
    }

    const newEndHour = Math.max(
      block.startHour + 0.5,
      Math.min(gridEndHour, snapToHalfHour(block.endHour + deltaHour)),
    );
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

    resizeBlock(block.id, newStartHour, newEndHour);

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
