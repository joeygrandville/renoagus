import { AppBar, CssBaseline, IconButton, ThemeProvider, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import React from "react";
import { privateTheme, withPrivateContainerStyles } from "../../components/common.styles";
import { usePrivate } from "./common";
import "./layout.css";

const Container = withPrivateContainerStyles(({ classes, ...props }) => <div className={classes.root} {...props} />);

const Layout = ({ children, ...props }) => {
  const { signOut, user } = usePrivate();
  return (
    <>
      <ThemeProvider theme={privateTheme} {...props}>
        <CssBaseline />
        {user && (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="admin-header-title">
                Admin
              </Typography>
              <Tooltip title="Cerrar Sesión">
                <IconButton color="inherit" onClick={signOut}>
                  <PowerSettingsNew />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        )}
        <Container>{children}</Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
