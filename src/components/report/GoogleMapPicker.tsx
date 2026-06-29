import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type Props = {
  location: {
    latitude: number;
    longitude: number;
  } | null;

  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    } | null>
  >;
};
export default function GoogleMapPicker({
  location,
  setLocation,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p>Loading Google Map...</p>;

  if (!location)
    return (
      <div className="bg-slate-800 p-5 rounded-xl text-center">
        📍 Click "Use My Current Location" first.
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: location.latitude,
        lng: location.longitude,
      }}
      zoom={16}
      onClick={(e) => {
        if (!e.latLng) return;

        setLocation({
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
      }}
    >
      <Marker
        position={{
          lat: location.latitude,
          lng: location.longitude,
        }}
      />
    </GoogleMap>
  );
}