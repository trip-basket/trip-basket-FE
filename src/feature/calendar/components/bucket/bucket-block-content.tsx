import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { BlockColor, Place } from "../../types";
import { formatCurrency } from "../../utils";
import { CategoryIcon } from "../panel/category-icon";

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
