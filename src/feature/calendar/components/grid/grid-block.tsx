import type { CalendarBlock } from "../../types";
import { getBlockAbsolutePosition, getBlockColor, type OverlapLayout } from "../../utils";
import { GridBlockContent } from "./grid-block-content";
import { GridDraggableBlock } from "./grid-draggable-block";
import { useGridBlockDrag } from "./use-grid-block-drag";

interface GridBlockProps {
  block: CalendarBlock;
  overlapLayout?: OverlapLayout;
}

/**
 * Render a calendar block with its draggable representation and a semi-transparent ghost while dragging.
 *
 * The component computes the block's absolute top and height and wires up drag state/handlers, passing
 * positioning and drag width into the draggable child. When the block is being dragged, a ghost
 * element is rendered at the original position.
 *
 * @param block - The calendar block data to render
 * @param overlapLayout - Optional layout information used to position overlapping blocks
 * @returns A React element that displays the draggable block and, when active, its drag ghost
 */
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

/**
 * Render a semi-transparent "ghost" representation of a calendar block at the specified vertical position and height.
 *
 * @param block - The CalendarBlock to visualize inside the ghost.
 * @param top - Vertical offset in pixels from the container's top where the ghost should be positioned.
 * @param height - Height in pixels for the ghost block.
 * @returns A JSX element that visually represents the ghost block (semi-transparent, rounded, positioned).
 */
function GridGhostBlock({
  block,
  top,
  height,
}: {
  block: CalendarBlock;
  top: number;
  height: number;
}) {
  const blockColor = getBlockColor(block.colorIndex);
  return (
    <div
      className="absolute inset-x-0 rounded-xl opacity-50 overflow-hidden"
      style={{ top, height, backgroundColor: blockColor.base }}
    >
      <GridBlockContent block={block} blockColor={blockColor} />
    </div>
  );
}
