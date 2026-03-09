import { Avatar } from "@/src/components/ui";
import type { Member } from "@/src/feature/room/types";

interface MemberListProps {
  members: Member[];
  onInvite?: () => void;
}

export function MemberList({ members, onInvite }: MemberListProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-1">
        {members.map((member) => (
          <Avatar key={member.id} member={member} size={28} showPresence />
        ))}
      </div>
      <button
        type="button"
        className="flex items-center justify-center h-6 w-6 rounded-full border border-dashed border-black/15 text-muted transition-colors hover:bg-black/5 hover:text-main disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="멤버 초대"
        onClick={onInvite}
        disabled={!onInvite}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
