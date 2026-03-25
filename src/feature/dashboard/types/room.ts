export interface RoomSummary {
  id: string;
  name: string;
  tripStartDate: string;
  tripEndDate: string;
  role: "OWNER" | "MEMBER";
  memberCount: number;
}

export type TripStatus = "upcoming" | "ongoing" | "past";
