import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";

const Location = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  console.log(googleMapsApiKey);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });
  const [, setMap] = useState(null);
  const options = {
    mapContainerClassName: "map-container",
    zoom: 15,
    center: { lat: -24.7041197, lng: -65.4716714 },
    onLoad: useCallback((map) => {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map);
    }, []),
    onUnmount: useCallback(() => setMap(null), []),
  };
  return (
    <div className="section">
      <div className="map-container">
        {isLoaded && (
          <GoogleMap {...options}>
            <InfoWindow position={options.center}>
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
