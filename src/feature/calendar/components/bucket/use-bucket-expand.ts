import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { BUCKET_BLOCK_HEIGHT, DAY_COL_MIN_W } from "../../constants";
import useCalendarStore from "../../stores/use-calendar-store";

const GAP = 8;
const PADDING = 8;
export const TITLE_BAR_HEIGHT = 44;
export const BUCKET_INSET = 8;
const EMPTY_HEIGHT = TITLE_BAR_HEIGHT + PADDING + BUCKET_BLOCK_HEIGHT + PADDING;

function calcColsPerRow(containerWidth: number): number {
  const availableWidth = containerWidth - PADDING * 2;
  return Math.max(1, Math.floor((availableWidth + GAP) / (DAY_COL_MIN_W + GAP)));
}

/**
 * Compute the vertical height (in pixels) required to render the bucket when expanded based on available container width and number of blocks.
 *
 * @param containerWidth - The measured width of the container in pixels.
 * @param blockCount - The number of bucket blocks to lay out.
 * @returns The total height in pixels needed to display the title bar, paddings, block rows, and inter-row gaps.
 */
function calcExpandedHeight(containerWidth: number, blockCount: number): number {
  if (blockCount === 0) {
    return EMPTY_HEIGHT;
  }
  const colsPerRow = calcColsPerRow(containerWidth);
  const rows = Math.ceil(blockCount / colsPerRow);
  return TITLE_BAR_HEIGHT + PADDING + rows * BUCKET_BLOCK_HEIGHT + (rows - 1) * GAP + PADDING;
}

/**
 * Manages expansion state, measurement, and interaction handlers for a calendar bucket UI.
 *
 * @returns An object with:
 * - `isExpanded` — `true` when the bucket should be visually expanded (pinned or hovered) and not being dragged.
 * - `isPinned` — `true` when the bucket is pinned open.
 * - `togglePin` — toggles the pinned state.
 * - `expandedHeight` — computed height (in pixels) the bucket should use when expanded.
 * - `colsPerRow` — number of item columns that fit per row given the measured container width.
 * - `measureRef` — ref to attach to the container element used for measuring width.
 * - `onMouseEnter` — handler to mark the bucket as hovered.
 * - `onMouseLeave` — handler to clear the hovered state.
 */
export function useBucketExpand() {
  const blockCount = useCalendarStore((s) => s.bucketBlocks.length);
  const isBucketDragging = useCalendarStore((s) => s.isBucketDragging);

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = (isPinned || isHovered) && !isBucketDragging;

  const [measureRef, { width: containerWidth }] = useMeasure();

  useEffect(() => {
    if (!isBucketDragging) {
      setIsHovered(false);
    }
  }, [isBucketDragging]);

  return {
    isExpanded,
    isPinned,
    togglePin: () => setIsPinned((prev) => !prev),
    expandedHeight: calcExpandedHeight(containerWidth, blockCount),
    colsPerRow: calcColsPerRow(containerWidth),
    measureRef,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
}
