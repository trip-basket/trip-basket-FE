import { HOUR_HEIGHT, HOURS } from "../constants";
import useCalendarStore from "../stores/use-calendar-store";
import { DEFAULT_BLOCK_DURATION } from "../types";

/**
 * Determine whether a point (x, y) lies within a DOMRect, including its edges.
 *
 * @param x - The horizontal coordinate in the same coordinate space as `rect`
 * @param y - The vertical coordinate in the same coordinate space as `rect`
 * @param rect - The rectangle to test against
 * @returns `true` if the point is inside `rect` or on its boundary, `false` otherwise
 */
function isInsideRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

/**
 * Determine whether the given client coordinates fall inside the droppable grid area and, if so, return the grid's bounding rect.
 *
 * @param gridRef - The grid element to test against
 * @param clientX - The horizontal client coordinate of the point
 * @param clientY - The vertical client coordinate of the point
 * @returns The grid element's DOMRect when the point is within both the scroll container (if present) and the grid, `null` otherwise
 */
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

/**
 * Map a horizontal offset within the grid to a zero-based day column index.
 *
 * @param relativeX - Horizontal offset in pixels measured from the grid's left edge
 * @param dayCount - Number of day columns in the grid
 * @param gridWidth - Total width of the grid in pixels
 * @returns Zero-based day index corresponding to `relativeX`, clamped to the range [0, dayCount - 1]
 */
function getDayIndex(relativeX: number, dayCount: number, gridWidth: number): number {
  const colWidth = gridWidth / dayCount;
  return Math.min(Math.floor(relativeX / colWidth), dayCount - 1);
}

/**
 * Compute the starting hour for a block given a vertical pixel offset within the day grid.
 *
 * @param relativeY - Vertical offset in pixels from the top of the grid
 * @param duration - Block duration in hours; used to ensure the returned start hour allows the block to fit
 * @returns The starting hour (integer) rounded from `relativeY` and clamped so the block fits within the grid hours
 */
function getHour(relativeY: number, duration: number): number {
  const gridStartHour = HOURS[0];
  const gridEndHour = HOURS[HOURS.length - 1];
  const rawHour = Math.round(relativeY / HOUR_HEIGHT) + gridStartHour;
  return Math.max(gridStartHour, Math.min(rawHour, gridEndHour - duration));
}

/**
 * Compute the drop position (day index and start hour) inside the calendar grid for given viewport coordinates.
 *
 * @param gridRef - The calendar grid element used for hit-testing.
 * @param clientX - The pointer's horizontal viewport coordinate.
 * @param clientY - The pointer's vertical viewport coordinate.
 * @param grabOffsetY - Vertical offset from the pointer to the top of the dragged block (defaults to 0).
 * @param duration - Block duration in hours used to constrain the start hour (defaults to DEFAULT_BLOCK_DURATION).
 * @returns An object with `dayIndex` (0-based index of the target day) and `hour` (start hour), or `null` if the coordinates are outside a droppable grid or there are no trip days.
 */

export function getDropPosition(
  gridRef: HTMLDivElement,
  clientX: number,
  clientY: number,
  grabOffsetY = 0,
  duration = DEFAULT_BLOCK_DURATION,
) {
  const tripDays = useCalendarStore.getState().tripDays;

  if (tripDays.length === 0) {
    return null;
  }

  const gridRect = getGridRectIfDroppable(gridRef, clientX, clientY);

  if (!gridRect) {
    return null;
  }

  const relativeX = clientX - gridRect.left;
  const relativeY = clientY - gridRect.top - grabOffsetY;

  return {
    dayIndex: getDayIndex(relativeX, tripDays.length, gridRect.width),
    hour: getHour(relativeY, duration),
  };
}
