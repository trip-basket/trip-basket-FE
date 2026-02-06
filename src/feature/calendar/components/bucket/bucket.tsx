import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { BucketBlock } from "./bucket-block";

export function Bucket() {
  const { bucketBlocks } = useCalendarBlockStore();

  return (
    <div className="flex shrink-0 gap-grid-gap overflow-x-auto rounded-xl bg-surface p-grid-gap">
      {bucketBlocks.map((place) => (
        <BucketBlock key={place.id} place={place} />
      ))}
    </div>
  );
}
