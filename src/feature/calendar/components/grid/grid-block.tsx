import { Text } from "@/src/components/ui";
import type { CalendarBlock } from "../../types";
import { formatBlockTime, getBlockAbsolutePosition } from "../../utils";

interface GridBlockProps {
  block: CalendarBlock;
}

export function GridBlock({ block }: GridBlockProps) {
  const { top, height } = getBlockAbsolutePosition(block);

  return (
    <div
      className="absolute inset-x-0 cursor-pointer rounded-md rounded-tr-none bg-canvas p-2 shadow-sm transition-shadow hover:shadow-md"
      style={{
        top,
        height,
      }}
    >
      <Text variant="body">{block.title}</Text>
      <Text variant="small">{formatBlockTime(block)}</Text>
    </div>
  );
}
