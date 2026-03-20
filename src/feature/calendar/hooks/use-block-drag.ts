import { useRef, useState } from "react";
import useCalendarStore from "../stores/use-calendar-store";
import { useAutoScroll } from "./use-auto-scroll";
import { getDropPosition } from "./utils";

const DRAG_THRESHOLD = 5;

interface Position {
  x: number;
  y: number;
}

interface PointerState {
  isDown: boolean;
  hasDragged: boolean;
  mouseStart: Position;
  elementStart: Position;
  elementWidth: number;
}

export function useBlockDrag(
  onDrop: (date: string, hour: number) => void,
  duration?: number,
  onClick?: () => void,
) {
  const { gridRef } = useCalendarStore();
  const { updateScroll, stopScroll } = useAutoScroll(gridRef);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragWidth, setDragWidth] = useState(0);
  const stateRef = useRef<PointerState>({
    isDown: false,
    hasDragged: false,
    mouseStart: { x: 0, y: 0 },
    elementStart: { x: 0, y: 0 },
    elementWidth: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    stateRef.current = {
      isDown: true,
      hasDragged: false,
      mouseStart: { x: e.clientX, y: e.clientY },
      elementStart: { x: rect.left, y: rect.top },
      elementWidth: rect.width,
    };
    setPosition({ x: rect.left, y: rect.top });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s.isDown) {
      return;
    }

    const deltaX = e.clientX - s.mouseStart.x;
    const deltaY = e.clientY - s.mouseStart.y;

    if (!s.hasDragged) {
      if (Math.abs(deltaX) + Math.abs(deltaY) < DRAG_THRESHOLD) {
        return;
      }
      s.hasDragged = true;
      setIsDragging(true);
      setDragWidth(s.elementWidth);
    }

    updateScroll(e.clientX, e.clientY);
    setPosition({
      x: s.elementStart.x + deltaX,
      y: s.elementStart.y + deltaY,
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current;

    if (!s.isDown) {
      return;
    }

    if (!s.hasDragged) {
      s.isDown = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      onClick?.();
      return;
    }

    const grabOffsetY = s.mouseStart.y - s.elementStart.y;
    const dropPosition = gridRef
      ? getDropPosition(gridRef, e.clientX, e.clientY, grabOffsetY, duration)
      : null;

    if (!dropPosition) {
      onPointerCancel(e);
      setPosition({ x: s.elementStart.x, y: s.elementStart.y });
      return;
    }

    onDrop(dropPosition.date, dropPosition.hour);

    setIsDragging(false);
    s.isDown = false;
    s.hasDragged = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    stopScroll();
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    stateRef.current.isDown = false;
    stateRef.current.hasDragged = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    stopScroll();
  };

  return {
    isDragging,
    position,
    dragWidth,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
