import { withStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { ToastContainer as RToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "./IconButton";

const ToastContainer = withStyles(({ spacing }) => ({
  close: { color: "#FFFFFF", alignSelf: "flex-start", marginTop: 9 },
  root: {
    "@media (min-width:600px) and (orientation: landscape)": {
      marginLeft: spacing(10),
    },
    "& .Toastify__toast": {
      boxShadow: "0px 3px 6px #00000029",
      borderRadius: spacing(0.5),
      "&:before": {
        alignSelf: "flex-start",
        fontFamily: "Material Icons",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: 24,
        lineHeight: 1,
        textTransform: "none",
        letterSpacing: "normal",
        wordWrap: "normal",
        whiteSpace: "nowrap",
        direction: "ltr",
        "-webkit-font-smoothing": "antialiased",
        textRendering: "optimizeLegibility",
        "-moz-osx-font-smoothing": "grayscale",
        fontFeatureSettings: "liga",
        margin: spacing(1.25, 2, 0, 0),
      },
      "&.Toastify__toast--success": { background: "#2CA55D", "&:before": { content: "'check_circle'" } },
      "&.Toastify__toast--warning": { background: "#FFCC00", "&:before": { content: "'error'" } },
      "&.Toastify__toast--error": { background: "#E74C3C", "&:before": { content: "'warning'" } },
    },
  },
}))(({ classes }) => (
  <RToastContainer
    className={classes.root}
    autoClose={3000}
    position="bottom-left"
    hideProgressBar
    closeButton={(p) => <IconButton icon={<Close />} className={classes.close} {...p} />}
  />
));

export default ToastContainer;
