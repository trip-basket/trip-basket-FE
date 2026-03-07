import { Text } from "@/src/components/ui";
import type { Place } from "../../types";
import { BLOCK_COLORS } from "../../types";
import { BucketDraggableBlock } from "./bucket-draggable-block";
import { useBucketDrag } from "./use-bucket-drag";

export function BucketBlock({ place }: { place: Place }) {
  const { isDragging, position, handlers } = useBucketDrag(place);

  return (
    <>
      {isDragging && <BucketGhostRow place={place} />}
      <BucketDraggableBlock
        place={place}
        isDragging={isDragging}
        position={position}
        handlers={handlers}
      />
    </>
  );
}

function BucketGhostRow({ place }: { place: Place }) {
  const blockColor = BLOCK_COLORS[place.colorIndex % BLOCK_COLORS.length];
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 opacity-30" style={{ minHeight: 44 }}>
      <div
        className="shrink-0 rounded-full"
        style={{ width: 8, height: 8, backgroundColor: blockColor.base }}
      />
      <Text variant="body" className="truncate">
        {place.title}
      </Text>
    </div>
  );
}
