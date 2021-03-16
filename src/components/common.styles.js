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
    MuiTable: {
      root: {
        "div[class*=horizontalScrollContainer] table&": { background: "#212121" },
        ".scroll-table-y &": { borderCollapse: "separate" },
      },
    },
    MuiTableCell: {
      root: { fontSize: "1rem !important", padding: "8px 16px" },
      body: { height: 52 },
      footer: {
        fontSize: "1rem",
        borderTop: "solid 2px rgb(81, 81, 81)",
        background: "#212121",
        ".scroll-table-y &": { position: "sticky", bottom: 0 },
      },
      paddingNone: { "& > div": { display: "flex", flexDirection: "row-reverse", "& > *:not(:last-child)": { marginLeft: 4 } } },
    },
    MuiTableSortLabel: { root: { display: "flex", "& > div": { flexGrow: 1 } } },
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
