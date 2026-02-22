export type MemberRole = "owner" | "editor" | "viewer";

export interface Member {
  id: string;
  nickname: string;
  profileImageUrl?: string;
  role: MemberRole;
}

export interface Room {
  id: string;
  name: string;
  tripStartDate: string;
  tripEndDate: string;
  currency: string;
  budget?: number;
  inviteCode: string;
}
