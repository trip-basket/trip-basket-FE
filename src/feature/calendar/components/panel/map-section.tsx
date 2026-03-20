import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";
import { Text } from "@/src/components/ui";
import type { ScheduledBlock } from "../../types";

export function MapSection({ block }: { block: ScheduledBlock }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { place } = block;
  const center = { lat: place.lat, lng: place.lng };

  return (
    <>
      <div className="rounded-xl overflow-hidden border border-gray-100 h-[160px]">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <GoogleMap
              center={center}
              defaultZoom={15}
              disableDefaultUI={true}
              zoomControl={true}
              gestureHandling="greedy"
              clickableIcons={false}
              style={{ width: "100%", height: "100%" }}
            >
              <Marker position={center} />
            </GoogleMap>
          </APIProvider>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Text variant="small" color="muted">
              지도를 불러올 수 없습니다.
            </Text>
          </div>
        )}
      </div>
      {place.formattedAddress && (
        <Text variant="caption" color="muted" className="mt-1.5 leading-relaxed">
          {place.formattedAddress}
        </Text>
      )}
      {place.rating != null && (
        <div className="flex items-center gap-1 mt-1">
          <Text as="span" variant="caption" className="text-yellow-500">
            &#9733;
          </Text>
          <Text as="span" variant="caption" weight="medium">
            {place.rating}
          </Text>
          {place.reviewCount != null && (
            <Text as="span" variant="caption" color="muted">
              ({place.reviewCount?.toLocaleString()})
            </Text>
          )}
        </div>
      )}
    </>
  );
}
