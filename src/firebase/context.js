import React, { useContext, useEffect } from "react";
import { useFirebase } from "./";

const Firebase = React.createContext();

export const FbContextProvider = (props) => {
  const value = useFirebase();
  const {
    setStore,
    db: { getEstados, getPaths, getMenus, getSettings },
    loaded,
  } = value;
  useEffect(() => {
    if (!loaded) return;
    let mounted = true;
    if (mounted) {
      getEstados().then((estados) => setStore((s) => ({ ...s, estados, options: estados.map(({ id, estado }) => ({ id, text: estado })) })));
      getPaths().then((paths) => setStore((s) => ({ ...s, paths })));
      getMenus().then((menus) => setStore((s) => ({ ...s, menus })));
      getSettings().then((settings) => setStore((s) => ({ ...s, settings })));
    }
    return () => (mounted = false);
  }, [loaded]);
  return <Firebase.Provider value={value} {...props} />;
};

export const useFbContext = () => useContext(Firebase);
