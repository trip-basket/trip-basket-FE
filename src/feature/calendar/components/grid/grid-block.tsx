import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W } from "../../constants";
import type { CalendarBlock } from "../../types";
import { formatBlockTime, getBlockAbsolutePosition } from "../../utils";
import { useGridBlockDrag } from "./use-grid-block-drag";

interface GridBlockProps {
  block: CalendarBlock;
}

export function GridBlock({ block }: GridBlockProps) {
  const { top, height } = getBlockAbsolutePosition(block);
  const { isDragging, position, handlers } = useGridBlockDrag(block);

  return (
    <>
      {isDragging && <GridGhostBlock block={block} top={top} height={height} />}
      <GridDraggableBlock
        block={block}
        top={top}
        height={height}
        isDragging={isDragging}
        position={position}
        handlers={handlers}
      />
    </>
  );
}

interface GridGhostBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
}

function GridGhostBlock({ block, top, height }: GridGhostBlockProps) {
  return (
    <div
      className="absolute inset-x-0 rounded-md rounded-tr-none bg-canvas p-2 opacity-50 shadow-sm"
      style={{ top, height }}
    >
      <Text variant="body">{block.title}</Text>
      <Text variant="small">{formatBlockTime(block)}</Text>
    </div>
  );
}

interface GridDraggableBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  handlers: React.ComponentProps<"div">;
}

function GridDraggableBlock({
  block,
  top,
  height,
  isDragging,
  position,
  handlers,
}: GridDraggableBlockProps) {
  return (
    <div
      className="cursor-pointer touch-none rounded-md rounded-tr-none bg-canvas p-2 shadow-sm transition-shadow hover:shadow-md"
      style={{
        position: isDragging ? "fixed" : "absolute",
        inset: isDragging ? undefined : "0",
        top: isDragging ? position.y : top,
        left: isDragging ? position.x : undefined,
        width: DAY_COL_MIN_W,
        height,
        zIndex: isDragging ? 9999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
      }}
      {...handlers}
    >
      <Text variant="body">{block.title}</Text>
      <Text variant="small">{formatBlockTime(block)}</Text>
    </div>
  );
}
