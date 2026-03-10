import { Text } from "@/src/components/ui";
import { TITLE_BAR_HEIGHT } from "./use-bucket-expand";

const EXPAND_EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";

export function BucketTitleBar({
  blockCount,
  isExpanded,
  isPinned,
  onTogglePin,
}: {
  blockCount: number;
  isExpanded: boolean;
  isPinned: boolean;
  onTogglePin: () => void;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-between px-4"
      style={{ height: TITLE_BAR_HEIGHT }}
    >
      <div className="flex items-center gap-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="text-muted"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform 250ms ${EXPAND_EASING}`,
          }}
        >
          <path
            d="M2.5 7.5L6 4.5L9.5 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Text variant="caption" weight="semibold">
          담은 장소 {blockCount}개
        </Text>
      </div>
      <button
        type="button"
        onClick={onTogglePin}
        className="flex items-center justify-center rounded-md transition-colors hover:bg-black/5"
        style={{
          width: 28,
          height: 28,
          color: isPinned ? "var(--text-primary)" : "var(--text-tertiary)",
        }}
        aria-label={isPinned ? "버킷 고정 해제" : "버킷 고정"}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M9.5 1.5L14.5 6.5L10 11L8 13L3 8L5 6L9.5 1.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isPinned ? "currentColor" : "none"}
          />
          <path d="M1 15L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
