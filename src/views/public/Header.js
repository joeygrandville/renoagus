import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { bgText, white } from "../../components/common.styles";
import { usePublicContext } from "./context";
import Counter from "../../components/Counter";

const Header = withStyles((t) => {
  const transition = (args) =>
    t.transitions.create(args, {
      duration: t.transitions.duration.complex,
      easing: t.transitions.easing.easeInOut,
    });
  return {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 0,
      overflow: "hidden",
      transition: transition("height"),
    },
    in: { height: 67 },
    container: {
      padding: t.spacing(2, 3),
      display: "flex",
      alignItems: "center",
      height: 64,
      transition: transition(["background", "-webkit-box-shadow", "-moz-box-shadow", "boxShadow", "-webkit-filter", "filter"]),
      "& .countdown-container": {
        width: 300,
        zoom: 0.4,
        position: "relative",
        top: -3,
        transition: transition("zoom"),
        "@media (max-width: 380px)": { zoom: 0.35 },
      },
    },
    bgWhite: { background: "#fafafa" },
    shadow: ["-webkit-box-shadow", "-moz-box-shadow", "boxShadow"].reduce((a, s) => ({ ...a, [s]: t.shadows[2] }), {}),
    title: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1,
      transition: transition("all"),
      whiteSpace: "nowrap",
      overflow: "hidden",
      flexGrow: 1,
      textOverflow: "ellipsis",
      color: "#000",
      "@media (max-width: 380px)": { fontSize: "1.5rem" },
    },
    titleShadow: { "-webkit-filter": "drop-shadow(2px 2px 2px #FFF)", filter: "drop-shadow(2px 2px 2px #FFF)" },
    bgText,
    bgDark: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
    white,
  };
})(({ classes }) => {
  const {
    state,
    settings: { loading, nombres },
  } = usePublicContext();
  const [status, setStatus] = useState(state);
  useEffect(() => {
    const update = () => setStatus(["confirmation", "home", "location", "reward"].reduce((a, s) => ({ ...a, [s]: state[s] }), {}));
    if (state.home || state.confirmation) update();
    else setTimeout(update, 350);
  }, [state.confirmation, state.home, state.location, state.reward]);
  const { confirmation, home, location, reward } = status;
  return (
    <div className={clsx(classes.root, { [classes.in]: !home && !loading })}>
      <div className={clsx(classes.container, { [classes.bgWhite]: confirmation, [classes.shadow]: !location, [classes.bgDark]: reward })}>
        <div className={clsx(classes.title, { [classes.titleShadow]: location, [classes.white]: reward })}>{nombres}</div>
        <Counter />
      </div>
    </div>
  );
});

export default Header;
