import type { ScheduledBlock } from "../../types";
import { getBlockColor, getBlockShadow, type OverlapLayout } from "../../utils";
import { GridBlockContent } from "./grid-block-content";
import { useGridBlockResize } from "./use-grid-block-resize";

export interface GridDraggableBlockProps {
  block: ScheduledBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  dragWidth: number;
  dragHandlers: React.ComponentProps<"div">;
  overlapLayout?: OverlapLayout;
}

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
  const blockColor = getBlockColor(block.color);
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
