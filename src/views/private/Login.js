import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { withLoginStyles } from "../../components/common.styles";
import Form from "../../components/Form";
import { usePrivate } from "./common";
import Layout from "./Layout";

const Login = withLoginStyles(({ classes }) => {
  const { loaded, signIn } = usePrivate(true);
  const [{ error, loading }, setState] = useState({ loading: false });
  const onSubmit = ({ username, password }) => {
    setState({ error: undefined, loading: true });
    return signIn(username.value, password.value).catch(({ message }) => setState({ loading: false, error: message }));
  };
  return (
    (loaded && (
      <Layout>
        <div className={`${classes.root}`}>
          <div className={classes.container}>
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h3" className="admin-header-title">
                  Login
                </Typography>
                <Form {...{ onSubmit }} className={classes.form}>
                  <TextField fullWidth name="username" label="Usuario" disabled={loading} />
                  <TextField fullWidth type="password" name="password" label="Contraseña" disabled={loading} />
                  <Button type="submit" variant="outlined" disabled={loading}>
                    Login
                  </Button>
                </Form>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.status}>
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
      </Layout>
    )) ||
    "cargando..."
  );
});

export default Login;
