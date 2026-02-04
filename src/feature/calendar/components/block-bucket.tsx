import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, MOCK_BLOCKS } from "../constants";
import { type Block, formatBlockTime } from "../types/block";

export function BlockBucket() {
  return (
    <div className="flex shrink-0 rounded-xl bg-surface p-grid-gap gap-grid-gap overflow-x-auto">
      {MOCK_BLOCKS.map((block) => (
        <BucketBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function BucketBlock({ block }: { block: Block }) {
  return (
    <div
      className="shrink-0 cursor-pointer rounded-md bg-canvas shadow-sm transition-shadow hover:shadow-md p-2"
      style={{ width: DAY_COL_MIN_W, height: 150 }}
    >
      <Text variant="body">{block.title}</Text>
      <Text variant="small">{formatBlockTime(block)}</Text>
    </div>
  );
}
