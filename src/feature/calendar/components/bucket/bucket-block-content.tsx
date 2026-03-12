import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { BlockColor, Place } from "../../types";
import { formatCurrency } from "../../utils";
import { CategoryIcon } from "../panel/category-icon";

/**
 * Render the content for a bucket block: title, category icon, optional lock indicator, and an optional cost badge.
 *
 * @param place - The place to render; uses `place.title`, `place.category`, `place.lockedBy`, and `place.cost`.
 * @param blockColor - Color tokens used for the category icon accent and the cost badge (tint for background, accent for text).
 * @returns A JSX element containing the place title, category icon, a lock indicator when `place.lockedBy` is set, and a right-aligned, formatted cost badge when `place.cost` is greater than zero (formatted with the current room currency).
 */
export function BucketBlockContent({
  place,
  blockColor,
}: {
  place: Place;
  blockColor: BlockColor;
}) {
  const room = useRoomStore((s) => s.room);

  return (
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
            {formatCurrency(place.cost, room?.currency)}
          </span>
        </div>
      )}
    </div>
  );
}
