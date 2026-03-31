import { Avatar, Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { BlockColorPalette, ScheduledBlock } from "../../../types";
import { formatBlockTime, formatCurrency } from "../../../utils";
import { CategoryIcon } from "../../panel/properties/category-icon";

export function GridBlockContent({
  block,
  blockColor,
  resizeHandleOffset = 0,
}: {
  block: ScheduledBlock;
  blockColor: BlockColorPalette;
  resizeHandleOffset?: number;
}) {
  const room = useRoomStore((s) => s.room);
  const members = room?.members ?? [];
  const reactionsCount = block.reactions?.length ?? 0;
  const lockedByMember = block.lockedBy ? members.find((m) => m.id === block.lockedBy) : undefined;

  return (
    <div
      className="flex flex-col justify-between h-full px-2"
      style={{
        paddingTop: resizeHandleOffset + 2,
        paddingBottom: resizeHandleOffset + 2,
      }}
    >
      <div className="pt-1">
        <div className="flex items-baseline justify-between gap-1">
          <Text variant="body" weight="semibold">
            {block.name}
          </Text>
          <CategoryIcon category={block.place.category} color={blockColor.accent} size={16} />
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
        {block.addedBy && (
          <div className="flex -space-x-1 mt-1">
            {members
              .filter((m) => m.id === block.addedBy)
              .map((m) => (
                <Avatar key={m.id} member={m} size={16} border="" />
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
            <Text as="span" variant="caption" color="soft" className="text-[10px]">
              🔒 {lockedByMember.nickname}
            </Text>
          )}
        </div>
        {block.cost != null && block.cost > 0 && (
          <button
            type="button"
            className="rounded-md px-1.5 py-0.5 text-xs tabular-nums cursor-pointer transition-opacity hover:opacity-70"
            style={{ backgroundColor: blockColor.tint, color: blockColor.accent }}
          >
            {formatCurrency(block.cost, room?.currency)}
          </button>
        )}
      </div>
    </div>
  );
}
