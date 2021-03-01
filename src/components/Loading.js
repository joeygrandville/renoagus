import { withStyles } from "@material-ui/core";
import React from "react";

const Loading = () => <i className="fa fa-sync-alt fa-spin" />;

export const BgLoading = withStyles(
  () => ({
    root: {
      width: "100vw",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 10000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& i": {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 90,
        flexGrow: 0,
      },
    },
  }),
  { name: "loading" }
)(({ classes }) => (
  <div className={classes.root}>
    <Loading />
  </div>
));

export default Loading;
