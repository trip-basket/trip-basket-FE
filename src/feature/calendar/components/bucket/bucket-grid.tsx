import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W } from "../../constants";
import type { Place } from "../../types";
import { BucketBlock } from "./bucket-block";

const GAP = 8;

export function BucketGrid({
  blocks,
  colsPerRow,
}: {
  blocks: Place[];
  colsPerRow: number;
}) {
  if (blocks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1">
        <Text variant="caption" weight="semibold" color="sub">
          지도에서 장소를 골라 저장해보세요
        </Text>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${colsPerRow}, ${DAY_COL_MIN_W}px)`,
        gap: GAP,
      }}
    >
      {blocks.map((place) => (
        <BucketBlock key={place.id} place={place} />
      ))}
    </div>
  );
}
