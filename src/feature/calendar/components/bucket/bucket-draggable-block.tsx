import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { BLOCK_COLORS } from "../../types";
import { CategoryIcon } from "../panel/category-icon";

const DRAG_CARD_HEIGHT = 100;

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
  const blockColor = BLOCK_COLORS[place.colorIndex % BLOCK_COLORS.length];

  // 드래그 중: 기존 카드 형태 (캘린더 드롭 호환)
  if (isDragging) {
    return (
      <div
        className="shrink-0 cursor-grabbing touch-none rounded-md p-2 shadow-lg"
        style={{
          position: "fixed",
          width: DAY_COL_MIN_W,
          height: DRAG_CARD_HEIGHT,
          left: position.x,
          top: position.y,
          zIndex: 9999,
          userSelect: "none",
          backgroundColor: blockColor.base,
        }}
        {...handlers}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-baseline justify-between gap-1">
            <Text variant="body" weight="semibold" className="truncate">
              {place.title}
            </Text>
            <CategoryIcon category={place.category} color={blockColor.accent} size={16} />
          </div>
          {place.cost !== undefined && place.cost > 0 && (
            <div className="flex justify-end">
              <span
                className="rounded-md px-1.5 py-0.5 text-xs tabular-nums"
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

  // 기본: compact row
  return (
    <div
      className="flex items-center gap-3 rounded-lg px-3 cursor-grab touch-none transition-colors hover:bg-black/3"
      style={{ minHeight: 44 }}
      {...handlers}
    >
      {/* 색상 도트 */}
      <div
        className="shrink-0 rounded-full"
        style={{ width: 8, height: 8, backgroundColor: blockColor.base }}
      />

      {/* 제목 */}
      <Text variant="body" className="flex-1 truncate">
        {place.title}
      </Text>

      {/* 카테고리 아이콘 */}
      {place.category && (
        <CategoryIcon category={place.category} color="var(--text-tertiary)" size={14} />
      )}

      {/* 비용 */}
      {place.cost !== undefined && place.cost > 0 && (
        <Text variant="caption" color="muted" className="shrink-0 tabular-nums">
          {room?.currency ?? ""} {place.cost.toLocaleString()}
        </Text>
      )}
    </div>
  );
}
