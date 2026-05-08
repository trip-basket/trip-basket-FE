import { useState } from "react";
import { HOUR_HEIGHT, HOURS } from "../../../constants";
import useCalendarStore from "../../../stores/use-calendar-store";
import type { ScheduledBlock } from "../../../types";

const snapToHalfHour = (hour: number) => Math.round(hour * 2) / 2;

interface UseGridBlockResizeParams {
  block: ScheduledBlock;
  top: number;
  height: number;
}

export function useGridBlockResize({ block, top, height }: UseGridBlockResizeParams) {
  const gridStartHour = HOURS[0];
  const gridEndHour = HOURS[HOURS.length - 1];
  const resizeBlock = useCalendarStore((s) => s.resizeBlock);

  const setIsBlockResizing = useCalendarStore((s) => s.setIsBlockResizing);

  const [resizeHandle, setResizeHandle] = useState<"top" | "bottom" | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const [startY, setStartY] = useState(0);
  const [resizeTop, setResizeTop] = useState(0);
  const [resizeHeight, setResizeHeight] = useState(0);

  const onPointerDown = (handle: "top" | "bottom") => (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setResizeHandle(handle);
    setStartY(e.clientY);
    setResizeTop(top);
    setResizeHeight(height);
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsResizing(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizing) {
      return;
    }

    setIsBlockResizing(true);

    const deltaY = e.clientY - startY;
    const deltaHour = deltaY / HOUR_HEIGHT;

    if (resizeHandle === "top") {
      const newStartHour = Math.max(
        gridStartHour,
        Math.min(block.endHour - 0.5, snapToHalfHour(block.startHour + deltaHour)),
      );
      setResizeTop((newStartHour - gridStartHour) * HOUR_HEIGHT);
      setResizeHeight((block.endHour - newStartHour) * HOUR_HEIGHT);
      return;
    }

    const newEndHour = Math.max(
      block.startHour + 0.5,
      Math.min(gridEndHour, snapToHalfHour(block.endHour + deltaHour)),
    );
    setResizeHeight((newEndHour - block.startHour) * HOUR_HEIGHT);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newStartHour = resizeTop / HOUR_HEIGHT + gridStartHour;
    const newEndHour = newStartHour + resizeHeight / HOUR_HEIGHT;

    if (newEndHour > newStartHour) {
      resizeBlock(block.id, newStartHour, newEndHour);
    }

    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsResizing(false);
    setIsBlockResizing(false);
  };

  return {
    currentTop: isResizing ? resizeTop : top,
    currentHeight: isResizing ? resizeHeight : height,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
}
