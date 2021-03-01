import React, { useContext, useEffect, useState } from "react";
import app from "./firebaseConfig";

const Auth = React.createContext();

export const AuthContext = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((u) => setUser(u));
  }, []);

  const signOut = () => app.auth().signOut();

  return <Auth.Provider value={{ user, app, signOut }} {...props} />;
};

export const useAuth = () => useContext(Auth);
