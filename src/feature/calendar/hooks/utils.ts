import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../constants";
import useCalendarBlockStore from "../stores/use-calendar-block-store";
import { DEFAULT_BLOCK_DURATION } from "../types";

function isInsideRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function getGridRectIfDroppable(
  gridRef: HTMLDivElement,
  clientX: number,
  clientY: number,
): DOMRect | null {
  const scrollContainer = gridRef.closest(".overflow-auto");
  const containerRect = scrollContainer?.getBoundingClientRect();

  if (containerRect && !isInsideRect(clientX, clientY, containerRect)) {
    return null;
  }

  const gridRect = gridRef.getBoundingClientRect();

  if (!isInsideRect(clientX, clientY, gridRect)) {
    return null;
  }

  return gridRect;
}

function getDayIndex(relativeX: number, dayCount: number): number {
  return Math.min(Math.floor(relativeX / DAY_COL_MIN_W), dayCount - 1);
}

function getHour(relativeY: number, duration: number): number {
  const gridStartHour = HOURS[0];
  const gridEndHour = HOURS[HOURS.length - 1];
  const rawHour = Math.round(relativeY / HOUR_HEIGHT) + gridStartHour;
  return Math.max(gridStartHour, Math.min(rawHour, gridEndHour - duration));
}

// TODO: 높이가 긴 일정을 옮길 때 화면을 넘치는 문제

export function getDropPosition(
  gridRef: HTMLDivElement,
  clientX: number,
  clientY: number,
  grabOffsetY = 0,
  duration = DEFAULT_BLOCK_DURATION,
) {
  const days = useCalendarBlockStore.getState().days;

  if (days.length === 0) {
    return null;
  }

  const gridRect = getGridRectIfDroppable(gridRef, clientX, clientY);

  if (!gridRect) {
    return null;
  }

  const relativeX = clientX - gridRect.left;
  const relativeY = clientY - gridRect.top - grabOffsetY;

  return {
    dayIndex: getDayIndex(relativeX, days.length),
    hour: getHour(relativeY, duration),
  };
}
