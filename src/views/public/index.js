import ReactFullpage from "@fullpage/react-fullpage";
import React from "react";
import Gift from "./Gift";
import Home from "./Home";
import Location from "./Location";
import Rsvp from "./Rsvp";

const Public = () => (
  <ReactFullpage
    navigation
    anchors={["home", "location", "confirmation", "reward"]}
    render={(props) => {
      return (
        <>
          <Home {...props} />
          <Location {...props} />
          <Rsvp {...props} />
          <Gift {...props} />
        </>
      );
    }}
  />
);

export default Public;
