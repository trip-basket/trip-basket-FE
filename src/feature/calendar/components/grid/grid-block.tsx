import { Text } from "@/src/components/ui";
import type { CalendarBlock } from "../../types";
import { formatBlockTime, getBlockAbsolutePosition } from "../../utils";
import { GridDraggableBlock } from "./grid-draggable-block";
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
        dragHandlers={handlers}
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
