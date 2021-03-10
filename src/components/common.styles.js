import { createMuiTheme, withStyles } from "@material-ui/core";
import { array } from "./common";

export const transition = (t, args) =>
  t.transitions.create(args, {
    duration: t.transitions.duration.complex,
    easing: t.transitions.easing.easeInOut,
  });

export const fontFamily = [
  '"Khand"',
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");

export const white = { color: "#FFF" };
const hs = array(6).reduce((a, i) => ({ ...a, [`& h${i}`]: white }), {});
const common = { height: "100%", display: "flex", alignItems: "center" };

export const bgText = {
  background: "-webkit-linear-gradient(45deg, #000, #730d0d 5%)",
  "-webkit-background-clip": "text",
  backgroundClip: "text",
  "-webkit-text-fill-color": "transparent",
};

export const container = { maxWidth: 1170, margin: "0 auto", padding: "1rem 2rem", alignSelf: "center" };

export const withHomeStyles = withStyles({
  root: { ...common, ...white, lineHeight: 1, fontSize: "1.25em", ...hs },
  container: { ...container, maxWidth: undefined, textAlign: "center" },
  counter: { margin: "0 -2rem" },
});
export const withRsvpStyles = withStyles({
  root: { ...common },
  container: { ...container, padding: "5rem 2.5rem 1rem 2rem", "& h1": { lineHeight: "1em", marginTop: 0 } },
});

export const withLoginStyles = withStyles(
  (t) => ({
    root: { ...common, ...white, lineHeight: 1, fontSize: "1.25em" },
    container: { ...container, margin: undefined, width: "100%" },
    form: { display: "flex", flexDirection: "column", alignItems: "flex-end", "& .MuiFormControl-root": { marginBottom: "1rem" } },
    status: { [t.breakpoints.down("md")]: { height: 110 } },
  }),
  { name: "login" }
);

export const publicTheme = createMuiTheme({ typography: { fontFamily } });

export const privateTheme = createMuiTheme({
  typography: { fontFamily },
  palette: { type: "dark", background: { paper: "#424242", default: "#212121" }, secondary: { main: "#FFF" } },
  overrides: {
    MuiAppBar: { colorPrimary: { backgroundColor: "#333" } },
    MuiTableCell: { root: { fontSize: "1rem", padding: 8 }, footer: { fontSize: "1rem", borderTop: "solid 2px rgb(81, 81, 81)" } },
  },
});

export const withPrivateContainerStyles = withStyles(
  (t) => ({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      overflowY: "auto",
      padding: "1rem",
      background: t.palette.background.default,
      ...white,
      "& a": white,
    },
  }),
  { name: "layout" }
);

export const withStylesInput = withStyles((t) => ({
  root: {
    "& .MuiInputAdornment-root": {
      paddingRight: 5,
      "& p": { ...bgText, fontSize: "2rem", display: "inline-block", position: "relative", top: t.spacing(1), fontWeight: 500 },
      "& i": bgText,
    },
    "&.Mui-disabled .MuiInputAdornment-root p": { opacity: 0.4 },
  },
  input: {
    fontWeight: 700,
    fontSize: "1rem",
    lineHeight: "1.4em",
    textAlign: "center",
    padding: t.spacing(1.5, 1.5, 1.8, 1.5),
  },
}));

export const withRsvpStepStyles = withStyles(
  (t) => ({
    container: {
      maxWidth: 500,
      minHeight: 85,
      [t.breakpoints.down("sm")]: { minHeight: "initial", "& .bg-button": { marginTop: t.spacing(1) } },
      [t.breakpoints.down("xs")]: { "&.hide-xs, & .hide-xs": { display: "none" } },
      [t.breakpoints.up("sm")]: { "&.show-xs, & .show-xs": { display: "none" } },
    },
    container2: { minHeight: "initial", paddingTop: t.spacing(1.5) },
    label: { fontSize: "1.17em", fontWeight: 600, paddingTop: "22px !important", ...bgText },
    labelNp: { fontSize: "1.17em", fontWeight: 600, ...bgText },
    nowrap: { whiteSpace: "nowrap" },
  }),
  { name: "rsvp-step" }
);

export const withAdminTableStyles = withStyles((t) => {
  return {
    root: {
      "& input[type=file]": { display: "none" },
      "& .np-l": { paddingLeft: 0 },
      "& .nowrap": { whiteSpace: "nowrap" },
      "& div.nowrap": { overflow: "hidden", textOverflow: "ellipsis" },
      "& tr > th .admin-th-icon": { lineHeight: 1 },
      "& tr > th .admin-th-title": { flexGrow: 1 },
      "& tr > th:nth-child(1), & tr > th:nth-child(2)": {
        [t.breakpoints.up("md")]: { minWidth: 245 },
      },
      "& tr > td:nth-child(1), & tr > td:nth-child(2)": {
        [t.breakpoints.down("xs")]: {
          maxWidth: 120,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
      "& tr > th:nth-child(5)": {
        [t.breakpoints.up("md")]: { width: 130 },
      },
      "& tr > th:nth-child(6)": {
        [t.breakpoints.up("md")]: { width: 150 },
        [t.breakpoints.down("xs")]: {
          "& .admin-th-title": { display: "none" },
          "& .admin-th-icon": { flexGrow: 1 },
        },
      },
      [t.breakpoints.down("md")]: {
        "& th.max, & td.max": { maxWidth: 150 },
      },
      "@media (max-width:1109px)": {
        "& th.max, & td.max": { width: 0, padding: 0, "& > div": { width: 0, overflow: "hidden" } },
      },
    },
  };
});
