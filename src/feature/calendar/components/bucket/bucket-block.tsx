import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { CATEGORY_LABELS } from "../../types";
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
  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
  const addedByMember = place.addedBy ? members.find((m) => m.id === place.addedBy) : undefined;
  const isLocked = !!place.lockedBy;

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
        opacity: isLocked ? 0.55 : 1,
      }}
      {...handlers}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-start justify-between gap-1">
          <Text variant="body">{place.title}</Text>
          {place.category && (
            <Text variant="caption" color="muted" className="shrink-0">
              {CATEGORY_LABELS[place.category]}
            </Text>
          )}
        </div>
        <div className="flex items-center justify-between">
          {addedByMember && (
            <div
              className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 overflow-hidden"
              title={addedByMember.nickname}
            >
              {addedByMember.profileImageUrl ? (
                // biome-ignore lint/performance/noImgElement: mock 아바타 (프로토타입)
                <img
                  src={addedByMember.profileImageUrl}
                  alt={addedByMember.nickname}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[10px] font-semibold text-gray-500">
                  {addedByMember.nickname.charAt(0)}
                </span>
              )}
            </div>
          )}
          {place.cost != null && place.cost > 0 && (
            <Text variant="caption" color="muted" className="ml-auto">
              {room?.currency ?? ""} {place.cost.toLocaleString()}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
