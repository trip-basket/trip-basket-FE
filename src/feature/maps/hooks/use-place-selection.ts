import { type MapMouseEvent, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import type { Place, PlaceCategory } from "@/src/types";

const MOCK_PHOTO_URL = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80";

const GOOGLE_TYPE_TO_CATEGORY = new Map<string, PlaceCategory>([
  ["tourist_attraction", "sightseeing"],
  ["museum", "sightseeing"],
  ["park", "sightseeing"],
  ["church", "sightseeing"],
  ["zoo", "sightseeing"],
  ["aquarium", "sightseeing"],
  ["amusement_park", "activity"],
  ["stadium", "activity"],
  ["gym", "activity"],
  ["restaurant", "food"],
  ["cafe", "food"],
  ["bakery", "food"],
  ["bar", "food"],
  ["meal_delivery", "food"],
  ["meal_takeaway", "food"],
  ["shopping_mall", "shopping"],
  ["store", "shopping"],
  ["supermarket", "shopping"],
  ["clothing_store", "shopping"],
  ["book_store", "shopping"],
  ["train_station", "transport"],
  ["bus_station", "transport"],
  ["airport", "transport"],
  ["subway_station", "transport"],
  ["transit_station", "transport"],
  ["lodging", "accommodation"],
  ["hotel", "accommodation"],
]);

function toPlaceCategory(primaryType?: string): PlaceCategory | undefined {
  if (!primaryType) {
    return undefined;
  }
  return GOOGLE_TYPE_TO_CATEGORY.get(primaryType);
}

export function usePlaceSelection() {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [place, setPlace] = useState<Place | null>(null);

  const selectPlace = useCallback(
    async (gPlace: google.maps.places.Place) => {
      await gPlace.fetchFields({
        fields: [
          "id",
          "location",
          "displayName",
          "formattedAddress",
          "rating",
          "userRatingCount",
          "regularOpeningHours",
          "priceLevel",
          "primaryType",
        ],
      });

      if (!gPlace.location || !gPlace.id || !map) {
        return;
      }

      const lat = gPlace.location.lat();
      const lng = gPlace.location.lng();

      setPlace({
        placeId: gPlace.id,
        placeName: gPlace.displayName ?? "",
        lat,
        lng,
        category: toPlaceCategory(gPlace.primaryType ?? undefined),
        formattedAddress: gPlace.formattedAddress ?? "",
        rating: gPlace.rating ?? undefined,
        reviewCount: gPlace.userRatingCount ?? undefined,
        openingHours: gPlace.regularOpeningHours?.periods?.map((p) => ({
          day: p.open?.day ?? 0,
          open: `${String(p.open?.hour ?? 0).padStart(2, "0")}:${String(p.open?.minute ?? 0).padStart(2, "0")}`,
          close: p.close
            ? `${String(p.close.hour ?? 0).padStart(2, "0")}:${String(p.close.minute ?? 0).padStart(2, "0")}`
            : null,
        })),
        priceLevel: gPlace.priceLevel ?? undefined,
        photoUrl: MOCK_PHOTO_URL,
      });

      map.panTo({ lat, lng });
    },
    [map],
  );

  const handleMapClick = useCallback(
    async (e: MapMouseEvent) => {
      const clickedPlaceId = e.detail.placeId;
      if (!clickedPlaceId || !placesLib) {
        return;
      }

      e.stop();
      const gPlace = new placesLib.Place({ id: clickedPlaceId });
      try {
        await selectPlace(gPlace);
      } catch (_) {
        setPlace(null);
      }
    },
    [placesLib, selectPlace],
  );

  const clearSelection = useCallback(() => {
    setPlace(null);
  }, []);

  const position = place ? { lat: place.lat, lng: place.lng } : null;

  return { position, place, placesLib, selectPlace, handleMapClick, clearSelection };
}
