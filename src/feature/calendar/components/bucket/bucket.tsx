import { Text } from "@/src/components/ui";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { BucketBlock } from "./bucket-block";

export function Bucket() {
  const { bucketBlocks } = useCalendarBlockStore();
  const isBucketEmpty = bucketBlocks.length === 0;

  return (
    <div className="flex shrink-0 gap-grid-gap overflow-x-auto rounded-xl bg-elevated p-grid-gap">
      {bucketBlocks.map((place) => (
        <BucketBlock key={place.id} place={place} />
      ))}
      {isBucketEmpty && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <Text variant="h4" weight="bold">
            가고 싶은 장소를 미리 담아두세요
          </Text>
          <Text variant="body">지도에서 버튼을 눌러 추가할 수 있어요</Text>
        </div>
      )}
    </div>
  );
}
