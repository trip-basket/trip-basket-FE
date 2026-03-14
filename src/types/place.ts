export type PlaceCategory =
  | "sightseeing"
  | "food"
  | "shopping"
  | "transport"
  | "accommodation"
  | "activity";

export interface OpeningHour {
  day: number;
  open: string;
  close: string | null;
}

export interface Place {
  placeId: string | null;
  placeName: string | null;
  lat: number;
  lng: number;
  category?: PlaceCategory;
  formattedAddress?: string;
  rating?: number;
  reviewCount?: number;
  openingHours?: OpeningHour[];
  priceLevel?: number;
  photoUrl?: string;
}
