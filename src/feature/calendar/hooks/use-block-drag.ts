import { useCallback, useRef, useState } from "react";
import { DAY_HEADER_H, HOTZONE_SIZE, SCROLL_SPEED_X, SCROLL_SPEED_Y, TIME_COL_W } from "../constants";
import useCalendarBlockStore from "../stores/use-calendar-block-store";
import { getDropPosition } from "./utils";

interface Position {
  x: number;
  y: number;
}

type ScrollDirection = -1 | 0 | 1;

export function useBlockDrag(onDrop: (dayIndex: number, hour: number) => void, duration?: number) {
  const { gridRef } = useCalendarBlockStore();

  const [isDragging, setIsDragging] = useState(false);
  const [elementStart, setElementStart] = useState<Position>({ x: 0, y: 0 });
  const [mouseStart, setMouseStart] = useState<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const rafId = useRef<number | null>(null);
  const isHotzoneScroll = useRef<{
    calendarViewportRef: Element | null;
    direction: { left: ScrollDirection; top: ScrollDirection };
  }>({
    calendarViewportRef: null,
    direction: { left: 0, top: 0 },
  });

  const scrollLoop = useCallback(() => {
    if (!isHotzoneScroll.current.calendarViewportRef) {
      return;
    }

    const { left, top } = isHotzoneScroll.current.direction;
    isHotzoneScroll.current.calendarViewportRef.scrollBy({
      left: SCROLL_SPEED_X * left,
      top: SCROLL_SPEED_Y * top,
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
          const left: ScrollDirection = x < TIME_COL_W + HOTZONE_SIZE ? -1 : x > calendarViewportRect.width - HOTZONE_SIZE ? 1 : 0;
          const top: ScrollDirection = y < DAY_HEADER_H + HOTZONE_SIZE ? -1 : y > calendarViewportRect.height - HOTZONE_SIZE ? 1 : 0;

          isHotzoneScroll.current.direction = { left, top };

          if (left === 0 && top === 0) {
            // hot zone 밖 — 루프 정지
            if (rafId.current) {
              cancelAnimationFrame(rafId.current);
              rafId.current = null;
            }
          } else if (!rafId.current) {
            scrollLoop();
          }
        } else {
          // 뷰포트 밖 — 마지막 방향으로 스크롤 유지
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
