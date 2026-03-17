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

type PlaceSelection =
  | { status: "idle" }
  | { status: "pinned"; place: Place }
  | { status: "detail"; place: Place };

export function usePlaceSelection() {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [selection, setSelection] = useState<PlaceSelection>({ status: "idle" });

  const place = selection.status !== "idle" ? selection.place : null;
  const isDetailOpen = selection.status === "detail";
  const position = place ? { lat: place.lat, lng: place.lng } : null;

  const clearSelection = useCallback(() => {
    setSelection({ status: "idle" });
  }, []);

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

      const newPlace: Place = {
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
        priceLevel: gPlace.priceLevel as number | undefined,
        photoUrl: MOCK_PHOTO_URL,
      };

      setSelection({ status: "detail", place: newPlace });
      map.panTo({ lat, lng });
    },
    [map],
  );

  const handleMapClick = useCallback(
    async (e: MapMouseEvent) => {
      const clickedPlaceId = e.detail.placeId;
      if (!clickedPlaceId || !placesLib) {
        // 빈 곳 클릭: 모달만 닫고 마커는 유지
        setSelection((prev) =>
          prev.status === "detail" ? { status: "pinned", place: prev.place } : prev,
        );
        return;
      }

      e.stop();
      const gPlace = new placesLib.Place({ id: clickedPlaceId });
      try {
        await selectPlace(gPlace);
      } catch (_) {
        setSelection({ status: "idle" });
      }
    },
    [placesLib, selectPlace],
  );

  return { position, place, placesLib, selectPlace, handleMapClick, clearSelection, isDetailOpen };
}
