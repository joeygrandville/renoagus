import ReactFullpage from "@fullpage/react-fullpage";
import { Grid, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import Form from "../../components/Form";
import usePrivate from "./common";

const Login = withStyles((theme) => ({
  container: { maxWidth: 1170, margin: "0 auto", "& *": { color: "#FFF" } },
}))(({ classes }) => {
  const { app } = usePrivate(true);
  const [{ error, loading }, setState] = useState({ loading: false });
  const onSubmit = ({ username, password }) => {
    setState({ error: undefined, loading: true });
    return app
      .auth()
      .signInWithEmailAndPassword(username.value, password.value)
      .catch(({ message }) => setState({ loading: false, error: message }));
  };
  return (
    <ReactFullpage
      render={() => (
        <div className={`section bg-gradient`}>
          <div className={classes.container}>
            <Grid container wrap="nowrap" alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <h1 className={classes.h1}>Login</h1>
                <Form {...{ onSubmit }}>
                  <input type="text" name="username" placeholder="Usuario" className="bg-input" disabled={loading} />
                  <input type="password" name="password" placeholder="Contraseña" className="bg-input" disabled={loading} />
                  <button type="submit" className="bg-button" disabled={loading}>
                    <div>Login</div>
                  </button>
                </Form>
              </Grid>
              <Grid item xs={6}>
                {(error && (
                  <>
                    <h3>Error de inicio de sesión</h3>
                    {error}
                  </>
                )) ||
                  (loading && "Iniciando Sesión...")}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    />
  );
});

export default Login;
