import React, { useContext, useEffect, useState } from "react";
import app from "./firebaseConfig";

const Auth = React.createContext();

export const AuthContext = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((u) => setUser(u));
  }, []);

  return <Auth.Provider value={{ user, app }} {...props} />;
};

export const useAuth = () => useContext(Auth);
