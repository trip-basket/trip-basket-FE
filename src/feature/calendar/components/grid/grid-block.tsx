import { Text } from "@/src/components/ui";
import type { CalendarBlock } from "../../types";
import { BLOCK_COLORS } from "../../types";
import { formatBlockTime, getBlockAbsolutePosition, type OverlapLayout } from "../../utils";
import { GridDraggableBlock } from "./grid-draggable-block";
import { useGridBlockDrag } from "./use-grid-block-drag";

interface GridBlockProps {
  block: CalendarBlock;
  overlapLayout?: OverlapLayout;
}

export function GridBlock({ block, overlapLayout }: GridBlockProps) {
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
        overlapLayout={overlapLayout}
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
  const blockColor = BLOCK_COLORS[block.colorIndex % BLOCK_COLORS.length];
  return (
    <div
      className="absolute inset-x-0 rounded-md rounded-tr-none p-2 opacity-50 shadow-sm"
      style={{ top, height, backgroundColor: blockColor.base }}
    >
      <Text variant="body">{block.title}</Text>
      <Text variant="small">{formatBlockTime(block)}</Text>
    </div>
  );
}
