import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { BUCKET_BLOCK_HEIGHT, DAY_COL_MIN_W } from "../../constants";
import useCalendarStore from "../../stores/use-calendar-store";
import { SIDEBAR_MIN_WIDTH } from "./bucket-sidebar";

const GAP = 8;
const PADDING = 8;
const CONTENT_GAP = 8;
const GRID_PADDING = 8;
const SIDEBAR_ITEM_HEIGHT = 32;
const SIDEBAR_Y_PADDING = 8;
export const TITLE_BAR_HEIGHT = 44;
export const BUCKET_INSET = 8;

function calcGridLayout(containerWidth: number, blockCount: number) {
  const contentWidth = containerWidth - PADDING * 2;
  const gridMaxWidth = contentWidth - SIDEBAR_MIN_WIDTH - CONTENT_GAP;
  const maxCols = Math.max(1, Math.floor((gridMaxWidth + GAP) / (DAY_COL_MIN_W + GAP)));
  const cols = blockCount > 0 ? Math.min(maxCols, blockCount) : maxCols;
  const gridContentWidth = cols * DAY_COL_MIN_W + Math.max(0, cols - 1) * GAP;
  const gridAreaWidth = gridContentWidth + GRID_PADDING * 2;
  return { cols, gridAreaWidth };
}

function calcSidebarContentHeight(sidebarItemCount: number): number {
  return SIDEBAR_Y_PADDING * 2 + sidebarItemCount * SIDEBAR_ITEM_HEIGHT;
}

function calcExpandedHeight(
  containerWidth: number,
  blockCount: number,
  sidebarItemCount: number,
): number {
  const sidebarHeight = calcSidebarContentHeight(sidebarItemCount);

  if (blockCount === 0) {
    const emptyGridHeight = BUCKET_BLOCK_HEIGHT;
    return TITLE_BAR_HEIGHT + PADDING + Math.max(emptyGridHeight, sidebarHeight) + PADDING;
  }

  const { cols } = calcGridLayout(containerWidth, blockCount);
  const rows = Math.ceil(blockCount / cols);
  const gridHeight = rows * BUCKET_BLOCK_HEIGHT + (rows - 1) * GAP;

  return TITLE_BAR_HEIGHT + PADDING + Math.max(gridHeight, sidebarHeight) + PADDING;
}

export function useBucketExpand(sidebarItemCount: number, filteredBlockCount: number) {
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

  const { gridAreaWidth } = calcGridLayout(containerWidth, filteredBlockCount);

  return {
    isExpanded,
    isPinned,
    togglePin: () => setIsPinned((prev) => !prev),
    expandedHeight: calcExpandedHeight(containerWidth, filteredBlockCount, sidebarItemCount),
    gridAreaWidth,
    measureRef,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
}
