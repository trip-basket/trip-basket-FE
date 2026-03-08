import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { BLOCK_COLORS } from "../../types";
import { BucketDraggableBlock } from "./bucket-draggable-block";
import { useBucketDrag } from "./use-bucket-drag";

const BUCKET_BLOCK_HEIGHT = 100;

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
  const blockColor = BLOCK_COLORS[place.colorIndex % BLOCK_COLORS.length];
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
