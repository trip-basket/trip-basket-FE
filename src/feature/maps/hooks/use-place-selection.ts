import { type MapMouseEvent, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import type { Place } from "@/src/types";

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
