import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";
import type { CalendarBlock } from "../../types";
import { SectionHeader } from "./section-header";

export function MapSection({ block }: { block: CalendarBlock }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!block.placeDetail) {
    return null;
  }

  const place = block.placeDetail;
  const center = { lat: place.lat, lng: place.lng };

  return (
    <div className="mb-6">
      <SectionHeader icon="map" label="위치" />
      {apiKey && (
        <div className="rounded-xl overflow-hidden border border-gray-100 h-[160px]">
          <APIProvider apiKey={apiKey}>
            <GoogleMap
              defaultCenter={center}
              defaultZoom={15}
              disableDefaultUI={true}
              zoomControl={false}
              gestureHandling="none"
              clickableIcons={false}
              style={{ width: "100%", height: "100%" }}
            >
              <Marker position={center} />
            </GoogleMap>
          </APIProvider>
        </div>
      )}
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{place.formattedAddress}</p>
      {place.rating != null && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-500 text-xs">&#9733;</span>
          <span className="text-xs text-gray-600 font-medium">{place.rating}</span>
          {place.reviewCount != null && (
            <span className="text-xs text-gray-400">({place.reviewCount?.toLocaleString()})</span>
          )}
        </div>
      )}
    </div>
  );
}
