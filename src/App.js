import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FbContextProvider } from "./firebase/context";
import Public from "./views/public";
import Admin from "./views/private";
import Login from "./views/private/Login";

const App = () => {
  return (
    <FbContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Public} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </FbContextProvider>
  );
};

export default App;
