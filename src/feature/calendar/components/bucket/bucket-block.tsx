import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { useBucketDrag } from "./use-bucket-drag";

const BUCKET_BLOCK_HEIGHT = 100;

interface BucketBlockProps {
  place: Place;
}

export function BucketBlock({ place }: BucketBlockProps) {
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

interface BucketGhostBlockProps {
  place: Place;
}

function BucketGhostBlock({ place }: BucketGhostBlockProps) {
  return (
    <div
      className="shrink-0 rounded-md bg-canvas p-2 opacity-50 shadow-sm"
      style={{
        width: DAY_COL_MIN_W,
        height: BUCKET_BLOCK_HEIGHT,
      }}
    >
      <Text variant="body">{place.title}</Text>
    </div>
  );
}

interface BucketDraggableBlockProps {
  place: Place;
  isDragging: boolean;
  position: { x: number; y: number };
  handlers: React.ComponentProps<"div">;
}

function BucketDraggableBlock({
  place,
  isDragging,
  position,
  handlers,
}: BucketDraggableBlockProps) {
  return (
    <div
      className="shrink-0 cursor-pointer touch-none rounded-md bg-canvas p-2 shadow-sm transition-shadow hover:shadow-md"
      style={{
        position: isDragging ? "fixed" : "static",
        width: DAY_COL_MIN_W,
        height: BUCKET_BLOCK_HEIGHT,
        left: isDragging ? position.x : undefined,
        top: isDragging ? position.y : undefined,
        zIndex: isDragging ? 9999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
      }}
      {...handlers}
    >
      <Text variant="body">{place.title}</Text>
    </div>
  );
}
