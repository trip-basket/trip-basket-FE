import { useMutation } from "@tanstack/react-query";
import { type MapMouseEvent, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage, PLACE_TOAST_MESSAGES, placeApi } from "@/src/lib/api";
import type { Place } from "@/src/types";
import { toPlaceCategory } from "@/src/types";

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

      const newPlace: Place = {
        ...place,
        category: toPlaceCategory(place.category),
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
