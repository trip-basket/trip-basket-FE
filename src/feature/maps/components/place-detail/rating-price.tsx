import { PRICE_LABEL } from "./utils";

export function RatingPrice({
  rating,
  reviewCount,
  priceLevel,
}: {
  rating?: number;
  reviewCount?: number;
  priceLevel?: number;
}) {
  if (rating === undefined && priceLevel === undefined) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mb-3">
      {rating !== undefined && (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 text-sm">&#9733;</span>
          <span className="text-sm text-gray-700 font-medium">{rating}</span>
          {reviewCount !== undefined && (
            <span className="text-xs text-gray-400">({reviewCount.toLocaleString()})</span>
          )}
        </div>
      )}
      {priceLevel !== undefined && PRICE_LABEL[priceLevel] && (
        <>
          {rating !== undefined && <span className="text-gray-300 text-xs">·</span>}
          <span className="text-xs text-gray-500 font-medium">{PRICE_LABEL[priceLevel]}</span>
        </>
      )}
    </div>
  );
}
