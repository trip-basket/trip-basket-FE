import { useCallback, useRef, useState } from "react";
import useCalendarBlockStore from "../stores/use-calendar-block-store";
import { getDropPosition } from "./utils";

interface Position {
  x: number;
  y: number;
}

// TOOD
// - 범위 상수 명확하게 변경
// - 대각 스크롤

export function useBlockDrag(onDrop: (dayIndex: number, hour: number) => void, duration?: number) {
  const { gridRef } = useCalendarBlockStore();

  const [isDragging, setIsDragging] = useState(false);
  const [elementStart, setElementStart] = useState<Position>({ x: 0, y: 0 });
  const [mouseStart, setMouseStart] = useState<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const rafId = useRef<number | null>(null);
  const isHotzoneScroll = useRef<{
    calendarViewportRef: Element | null;
    direction: "left" | "right" | "top" | "bottom" | null;
  }>({
    calendarViewportRef: null,
    direction: null,
  });

  const scrollLoop = useCallback(() => {
    if (!isHotzoneScroll.current.calendarViewportRef) {
      return;
    }

    isHotzoneScroll.current.calendarViewportRef.scrollBy({
      left:
        isHotzoneScroll.current.direction === "left"
          ? -20
          : isHotzoneScroll.current.direction === "right"
            ? 20
            : 0,
      top:
        isHotzoneScroll.current.direction === "top"
          ? -20
          : isHotzoneScroll.current.direction === "bottom"
            ? 20
            : 0,
    });

    rafId.current = requestAnimationFrame(() => {
      scrollLoop();
    });
  }, []);

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

    if (gridRef) {
      const calendarViewportRef = gridRef.closest(".overflow-auto");
      if (calendarViewportRef) {
        isHotzoneScroll.current.calendarViewportRef = calendarViewportRef;
        const calendarViewportRect = calendarViewportRef.getBoundingClientRect();

        // scrollable 캘린더 내부에서의 상대 좌표
        const x = e.clientX - calendarViewportRect.x;
        const y = e.clientY - calendarViewportRect.y;

        // x, y 좌표가 캘린더 안에 있는지 검사
        if (x > 0 && y > 0 && x < calendarViewportRect.width && y < calendarViewportRect.height) {
          let scrollable = false;
          // 왼쪽
          if (x < 100) {
            isHotzoneScroll.current.direction = "left";
            scrollable = true;
          }

          // 오른쪽
          if (x > calendarViewportRect.width - 100) {
            isHotzoneScroll.current.direction = "right";
            scrollable = true;
          }

          // 아래쪽
          if (y > calendarViewportRect.height - 100) {
            isHotzoneScroll.current.direction = "bottom";
            scrollable = true;
          }

          // 위쪽
          if (y < 100) {
            isHotzoneScroll.current.direction = "top";
            scrollable = true;
          }

          if (!scrollable) {
            isHotzoneScroll.current.direction = null;
          } else if (!rafId.current) {
            scrollLoop();
          }
        }
      }
    }

    setPosition({
      x: elementStart.x + deltaX,
      y: elementStart.y + deltaY,
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const grabOffsetY = mouseStart.y - elementStart.y;
    const dropPosition = gridRef
      ? getDropPosition(gridRef, e.clientX, e.clientY, grabOffsetY, duration)
      : null;

    if (!dropPosition) {
      onPointerCancel(e);
      setPosition({ x: elementStart.x, y: elementStart.y });
      return;
    }

    onDrop(dropPosition.dayIndex, dropPosition.hour);

    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
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
