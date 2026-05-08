import type { ScheduledBlock } from "../../../types";
import { getBlockAbsolutePosition, getBlockColor, type OverlapLayout } from "../../../utils";
import { GridBlockContent } from "./grid-block-content";
import { GridDraggableBlock } from "./grid-draggable-block";
import { useGridBlockDrag } from "./use-grid-block-drag";

interface GridBlockProps {
  block: ScheduledBlock;
  overlapLayout?: OverlapLayout;
}

export function GridBlock({ block, overlapLayout }: GridBlockProps) {
  const { top, height } = getBlockAbsolutePosition(block);
  const { isDragging, position, dragWidth, handlers } = useGridBlockDrag(block);

  return (
    <>
      {isDragging && <GridGhostBlock block={block} top={top} height={height} />}
      <GridDraggableBlock
        block={block}
        top={top}
        height={height}
        isDragging={isDragging}
        position={position}
        dragWidth={dragWidth}
        dragHandlers={handlers}
        overlapLayout={overlapLayout}
      />
    </>
  );
}

function GridGhostBlock({
  block,
  top,
  height,
}: {
  block: ScheduledBlock;
  top: number;
  height: number;
}) {
  const blockColor = getBlockColor(block.place.category);
  return (
    <div
      className="absolute inset-x-0 rounded-xl opacity-50 overflow-hidden"
      style={{ top, height, backgroundColor: blockColor.base }}
    >
      <GridBlockContent block={block} blockColor={blockColor} />
    </div>
  );
}
