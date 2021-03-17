import { Grid } from "@material-ui/core";
import { Directions } from "@material-ui/icons";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { handleEvent, openLink } from "../../components/common";
import LinkButton from "../../components/LinkButton";
import { usePublicContext } from "./context";

const Location = () => {
  const { isLoaded } = useJsApiLoader({ id: "map-location", googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY });
  const [map, setMap] = useState(null);
  const {
    state: { location },
    settings: { loading, eventDate, map: mapSettings },
  } = usePublicContext();
  const { directions, line1, line2, points } = mapSettings || {};
  const { center, marker } = points || {};
  const options = { mapContainerClassName: "map-container", center, zoom: 13, onLoad: setMap, onUnmount: () => setMap(null) };
  const onClick = handleEvent(() => openLink(directions));
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
            {!loading && (
              <InfoWindow position={marker}>
                <div className="map-marker">
                  <Grid container wrap="nowrap" alignItems="center" spacing={4}>
                    <Grid item>
                      <h1>{moment(eventDate).format("DD [de] MMMM")}</h1>
                      {line1 && <h3>{line1}</h3>}
                      {line2 && <h3 className={!!line1 ? "hide-xs" : undefined}>{line2}</h3>}
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
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Location;
