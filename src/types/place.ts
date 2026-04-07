export type PlaceCategory =
  | "sightseeing"
  | "food"
  | "shopping"
  | "transport"
  | "accommodation"
  | "activity"
  | "other";

export interface Position {
  lat: number;
  lng: number;
}

export interface OpeningHour {
  day: number;
  open: string;
  close: string | null;
}

export interface Place {
  googlePlaceId: string;
  placeName: string;
  formattedAddress: string;
  position: Position;
  category: PlaceCategory;
  rating: number | null;
  reviewCount: number | null;
  openingHours: OpeningHour[];
  priceLevel: number | null;
  photoUrl: string;
}
