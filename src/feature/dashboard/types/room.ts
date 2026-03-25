// API 명세 정의되면 변경, room.ts type 과 연동
export interface RoomSummary {
  id: string;
  name: string;
  destination: string;
  tripStartDate: string;
  tripEndDate: string;
  currency: string;
  coverImageUrl: string | null;
  memberCount: number;
  placeCount: number;
  createdAt: string;
  updatedAt: string;
}

export type TripStatus = "upcoming" | "ongoing" | "past";
