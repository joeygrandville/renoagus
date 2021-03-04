import { withStyles } from "@material-ui/core";
import { array } from "../../components/common";

const white = { color: "#FFF" };
const hs = array(6).reduce((a, i) => ({ ...a, [`& h${i}`]: white }), {});
const common = { height: "100%", display: "flex", alignItems: "center" };
export const container = { maxWidth: 1170, margin: "0 auto", padding: "1rem 2rem", alignSelf: "center" };

export const home = { ...common, ...white, lineHeight: 1, fontSize: "1.25em", ...hs };
export const withHomeStyles = withStyles({ root: home, container: { ...container, maxWidth: undefined, margin: "0 auto", textAlign: "center" } });
