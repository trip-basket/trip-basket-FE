import { Text } from "@/src/components/ui";
import { BUCKET_BLOCK_HEIGHT } from "../../constants";
import type { BucketBlock as BucketBlockType } from "../../types";
import { BucketBlock } from "./block/bucket-block";

const GAP = 8;

export function BucketGrid({ blocks }: { blocks: BucketBlockType[] }) {
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
    <div className="flex flex-wrap" style={{ gap: GAP }}>
      {blocks.map((block) => (
        <div key={block.id} style={{ height: BUCKET_BLOCK_HEIGHT }}>
          <BucketBlock block={block} />
        </div>
      ))}
    </div>
  );
}
