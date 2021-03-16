import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Layout, { PrivateContainer, Toolbar } from "../Layout";
import AdminContextProvider from "./context";
import Invitados from "./invitados";

const Admin = () => {
  const { isExact, path } = useRouteMatch();
  return (
    <Layout>
      {isExact && <Redirect to={`${path}/invitados`} />}
      <AdminContextProvider>
        <Toolbar />
        <PrivateContainer>
          <Switch>
            <Route path={`${path}/invitados`}>
              <Invitados />
            </Route>
          </Switch>
        </PrivateContainer>
      </AdminContextProvider>
    </Layout>
  );
};

export default Admin;
