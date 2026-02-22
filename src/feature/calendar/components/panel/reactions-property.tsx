import { Text } from "@/src/components/ui";
import type { Member } from "@/src/feature/room/types";
import { PropertyRow } from "./property-row";

export function ReactionsProperty({
  members,
  reactionsCount,
}: {
  members: Member[];
  reactionsCount: number;
}) {
  return (
    <PropertyRow icon="favorite" label="좋아요">
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          {members.slice(0, 5).map((member) => (
            <div
              key={member.id}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 border border-white overflow-hidden"
              title={member.nickname}
            >
              {member.profileImageUrl ? (
                // biome-ignore lint/performance/noImgElement: mock 아바타 (프로토타입)
                <img
                  src={member.profileImageUrl}
                  alt={member.nickname}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[10px] font-semibold text-gray-500">
                  {member.nickname.charAt(0)}
                </span>
              )}
            </div>
          ))}
        </div>
        {reactionsCount > 0 && (
          <Text variant="caption" color="muted">
            {reactionsCount}
          </Text>
        )}
        <button
          type="button"
          className="ml-1 flex items-center justify-center h-6 w-6 rounded hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors duration-150"
          aria-label="좋아요 토글"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
