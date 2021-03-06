import { Grid } from "@material-ui/core";
import { Directions } from "@material-ui/icons";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import LinkButton from "../../components/LinkButton";
import { handleEvent } from "../../components/common";
import { usePublicContext } from "./context";

const env = (path, lat) => parseFloat(process.env[`REACT_APP_MAP_${path}_${lat ? "LAT" : "LNG"}`]);

const directions = process.env.REACT_APP_MAP_DIRECTION_LINK;

const points = ["CENTER", "MARKER"].reduce((a, p) => ({ ...a, [p.toLocaleLowerCase()]: { lat: env(p, true), lng: env(p) } }), {});

const Location = () => {
  const { center, marker } = points;
  const { isLoaded } = useJsApiLoader({ id: "map-location", googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY });
  const [map, setMap] = useState(null);
  const options = { mapContainerClassName: "map-container", center, zoom: 13, onLoad: setMap, onUnmount: () => setMap(null) };
  const onClick = handleEvent(() => {
    const link = document.createElement("a");
    link.rel = "noreferrer";
    link.href = directions;
    link.target = "_blank";
    link.click();
  });
  const {
    state: { location },
  } = usePublicContext();
  useEffect(() => {
    if (map && location) {
      map.panTo(center);
      map.setZoom(window.innerWidth < 600 ? 12 : 13);
    }
  }, [map, center, location]);
  return (
    <div className="section">
      <div className="map-container">
        {isLoaded && (
          <GoogleMap {...options} options={{ mapTypeControl: false, fullscreenControl: false }}>
            <InfoWindow position={marker}>
              <div className="map-marker">
                <Grid container wrap="nowrap" alignItems="center" spacing={4}>
                  <Grid item>
                    <h1>23 de Mayo</h1>
                    <h3>Hostal Castellanos</h3>
                    <h3>Salta, Argentina</h3>
                  </Grid>
                  {directions && (
                    <Grid item>
                      <LinkButton {...{ onClick }} className="map-directions">
                        <Directions />
                        <span>Cómo llegar</span>
                      </LinkButton>
                    </Grid>
                  )}
                </Grid>
              </div>
            </InfoWindow>
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Location;
