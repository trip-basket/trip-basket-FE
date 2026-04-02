import Image from "next/image";
import { useState } from "react";
import { Spinner, Text } from "@/src/components/ui";

export function PlacePhoto({ url }: { url: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-32 bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Text variant="caption" color="muted">
            사진을 불러올 수 없습니다.
          </Text>
        </div>
      )}

      <Image
        src={url}
        alt={""}
        fill
        sizes="100%"
        className="object-cover"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
      />
    </div>
  );
}
