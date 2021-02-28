import ReactFullpage from "@fullpage/react-fullpage";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../components/Form";
import { useAuth } from "../../utils/auth";

const Login = () => {
  const { user, app } = useAuth();
  const history = useHistory();
  const [{ error, loading }, setState] = useState({ loading: false });
  useEffect(() => {
    if (user) history.replace("/admin");
  }, [user, history]);
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
        <div className="section home-welcome">
          <div className="container">
            <div className="login-container">
              <div>
                <h1>Login</h1>
                <Form {...{ onSubmit }}>
                  <input type="text" name="username" placeholder="Usuario" className="login" disabled={loading} />
                  <input type="password" name="password" placeholder="Contraseña" className="login" disabled={loading} />
                  <div className="confirmation-field">
                    <button type="submit" className="confirmation-button" disabled={loading}>
                      <div>Login</div>
                    </button>
                  </div>
                </Form>
              </div>
              {(error && (
                <div>
                  <h3>Error de inicio de sesión</h3>
                  {error}
                </div>
              )) ||
                (loading && "Iniciando Sesión")}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Login;
