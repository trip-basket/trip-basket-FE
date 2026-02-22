import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W } from "../../constants";
import type { CalendarBlock } from "../../types";
import { CATEGORY_COLORS } from "../../types";
import { formatBlockTime } from "../../utils";
import { useGridBlockResize } from "./use-grid-block-resize";

export interface GridDraggableBlockProps {
  block: CalendarBlock;
  top: number;
  height: number;
  isDragging: boolean;
  position: { x: number; y: number };
  dragHandlers: React.ComponentProps<"div">;
}

export function GridDraggableBlock({
  block,
  top,
  height,
  isDragging,
  position,
  dragHandlers,
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

  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
  const resizeHandleHeight = 10;
  const categoryColor = block.category ? CATEGORY_COLORS[block.category] : undefined;
  const reactionsCount = block.reactions?.length ?? 0;
  const isLocked = !!block.lockedBy;
  const lockedByMember = block.lockedBy ? members.find((m) => m.id === block.lockedBy) : undefined;

  return (
    <div
      className="cursor-pointer touch-none rounded-md bg-canvas shadow-sm transition-shadow hover:shadow-md overflow-hidden"
      style={{
        position: isDragging ? "fixed" : "absolute",
        inset: isDragging ? undefined : "0",
        top: isDragging ? position.y : currentTop,
        left: isDragging ? position.x : undefined,
        width: DAY_COL_MIN_W,
        height: currentHeight,
        zIndex: isDragging ? 9999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: isDragging ? "none" : undefined,
        opacity: isLocked ? 0.55 : 1,
      }}
      {...dragHandlers}
    >
      <div
        className="absolute inset-x-0 top-0 cursor-ns-resize"
        style={{ height: resizeHandleHeight, backgroundColor: categoryColor }}
        onPointerDown={resizeHandlers.onPointerDown("top")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
      {/* Content */}
      <div
        className="flex flex-col justify-between h-full px-2 py-1.5"
        style={{
          paddingTop: resizeHandleHeight,
          paddingBottom: resizeHandleHeight,
        }}
      >
        <div>
          <Text variant="body">{block.title}</Text>
          <Text variant="small" color="muted">
            {formatBlockTime(block)}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {reactionsCount > 0 && (
              <span className="flex items-center gap-0.5 text-xs text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                {reactionsCount}
              </span>
            )}
            {isLocked && lockedByMember && (
              <span className="text-[10px] text-gray-400">🔒 {lockedByMember.nickname}</span>
            )}
          </div>
          {block.cost !== null && block.cost !== undefined && block.cost > 0 && (
            <Text variant="caption" color="muted">
              {room?.currency ?? ""} {block.cost.toLocaleString()}
            </Text>
          )}
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 cursor-ns-resize"
        style={{ height: resizeHandleHeight, backgroundColor: categoryColor }}
        onPointerDown={resizeHandlers.onPointerDown("bottom")}
        onPointerMove={resizeHandlers.onPointerMove}
        onPointerUp={resizeHandlers.onPointerUp}
      />
    </div>
  );
}
