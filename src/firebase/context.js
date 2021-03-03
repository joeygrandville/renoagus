import React, { useContext, useEffect } from "react";
import { useFirebase } from "./";

const Firebase = React.createContext();

export const FbContextProvider = (props) => {
  const value = useFirebase();
  const {
    setStore,
    db: { getEstados },
    loaded,
  } = value;
  useEffect(() => {
    if (!loaded) return;
    let mounted = true;
    if (mounted) getEstados().then((estados) => setStore((s) => ({ ...s, estados })));
    return () => (mounted = false);
  }, [getEstados, loaded, setStore]);
  return <Firebase.Provider value={value} {...props} />;
};

export const useFbContext = () => useContext(Firebase);
