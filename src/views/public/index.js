import ReactFullpage from "@fullpage/react-fullpage";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { publicTheme } from "../../components/common.styles";
import PublicContextProvider, { usePublicContext } from "./context";
import Gift from "./Gift";
import Home from "./Home";
import Location from "./Location";
import Rsvp from "./rsvp";

const PublicWrapper = () => {
  const {
    actions: { onLeave },
    anchors,
  } = usePublicContext();
  return (
    <ReactFullpage
      navigation
      {...{ anchors, onLeave }}
      render={(props) => {
        return (
          <ReactFullpage.Wrapper>
            <Home {...props} />
            <Location {...props} />
            <Rsvp {...props} />
            <Gift {...props} />
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

const Public = () => (
  <PublicContextProvider>
    <ThemeProvider theme={publicTheme}>
      <CssBaseline />
      <PublicWrapper />
    </ThemeProvider>
  </PublicContextProvider>
);

export default Public;
