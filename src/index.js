import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContext } from "./utils/auth";
import reportWebVitals from "./reportWebVitals";
import Public from "./views/public";
import Admin from "./views/private";
import Login from "./views/private/Login";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <AuthContext>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Public} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthContext>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
