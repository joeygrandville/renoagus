import { AppBar, CssBaseline, IconButton, ThemeProvider, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { privateTheme, withPrivateContainerStyles } from "../../components/common.styles";
import { useFbContext } from "../../firebase/context";
import "./layout.css";

const Container = withPrivateContainerStyles(({ classes, ...props }) => <div className={classes.root} {...props} />);

const Layout = ({ children, login, ...props }) => {
  const auth = useFbContext();
  const history = useHistory();
  const { user, signOut } = auth;
  useEffect(() => {
    if (login && user) history.replace("/admin");
    if (!login && !user) history.replace("/login");
  }, [user, history, login]);
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
