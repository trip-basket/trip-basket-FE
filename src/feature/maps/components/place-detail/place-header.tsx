import { Text } from "@/src/components/ui";
import type { PlaceCategory } from "@/src/types";
import { CATEGORY_LABEL } from "./utils";

export function PlaceHeader({
  name,
  address,
  category,
  onClose,
}: {
  name: string;
  address: string;
  category: PlaceCategory;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Text variant="h3" className="truncate">
            {name}
          </Text>
          {category && (
            <Text
              as="span"
              variant="caption"
              className="shrink-0 text-[11px] px-1.5 py-0.5 rounded-full bg-inset text-soft"
            >
              {CATEGORY_LABEL[category]}
            </Text>
          )}
        </div>
        {address && (
          <Text variant="caption" color="muted" className="mt-0.5">
            {address}
          </Text>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center h-7 w-7 rounded hover:bg-hover text-muted hover:text-sub transition-colors duration-150 shrink-0 ml-2"
        aria-label="닫기"
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
