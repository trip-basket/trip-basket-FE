import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W } from "../../constants";
import type { CalendarBlock } from "../../types";
import { formatBlockTime } from "../../utils";
import { useGridBlockResize } from "./use-grid-block-resize";

export interface GridDraggableBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  dragHandlers: React.ComponentProps<"div">;
}

export function GridDraggableBlock({
  block,
  top,
  height,
  isDragging,
  position,
  dragHandlers,
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

  const resizeHandleHeight = 10;

  return (
    <div
      className="cursor-pointer touch-none rounded-md rounded-tr-none bg-canvas shadow-sm transition-shadow hover:shadow-md"
      style={{
        position: isDragging ? "fixed" : "absolute",
        inset: isDragging ? undefined : "0",
        top: isDragging ? position.y : currentTop,
        left: isDragging ? position.x : undefined,
        width: DAY_COL_MIN_W,
        height: currentHeight,
        zIndex: isDragging ? 9999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
      }}
      {...dragHandlers}
    >
      <div
        className="absolute inset-x-0 top-0 cursor-ns-resize bg-red-100"
        style={{ height: resizeHandleHeight }}
        onPointerDown={resizeHandlers.onPointerDown("top")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
      {/* Content */}
      <div className="p-2" style={{ marginTop: resizeHandleHeight }}>
        <Text variant="body">{block.title}</Text>
        <Text variant="small">{formatBlockTime(block)}</Text>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 cursor-ns-resize bg-red-100"
        style={{ height: resizeHandleHeight }}
        onPointerDown={resizeHandlers.onPointerDown("bottom")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
    </div>
  );
}
