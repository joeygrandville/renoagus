import { AppBar, CssBaseline, Tab, Tabs, ThemeProvider, Toolbar as MToolbar, Typography } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { privateTheme, withPrivateContainerStyles } from "../../components/common.styles";
import IconButton from "../../components/IconButton";
import { useFbContext } from "../../firebase/context";
import "./layout.css";

export const PrivateContainer = withPrivateContainerStyles(({ classes, ...props }) => <div className={classes.root} {...props} />);

const tabs = ["invitados"].reduce((a, key) => [...a, { key, label: `${key.substr(0, 1).toLocaleUpperCase()}${key.substr(1)}` }], []);

const tabValue = (path) => tabs.find(({ key }) => path.includes(key))?.key || tabs[0].key;

export const Toolbar = (props) => {
  const { path } = useRouteMatch();
  const value = tabValue(path);
  const auth = useFbContext();
  const { user, signOut } = auth;
  return (
    (user && (
      <AppBar position="static" {...props}>
        <MToolbar>
          <Typography variant="h6" className="admin-header-title">
            Admin
          </Typography>
          <Tabs {...{ value }}>
            {tabs.map(({ key, label }) => (
              <Tab {...{ key, label }} component={Link} to={`/admin/${key}`} value={key} />
            ))}
          </Tabs>
          <IconButton tooltip="Cerrar Sesión" size="medium" icon={<PowerSettingsNew />} onClick={signOut} />
        </MToolbar>
      </AppBar>
    )) || <></>
  );
};

const Layout = ({ children, login, ...props }) => {
  const auth = useFbContext();
  const history = useHistory();
  const { user } = auth;
  useEffect(() => {
    if (login && user) history.replace("/admin");
    if (!login && !user) history.replace("/login");
  }, [user, history, login]);
  return (
    <>
      <ThemeProvider theme={privateTheme} {...props}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
