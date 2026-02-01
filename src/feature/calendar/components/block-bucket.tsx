import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, MOCK_EVENTS } from "../constants";

export function BlockBucket() {
  return (
    <div className="flex flex-col shrink-0 py-grid-gap pl-grid-gap bg-canvas">
      <div className="flex flex-col rounded-xl bg-surface p-grid-gap gap-grid-gap h-full min-h-0 overflow-y-auto">
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
