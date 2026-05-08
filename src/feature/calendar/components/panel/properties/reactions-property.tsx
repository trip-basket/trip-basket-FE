import { Text } from "@/src/components/ui";
import type { Reaction } from "../../../types";
import { PropertyRow } from "./property-row";

export function ReactionsProperty({
  reactions,
  myMemberId,
  onToggle,
}: {
  reactions: Reaction[];
  myMemberId: string | undefined;
  onToggle: () => void;
}) {
  const liked = myMemberId != null && reactions.some((r) => r.memberId === myMemberId);

  return (
    <PropertyRow icon="favorite" label="좋아요">
      <div className="flex items-center gap-1.5">
        {reactions.length > 0 && (
          <div className="flex items-center gap-1">
            {reactions.slice(0, 5).map((r) => (
              <Text
                key={r.id}
                as="span"
                variant="caption"
                color="muted"
                className="px-1.5 py-0.5 rounded bg-hover"
              >
                {r.memberId.slice(0, 5)}
              </Text>
            ))}
            {reactions.length > 5 && (
              <Text variant="caption" color="muted">
                +{reactions.length - 5}
              </Text>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          disabled={myMemberId == null}
          className={`ml-1 flex items-center justify-center h-6 w-6 rounded transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
            liked ? "text-red-400 hover:bg-red-50" : "text-muted hover:bg-red-50 hover:text-red-400"
          }`}
          aria-label="좋아요 토글"
          aria-pressed={liked}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            aria-hidden="true"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </PropertyRow>
  );
}
