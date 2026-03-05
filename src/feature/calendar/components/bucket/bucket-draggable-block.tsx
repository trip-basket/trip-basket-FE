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
  const members = useRoomStore((s) => s.members);
  const isLocked = !!place.lockedBy;
  const blockColor = BLOCK_COLORS[place.colorIndex % BLOCK_COLORS.length];

  return (
    <div
      className="shrink-0 cursor-pointer touch-none rounded-md p-2 shadow-sm transition-shadow hover:shadow-md"
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
          {/* 상세 정보 변경했던 사람들 */}
          {place.addedBy && (
            <div className="flex -space-x-1 mt-1">
              {members
                .filter((m) => m.id === place.addedBy)
                .map((m) => (
                  <div
                    key={m.id}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 overflow-hidden"
                    title={m.nickname}
                  >
                    {m.profileImageUrl ? (
                      // biome-ignore lint/performance/noImgElement: mock 아바타 (프로토타입)
                      <img src={m.profileImageUrl} alt={m.nickname} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[8px] font-semibold text-gray-500">{m.nickname.charAt(0)}</span>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {place.lockedBy && (
              <span className="text-[10px] text-soft">🔒</span>
            )}
          </div>
          {place.cost !== undefined && place.cost > 0 && (
            <button
              type="button"
              className="ml-auto rounded-md px-1.5 py-0.5 text-xs tabular-nums cursor-pointer transition-opacity hover:opacity-70"
              style={{ backgroundColor: blockColor.tint, color: blockColor.accent }}
            >
              {room?.currency ?? ""} {place.cost.toLocaleString()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
