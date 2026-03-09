import { Text } from "@/src/components/ui";
import { BUCKET_BLOCK_HEIGHT, DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { getBlockColor } from "../../utils";
import { BucketDraggableBlock } from "./bucket-draggable-block";
import { useBucketDrag } from "./use-bucket-drag";

export function BucketBlock({ place }: { place: Place }) {
  const { isDragging, position, handlers } = useBucketDrag(place);

  return (
    <>
      {isDragging && <BucketGhostBlock place={place} />}
      <BucketDraggableBlock
        place={place}
        isDragging={isDragging}
        position={position}
        handlers={handlers}
      />
    </>
  );
}

function BucketGhostBlock({ place }: { place: Place }) {
  const blockColor = getBlockColor(place.colorIndex);
  return (
    <div
      className="shrink-0 rounded-xl p-3 opacity-30"
      style={{
        width: DAY_COL_MIN_W,
        height: BUCKET_BLOCK_HEIGHT,
        backgroundColor: blockColor.base,
      }}
    >
      <Text variant="body">{place.title}</Text>
    </div>
  );
}
