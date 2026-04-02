import { useMutation } from "@tanstack/react-query";
import { type MapMouseEvent, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage, PLACE_TOAST_MESSAGES, placeApi } from "@/src/lib/api";
import type { Place, PlaceCategory } from "@/src/types";

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
    return "other";
  }
  return GOOGLE_TYPE_TO_CATEGORY.get(primaryType) ?? "other";
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
  const position = place ? place.position : null;

  const placeDetailMutation = useMutation({
    mutationFn: (data: { googlePlaceId: string }) => placeApi.get(data.googlePlaceId),
    onError: (error) => toast.error(getErrorMessage(error, PLACE_TOAST_MESSAGES.get)),
  });

  const clearSelection = useCallback(() => {
    setSelection({ status: "idle" });
  }, []);

  const selectPlace = useCallback(
    async (gPlace: google.maps.places.Place) => {
      await gPlace.fetchFields({
        fields: ["id"],
      });

      if (!gPlace.id || !map) {
        return;
      }

      const place = await placeDetailMutation.mutateAsync({ googlePlaceId: gPlace.id });
      const { lat, lng } = place.position;

      // rating, reviewCount 는 백엔드 협의 후 추후 추가
      const newPlace: Place = {
        ...place,
        category: toPlaceCategory(place.category),
        rating: 4.6,
        reviewCount: 21,
      };

      setSelection({ status: "detail", place: newPlace });
      map.panTo({ lat, lng });
    },
    [map, placeDetailMutation],
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
