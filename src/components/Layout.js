import { AppBar, createMuiTheme, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography, withStyles } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import React from "react";
import usePrivate from "../views/private/common";
import "./layout.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: { paper: "#424242", default: "#212121" },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: { color: "#FFF", backgroundColor: "#333 !important" },
    },
    MuiTypography: {
      root: { fontFamily: '"Khand", sans-serif', color: "#FFF" },
    },
  },
});

const Container = withStyles(
  (theme) => ({
    container: {
      flexGrow: 1,
      overflow: "hidden",
      overflowY: "auto",
      padding: theme.spacing(2),
      background: theme.palette.background.default,
      color: "#fff",
    },
  }),
  { name: "layout" }
)(({ classes, ...props }) => <div className={classes.container} {...props} />);

const Layout = ({ children, ...props }) => {
  const { signOut } = usePrivate();
  return (
    <>
      <CssBaseline />
      <ThemeProvider {...{ theme }} {...props}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="admin-header-title">
              Admin
            </Typography>
            <IconButton color="inherit" onClick={signOut}>
              <PowerSettingsNew />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
