import { type MapMouseEvent, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import type { PlaceDetail } from "@/src/feature/calendar/types";

export function usePlaceSelection() {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [placeDetail, setPlaceDetail] = useState<PlaceDetail | null>(null);

  const selectPlace = useCallback(
    async (place: google.maps.places.Place) => {
      await place.fetchFields({
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

      if (!place.location || !place.id || !map) {
        return;
      }

      const lat = place.location.lat();
      const lng = place.location.lng();

      setPlaceDetail({
        placeId: place.id,
        placeName: place.displayName ?? "",
        formattedAddress: place.formattedAddress ?? "",
        lat,
        lng,
        rating: place.rating ?? undefined,
        reviewCount: place.userRatingCount ?? undefined,
        openingHours: place.regularOpeningHours?.weekdayDescriptions ?? undefined,
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
      const place = new placesLib.Place({ id: clickedPlaceId });
      await selectPlace(place);
    },
    [placesLib, selectPlace],
  );

  const clearSelection = useCallback(() => {
    setPlaceDetail(null);
  }, []);

  const position = placeDetail ? { lat: placeDetail.lat, lng: placeDetail.lng } : null;

  return { position, placeDetail, placesLib, selectPlace, handleMapClick, clearSelection };
}
