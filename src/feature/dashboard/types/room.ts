export interface Room {
  id: string;
  name: string;
  destination: string;
  tripStartDate: string;
  tripEndDate: string;
  currency: string;
  inviteCode: string;
  coverImageUrl: string | null;
  memberCount: number;
  placeCount: number;
  createdAt: string;
  updatedAt: string;
}

export type TripStatus = "upcoming" | "ongoing" | "past";
