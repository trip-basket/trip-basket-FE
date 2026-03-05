import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../../constants";
import type { BlockColor, CalendarBlock } from "../../types";
import { BLOCK_COLORS } from "../../types";
import { formatBlockTime, type OverlapLayout } from "../../utils";
import { CategoryIcon } from "../panel/category-icon";
import { useGridBlockResize } from "./use-grid-block-resize";

export interface GridDraggableBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  dragHandlers: React.ComponentProps<"div">;
  overlapLayout?: OverlapLayout;
}

export function GridDraggableBlock({
  block,
  top,
  height,
  isDragging,
  position,
  dragHandlers,
  overlapLayout,
}: GridDraggableBlockProps) {
  const {
    currentTop,
    currentHeight,
    handlers: resizeHandlers,
  } = useGridBlockResize({
    block,
    top,
    height,
  });

  const resizeHandleHeight = 5;
  const blockColor = BLOCK_COLORS[block.colorIndex % BLOCK_COLORS.length];
  const isLocked = !!block.lockedBy;

  return (
    <div
      className="cursor-pointer touch-none rounded-md shadow-sm transition-shadow hover:shadow-md overflow-hidden"
      style={{
        position: isDragging ? "fixed" : "absolute",
        inset: isDragging ? undefined : "0",
        top: isDragging ? position.y : currentTop,
        left: isDragging ? position.x : undefined,
        width: isDragging ? DAY_COL_MIN_W : (overlapLayout?.width ?? DAY_COL_MIN_W),
        height: currentHeight,
        zIndex: isDragging ? 9999 : (overlapLayout?.zIndex ?? undefined),
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
        opacity: isLocked ? 0.55 : 1,
        backgroundColor: blockColor.base,
      }}
      {...dragHandlers}
    >
      <div
        className="absolute inset-x-0 top-0 cursor-ns-resize"
        style={{ height: resizeHandleHeight, backgroundColor: blockColor.accent }}
        onPointerDown={resizeHandlers.onPointerDown("top")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
      <BlockContent block={block} blockColor={blockColor} resizeHandleHeight={resizeHandleHeight} />
      <div
        className="absolute inset-x-0 bottom-0 cursor-ns-resize"
        style={{ height: resizeHandleHeight, backgroundColor: blockColor.accent }}
        onPointerDown={resizeHandlers.onPointerDown("bottom")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
    </div>
  );
}

function BlockContent({
  block,
  blockColor,
  resizeHandleHeight,
}: {
  block: CalendarBlock;
  blockColor: BlockColor;
  resizeHandleHeight: number;
}) {
  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
  const reactionsCount = block.reactions?.length ?? 0;
  const lockedByMember = block.lockedBy ? members.find((m) => m.id === block.lockedBy) : undefined;

  return (
    <div
      className="flex flex-col justify-between h-full px-2"
      style={{
        paddingTop: resizeHandleHeight,
        paddingBottom: resizeHandleHeight,
      }}
    >
      <div className="pt-1">
        <div className="flex items-baseline justify-between gap-1">
          <Text variant="body" weight="semibold">
            {block.title}
          </Text>
          <CategoryIcon category={block.category} color={blockColor.accent} size={16} />
        </div>
        <div className="flex items-center gap-1 text-sub">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <Text variant="small" color="sub">
            {formatBlockTime(block)}
          </Text>
        </div>
        {/* 상세 정보 변경했던 사람들 */}
        {block.addedBy && (
          <div className="flex -space-x-1 mt-1">
            {members
              .filter((m) => m.id === block.addedBy)
              .map((m) => (
                <div
                  key={m.id}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 overflow-hidden"
                  title={m.nickname}
                >
                  {m.profileImageUrl ? (
                    // biome-ignore lint/performance/noImgElement: mock 아바타 (프로토타입)
                    <img
                      src={m.profileImageUrl}
                      alt={m.nickname}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[8px] font-semibold text-gray-500">
                      {m.nickname.charAt(0)}
                    </span>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          {reactionsCount > 0 && (
            <button
              type="button"
              className="flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs cursor-pointer transition-opacity hover:opacity-70"
              style={{ backgroundColor: blockColor.tint, color: blockColor.accent }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {reactionsCount}
            </button>
          )}
          {block.lockedBy && lockedByMember && (
            <span className="text-[10px] text-soft">🔒 {lockedByMember.nickname}</span>
          )}
        </div>
        {block.cost != null && block.cost > 0 && (
          <button
            type="button"
            className="rounded-md px-1.5 py-0.5 text-xs tabular-nums cursor-pointer transition-opacity hover:opacity-70"
            style={{ backgroundColor: blockColor.tint, color: blockColor.accent }}
          >
            {room?.currency ?? ""} {block.cost.toLocaleString()}
          </button>
        )}
      </div>
    </div>
  );
}
