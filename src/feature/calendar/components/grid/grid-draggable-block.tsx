import type { CalendarBlock } from "../../types";
import { getBlockColor, getBlockShadow, type OverlapLayout } from "../../utils";
import { GridBlockContent } from "./grid-block-content";
import { useGridBlockResize } from "./use-grid-block-resize";

export interface GridDraggableBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  dragWidth: number;
  dragHandlers: React.ComponentProps<"div">;
  overlapLayout?: OverlapLayout;
}

/**
 * Render a calendar grid block that supports pointer-based vertical resizing and drag positioning.
 *
 * @param block - Calendar block data to display.
 * @param top - Initial top offset (in pixels) for the block when not dragging.
 * @param height - Initial height (in pixels) for the block when not dragging.
 * @param position - Current drag position `{ x, y }`; used to position the block while dragging.
 * @param dragWidth - Width (in pixels) to apply to the block while it is being dragged.
 * @param dragHandlers - DOM event handlers to enable dragging on the block container.
 * @param overlapLayout - Optional layout hints for overlapping blocks (e.g., `rightInset` and `zIndex`).
 * @returns A JSX element representing the draggable, resizable calendar block.
 */
export function GridDraggableBlock({
  block,
  top,
  height,
  isDragging,
  position,
  dragWidth,
  dragHandlers,
  overlapLayout,
}: GridDraggableBlockProps) {
  const {
    currentTop,
    currentHeight,
    handlers: resizeHandlers,
  } = useGridBlockResize({
    block,
    top,
    height,
  });

  const resizeHandleHeight = 6;
  const resizeHandleInset = 4;
  const blockColor = getBlockColor(block.colorIndex);
  const isLocked = !!block.lockedBy;

  return (
    <div
      className="cursor-pointer touch-none rounded-xl transition-shadow overflow-hidden"
      style={{
        position: isDragging ? "fixed" : "absolute",
        top: isDragging ? position.y : currentTop,
        left: isDragging ? position.x : 0,
        right: isDragging ? undefined : (overlapLayout?.rightInset ?? 0),
        width: isDragging ? dragWidth : undefined,
        height: currentHeight,
        zIndex: isDragging ? 9999 : (overlapLayout?.zIndex ?? undefined),
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
        opacity: isLocked ? 0.55 : 1,
        backgroundColor: blockColor.base,
        boxShadow: getBlockShadow(isDragging, blockColor),
      }}
      {...dragHandlers}
    >
      {/* 상단 리사이저 */}
      <div
        className="absolute z-10 cursor-ns-resize rounded-full left-2 right-2"
        style={{
          top: resizeHandleInset,
          height: resizeHandleHeight,
          backgroundColor: blockColor.tint,
        }}
        onPointerDown={resizeHandlers.onPointerDown("top")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
      <GridBlockContent
        block={block}
        blockColor={blockColor}
        resizeHandleOffset={resizeHandleHeight + resizeHandleInset}
      />
      {/* 하단 리사이저 */}
      <div
        className="absolute z-10 cursor-ns-resize rounded-full left-2 right-2"
        style={{
          bottom: resizeHandleInset,
          height: resizeHandleHeight,
          backgroundColor: blockColor.tint,
        }}
        onPointerDown={resizeHandlers.onPointerDown("bottom")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
    </div>
  );
}
