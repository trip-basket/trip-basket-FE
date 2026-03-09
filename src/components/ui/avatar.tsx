import type { Member } from "@/src/feature/room/types";

interface AvatarProps {
  member: Member;
  /** px 단위 크기 (default: 20) */
  size?: number;
  /** 외곽 테두리 스타일 */
  border?: string;
  /** 온라인 표시 여부 (true면 isOnline 기반 링 표시) */
  showPresence?: boolean;
}

export function Avatar({
  member,
  size = 20,
  border = "border border-white",
  showPresence = false,
}: AvatarProps) {
  const presenceStyle = showPresence
    ? {
        border: member.isOnline ? "2px solid #34D399" : "2px solid var(--gray-200)",
        opacity: member.isOnline ? 1 : 0.5,
      }
    : undefined;

  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden bg-gray-200 ${showPresence ? "" : border}`}
      style={{ width: size, height: size, ...presenceStyle }}
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
        <span
          className="font-semibold text-gray-500"
          style={{ fontSize: Math.max(8, size * 0.35) }}
        >
          {member.nickname.charAt(0)}
        </span>
      )}
    </div>
  );
}
