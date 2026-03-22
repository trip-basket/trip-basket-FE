import { BUCKET_BLOCK_HEIGHT, DAY_COL_MIN_W } from "../../../constants";
import type { BucketBlock as BucketBlockType } from "../../../types";
import { getBlockColor } from "../../../utils";
import { BucketBlockContent } from "./bucket-block-content";
import { BucketDraggableBlock } from "./bucket-draggable-block";
import { useBucketDrag } from "./use-bucket-drag";

export function BucketBlock({ block }: { block: BucketBlockType }) {
  const { isDragging, position, handlers } = useBucketDrag(block);

  return (
    <>
      {isDragging && <BucketGhostBlock block={block} />}
      <BucketDraggableBlock
        block={block}
        isDragging={isDragging}
        position={position}
        handlers={handlers}
      />
    </>
  );
}

function BucketGhostBlock({ block }: { block: BucketBlockType }) {
  const blockColor = getBlockColor(block.color);

  return (
    <div
      className="shrink-0 rounded-xl p-3 opacity-30"
      style={{
        width: DAY_COL_MIN_W,
        height: BUCKET_BLOCK_HEIGHT,
        backgroundColor: blockColor.base,
      }}
    >
      <BucketBlockContent block={block} blockColor={blockColor} />
    </div>
  );
}
