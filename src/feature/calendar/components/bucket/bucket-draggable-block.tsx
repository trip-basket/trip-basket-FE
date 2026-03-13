import { BUCKET_BLOCK_HEIGHT, DAY_COL_MIN_W } from "../../constants";
import type { BucketBlock } from "../../types";
import { getBlockColor, getBlockShadow } from "../../utils";
import { BucketBlockContent } from "./bucket-block-content";

export interface BucketDraggableBlockProps {
  block: BucketBlock;
  isDragging: boolean;
  position: { x: number; y: number };
  handlers: React.ComponentProps<"div">;
}

export function BucketDraggableBlock({
  block,
  isDragging,
  position,
  handlers,
}: BucketDraggableBlockProps) {
  const isLocked = !!block.lockedBy;
  const blockColor = getBlockColor(block.color);

  return (
    <div
      className="shrink-0 cursor-pointer touch-none rounded-xl p-3 transition-shadow"
      style={{
        position: isDragging ? "fixed" : "static",
        width: DAY_COL_MIN_W,
        height: BUCKET_BLOCK_HEIGHT,
        left: isDragging ? position.x : undefined,
        top: isDragging ? position.y : undefined,
        zIndex: isDragging ? 9999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
        opacity: isLocked ? 0.55 : 1,
        backgroundColor: blockColor.base,
        boxShadow: getBlockShadow(isDragging, blockColor),
      }}
      {...handlers}
    >
      <BucketBlockContent block={block} blockColor={blockColor} />
    </div>
  );
}
