import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, MOCK_EVENTS } from "../constants";

const LAYOUT = {
  horizontal: {
    outer: "flex flex-row shrink-0 py-grid-gap px-grid-gap bg-canvas",
    inner: "flex flex-row rounded-xl bg-surface p-grid-gap gap-grid-gap h-full min-h-0 overflow-x-auto",
  },
  vertical: {
    outer: "flex flex-col shrink-0 py-grid-gap pl-grid-gap bg-canvas",
    inner: "flex flex-col rounded-xl bg-surface p-grid-gap gap-grid-gap h-full min-h-0 overflow-y-auto",
  },
} as const;

interface BlockBucketProps {
  direction?: keyof typeof LAYOUT;
}

export function BlockBucket({ direction = "vertical" }: BlockBucketProps) {
  const styles = LAYOUT[direction];

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        {MOCK_EVENTS.map((event) => (
          <div
            key={event.id}
            className="shrink-0 cursor-pointer rounded-md bg-canvas shadow-sm transition-shadow hover:shadow-md p-2"
            style={{ width: DAY_COL_MIN_W, height: 150 }}
          >
            <Text variant="body">{event.title}</Text>
            <Text variant="small">{event.time}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
