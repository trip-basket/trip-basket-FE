import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { BLOCK_COLORS } from "../../types";
import { CategoryIcon } from "../panel/category-icon";

const BUCKET_BLOCK_HEIGHT = 100;

export interface BucketDraggableBlockProps {
  place: Place;
  isDragging: boolean;
  position: { x: number; y: number };
  handlers: React.ComponentProps<"div">;
}

export function BucketDraggableBlock({
  place,
  isDragging,
  position,
  handlers,
}: BucketDraggableBlockProps) {
  const room = useRoomStore((s) => s.room);
  const isLocked = !!place.lockedBy;
  const blockColor = BLOCK_COLORS[place.colorIndex % BLOCK_COLORS.length];

  return (
    <div
      className="shrink-0 cursor-pointer touch-none rounded-xl p-3 transition-shadow hover:shadow-md"
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
        boxShadow: isDragging ? "0 8px 24px rgba(0,0,0,0.15)" : undefined,
      }}
      {...handlers}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <Text variant="body" weight="semibold" className="truncate">
              {place.title}
            </Text>
            <CategoryIcon category={place.category} color={blockColor.accent} size={16} />
          </div>
          {place.lockedBy && <span className="text-[10px] text-soft">🔒</span>}
        </div>
        {place.cost !== undefined && place.cost > 0 && (
          <div className="flex justify-end">
            <span
              className="rounded-lg px-1.5 py-0.5 text-xs tabular-nums"
              style={{ backgroundColor: blockColor.tint, color: blockColor.accent }}
            >
              {room?.currency ?? ""} {place.cost.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
