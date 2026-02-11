import { useCallback, useEffect, useRef } from "react";
import {
  DAY_HEADER_H,
  HOTZONE_SIZE,
  SCROLL_SPEED_X,
  SCROLL_SPEED_Y,
  TIME_COL_W,
} from "../constants";

type ScrollDirection = -1 | 0 | 1;

interface Direction {
  left: ScrollDirection;
  top: ScrollDirection;
}

function getDirection(x: number, y: number, width: number, height: number): Direction {
  const left: ScrollDirection =
    x < TIME_COL_W + HOTZONE_SIZE ? -1 : x > width - HOTZONE_SIZE ? 1 : 0;
  const top: ScrollDirection =
    y < DAY_HEADER_H + HOTZONE_SIZE ? -1 : y > height - HOTZONE_SIZE ? 1 : 0;
  return { left, top };
}

function isInsideViewport(x: number, y: number, width: number, height: number): boolean {
  return x > 0 && y > 0 && x < width && y < height;
}

export function useAutoScroll(gridRef: HTMLDivElement | null) {
  const rafId = useRef<number | null>(null);
  const scrollState = useRef<{
    viewport: Element | null;
    direction: Direction;
  }>({
    viewport: null,
    direction: { left: 0, top: 0 },
  });

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollLoop = useCallback(() => {
    if (!scrollState.current.viewport) {
      return;
    }

    const { left, top } = scrollState.current.direction;
    scrollState.current.viewport.scrollBy({
      left: SCROLL_SPEED_X * left,
      top: SCROLL_SPEED_Y * top,
    });

    rafId.current = requestAnimationFrame(() => {
      scrollLoop();
    });
  }, []);

  const startLoop = useCallback(() => {
    if (!rafId.current) {
      scrollLoop();
    }
  }, [scrollLoop]);

  const stopScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const updateScroll = useCallback(
    (clientX: number, clientY: number) => {
      if (!gridRef) {
        return;
      }

      const viewport = gridRef.closest(".overflow-auto");
      if (!viewport) {
        return;
      }

      scrollState.current.viewport = viewport;
      const rect = viewport.getBoundingClientRect();

      const x = clientX - rect.x;
      const y = clientY - rect.y;

      if (!isInsideViewport(x, y, rect.width, rect.height)) {
        // 뷰포트 밖 — 마지막 방향으로 스크롤 유지
        return;
      }

      const direction = getDirection(x, y, rect.width, rect.height);
      scrollState.current.direction = direction;

      if (direction.left === 0 && direction.top === 0) {
        stopScroll();
      } else {
        startLoop();
      }
    },
    [gridRef, startLoop, stopScroll],
  );

  return { updateScroll, stopScroll };
}
