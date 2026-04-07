import { Text } from "@/src/components/ui";
import { PRICE_LABEL } from "./utils";

export function RatingPrice({
  rating,
  reviewCount,
  priceLevel,
}: {
  rating: number | null;
  reviewCount: number | null;
  priceLevel: number | null;
}) {
  if (rating === null && priceLevel === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mb-3">
      {rating !== null && (
        <div className="flex items-center gap-1">
          <Text as="span" variant="small" className="text-yellow-500">
            &#9733;
          </Text>
          <Text as="span" variant="small" weight="medium">
            {rating}
          </Text>
          {reviewCount !== null && (
            <Text as="span" variant="caption" color="muted">
              ({reviewCount.toLocaleString()})
            </Text>
          )}
        </div>
      )}
      {priceLevel !== null && PRICE_LABEL[priceLevel] && (
        <>
          {rating !== null && (
            <Text as="span" variant="caption" color="muted">
              ·
            </Text>
          )}
          <Text as="span" variant="caption" color="sub" weight="medium">
            {PRICE_LABEL[priceLevel]}
          </Text>
        </>
      )}
    </div>
  );
}
