import { APIProvider, Map as GoogleMap, Marker, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useRef } from "react";
import { DEFAULT_CENTER } from "./constants";
import { usePlaceSelection } from "./hooks";
import { usePlaceAutocomplete } from "./hooks/use-place-autocomplete";

function Maps() {
  const isLoaded = useApiIsLoaded();
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const { position, placesLib, selectPlace, handleMapClick } = usePlaceSelection();

  usePlaceAutocomplete(autocompleteContainerRef, placesLib, selectPlace);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div ref={autocompleteContainerRef} className="absolute h-10 z-10 mt-4 mx-4 inset-x-0" />
      <GoogleMap
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={13}
        onClick={handleMapClick}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        zoomControl={true}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          position: "absolute",
        }}
      >
        <Marker position={position || DEFAULT_CENTER} />
      </GoogleMap>
    </>
  );
}

export function MapsContent() {
  return (
    <div className="w-full h-full relative">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Maps />
      </APIProvider>
    </div>
  );
}
