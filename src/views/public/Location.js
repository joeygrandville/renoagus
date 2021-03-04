import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";

const Location = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });
  const [, setMap] = useState(null);
  const options = {
    mapContainerClassName: "map-container",
    center: { lat: -24.730524332692443, lng: -65.45045847945346 },
    zoom: 13,
    onLoad: setMap,
    onUnmount: useCallback(() => setMap(null), []),
    onClick: ({ latLng }) => console.log(`lat: ${latLng.lat()}, lng: ${latLng.lng()}`),
  };
  return (
    <div className="section">
      <div className="map-container">
        {isLoaded && (
          <GoogleMap {...options}>
            <InfoWindow position={{ lat: -24.704093505168764, lng: -65.47165865950718 }}>
              <div id="iw-container" className="map-marker">
                <h1>Agustín y Renata</h1>
                <h3>23 de Mayo</h3>
                Hostal Castellanos - Salta, Argentina
              </div>
            </InfoWindow>
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Location;
