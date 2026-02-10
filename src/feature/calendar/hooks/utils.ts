import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../constants";
import useCalendarBlockStore from "../stores/use-calendar-block-store";

export function isInsideRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// TODO: 높이가 긴 일정을 옮길 때 화면을 넘쳐

export function getDropPosition(
  gridRef: HTMLDivElement,
  clientX: number,
  clientY: number,
  grabOffsetY = 0,
) {
  const days = useCalendarBlockStore.getState().days;

  if (days.length === 0) {
    return null;
  }

  const scrollContainer = gridRef.closest(".overflow-auto");
  const containerRect = scrollContainer?.getBoundingClientRect(); // 캘린더 자체 뷰포트를 넘어가면 드롭 불가

  if (containerRect && !isInsideRect(clientX, clientY, containerRect)) {
    return null;
  }

  const gridRect = gridRef.getBoundingClientRect(); // gridRect.left 는 요소 자체의 절대적 위치 기준

  if (!isInsideRect(clientX, clientY, gridRect)) {
    return null;
  }

  const relativeX = clientX - gridRect.left;
  const relativeY = clientY - gridRect.top - grabOffsetY;

  const dayIndex = Math.min(Math.floor(relativeX / DAY_COL_MIN_W), days.length - 1);

  const hour = Math.min(Math.floor(relativeY / HOUR_HEIGHT) + HOURS[0], HOURS[HOURS.length - 1]);

  return { dayIndex, hour };
}
