import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { bgText, white } from "../../components/common.styles";
import { usePublicContext } from "./context";
import Counter from "../../components/Counter";

const Header = withStyles((t) => {
  return {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 0,
      overflow: "hidden",
      transition: t.transitions.create("height", {
        duration: t.transitions.duration.complex,
        easing: t.transitions.easing.easeInOut,
      }),
    },
    in: { height: 67 },
    container: {
      padding: t.spacing(2, 3),
      display: "flex",
      height: 64,
      transition: t.transitions.create(["background", "-webkit-box-shadow", "-moz-box-shadow", "boxShadow", "-webkit-filter", "filter"], {
        duration: t.transitions.duration.complex,
        easing: t.transitions.easing.easeInOut,
      }),
      "& .countdown-container": { width: 300, zoom: 0.4, position: "relative", top: -10 },
    },
    bgWhite: { background: "#fafafa" },
    shadow: ["-webkit-box-shadow", "-moz-box-shadow", "boxShadow"].reduce((a, s) => ({ ...a, [s]: t.shadows[2] }), {}),
    title: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1,
      transition: t.transitions.create(["color", "background", "-webkit-background-clip", "background-clip", "-webkit-text-fill-color"], {
        duration: t.transitions.duration.complex,
        easing: t.transitions.easing.easeInOut,
      }),
      whiteSpace: "nowrap",
      overflow: "hidden",
      flexGrow: 1,
      textOverflow: "ellipsis",
    },
    titleShadow: {
      "-webkit-filter": "drop-shadow(2px 2px 2px #FFF)",
      filter: "drop-shadow(2px 2px 2px #FFF)",
    },
    bgText,
    white,
  };
})(({ classes }) => {
  const { state } = usePublicContext();
  const [status, setStatus] = useState(state);
  useEffect(() => {
    const update = () => setStatus(["confirmation", "home", "location", "reward"].reduce((a, s) => ({ ...a, [s]: state[s] }), {}));
    if (state.home || state.confirmation) update();
    else setTimeout(update, 350);
  }, [state.confirmation, state.home, state.location, state.reward]);
  const { confirmation, home, location, reward } = status;
  return (
    <div className={clsx(classes.root, { [classes.in]: !home })}>
      <div className={clsx(classes.container, { [classes.bgWhite]: confirmation, [classes.shadow]: !location })}>
        <div className={clsx(classes.title, { [classes.white]: reward, [classes.bgText]: !reward, [classes.titleShadow]: location })}>
          Agustín y Renata
        </div>
        <Counter />
      </div>
    </div>
  );
});

export default Header;
