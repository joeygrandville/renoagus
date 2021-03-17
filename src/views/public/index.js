import ReactFullpage from "@fullpage/react-fullpage";
import { CssBaseline, ThemeProvider, Zoom } from "@material-ui/core";
import React from "react";
import { publicTheme } from "../../components/common.styles";
import { BgLoading } from "../../components/Loading";
import PublicContextProvider, { usePublicContext } from "./context";
import Gift from "./Gift";
import Header from "./Header";
import Home from "./Home";
import Location from "./Location";
import Rsvp from "./rsvp";

const PublicWrapper = () => {
  const {
    settings: { loading },
    actions: { onLeave },
  } = usePublicContext();
  return (
    <>
      {loading && <BgLoading />}
      <ReactFullpage
        navigation
        anchors={["home", "location", "confirmation", "reward"]}
        {...{ onLeave }}
        render={(props) => (
          <ReactFullpage.Wrapper>
            <Home {...props} />
            <Location {...props} />
            <Rsvp {...props} />
            <Gift {...props} />
          </ReactFullpage.Wrapper>
        )}
      />
      <Header />
    </>
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
