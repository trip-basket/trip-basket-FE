import { useState } from "react";
import useCalendarBlockStore from "../stores/use-calendar-block-store";
import { getDropPosition } from "./utils";

interface Position {
  x: number;
  y: number;
}

export function useBlockDrag(onDrop: (dayIndex: number, hour: number) => void) {
  const { gridRef } = useCalendarBlockStore();

  const [isDragging, setIsDragging] = useState(false);
  const [elementStart, setElementStart] = useState<Position>({ x: 0, y: 0 });
  const [mouseStart, setMouseStart] = useState<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    setElementStart({ x: rect.left, y: rect.top });
    setMouseStart({ x: e.clientX, y: e.clientY });
    setPosition({ x: rect.left, y: rect.top });

    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const deltaX = e.clientX - mouseStart.x;
    const deltaY = e.clientY - mouseStart.y;

    setPosition({
      x: elementStart.x + deltaX,
      y: elementStart.y + deltaY,
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const dropPosition = gridRef ? getDropPosition(gridRef, e.clientX, e.clientY) : null;

    if (!dropPosition) {
      onPointerCancel(e);
      setPosition({ x: elementStart.x, y: elementStart.y });
      return;
    }

    onDrop(dropPosition.dayIndex, dropPosition.hour);

    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return {
    isDragging,
    position,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
