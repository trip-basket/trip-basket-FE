import { HOUR_HEIGHT, HOURS, MOCK_DAYS } from "../../constants";

export function isInsideRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function getDropPosition(gridRef: HTMLDivElement, clientX: number, clientY: number) {
  const scrollContainer = gridRef.closest(".overflow-auto");
  const containerRect = scrollContainer?.getBoundingClientRect();

  if (containerRect && !isInsideRect(clientX, clientY, containerRect)) {
    return null;
  }

  const gridRect = gridRef.getBoundingClientRect();

  if (!isInsideRect(clientX, clientY, gridRect)) {
    return null;
  }

  const relativeX = clientX - gridRect.left;
  const relativeY = clientY - gridRect.top;
  const columnWidth = gridRect.width / MOCK_DAYS.length;

  const dayIndex = Math.min(Math.floor(relativeX / columnWidth), MOCK_DAYS.length - 1);

  const hour = Math.min(Math.floor(relativeY / HOUR_HEIGHT) + HOURS[0], HOURS[HOURS.length - 1]);

  return { dayIndex, hour };
}
