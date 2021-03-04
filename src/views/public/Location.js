import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

const env = (path, lat) => parseFloat(process.env[`REACT_APP_MAP_${path}_${lat ? "LAT" : "LNG"}`]);

const points = ["CENTER", "MARKER"].reduce((a, p) => ({ ...a, [p.toLocaleLowerCase()]: { lat: env(p, true), lng: env(p) } }), {});

const Location = () => {
  const { center, marker } = points;
  const { isLoaded } = useJsApiLoader({ id: "map-location", googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY });
  const [, setMap] = useState(null);
  const options = { mapContainerClassName: "map-container", center, zoom: 13, onLoad: setMap, onUnmount: () => setMap(null) };
  return (
    <div className="section">
      <div className="map-container">
        {isLoaded && (
          <GoogleMap {...options}>
            <InfoWindow position={marker}>
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
