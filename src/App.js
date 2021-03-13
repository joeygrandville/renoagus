import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FbContextProvider } from "./firebase/context";
import Public from "./views/public";
import Admin from "./views/private/admin";
import Login from "./views/private/Login";
import ToastContainer from "./components/ToastContainer";

const App = () => {
  return (
    <FbContextProvider>
      <ToastContainer />
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
