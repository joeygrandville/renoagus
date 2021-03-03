import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useCallback, useEffect, useState } from "react";
import initStore from "./initStore";

const env = (path) => process.env[`REACT_APP_FIREBASE_${path}`];

const projectId = env("PROJECT_ID");

const app = firebase.initializeApp({
  apiKey: env("API_KEY"),
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: env("SENDER_ID"),
  appId: env("APP_ID"),
});

const ref = (path) => app.database().ref(path);

const once = (path, r) => (r || ref(path)).once("value");

export const db = {
  getInvitados: () =>
    once("invitados").then((s) => {
      const val = s.val();
      if (!val) return [];
      return Object.keys(val)
        .reduce((a, k) => [...a, { id: k, ...val[k] }], [])
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
    }),
  getEstados: () => {
    let r = ref("estados").orderByChild("orden");
    return once(null, r).then((s) => {
      const val = s.val();
      if (!val) {
        r = ref().child("estados");
        return ["Pendiente", "Confirmado", "Rechazado"].reduce((a, estado, orden) => {
          const id = r.push({ estado, orden }).key;
          return [...a, { id, text: estado }];
        }, []);
      }
      return Object.keys(val).reduce((a, k) => [...a, { id: k, text: val[k].estado }], []);
    });
  },
  postInvitado: ({ id, nombre, email, estado, invitados }) =>
    new Promise((res, rej) => {
      try {
        const r = ref().child("invitados");
        if (!id) {
          const id = r.push({ nombre, email, estado, invitados }).key;
          res({ id, nombre, email, estado, invitados });
        }
        rej("update no implementado");
      } catch (err) {
        rej(err);
      }
    }),
  deleteInvitado: (id) => ref(`invitados/${id}`).remove(),
};

export const useFirebase = () => {
  const [state, setState] = useState({ loaded: false });
  const [store, setStore] = useState(initStore);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setState({ loaded: true, user }));
  }, []);
  const { loaded } = state;
  const signIn = useCallback(
    (username, password) =>
      new Promise((_res, rej) => {
        if (!loaded) {
          rej({ mesage: "App was not initialized. Please try again" });
          return;
        }
        return app.auth().signInWithEmailAndPassword(username, password);
      }),
    [loaded]
  );
  const signOut = useCallback(
    () =>
      new Promise((_res, rej) => {
        if (!loaded) {
          rej({ mesage: "App was not initialized. Please try again" });
          return;
        }
        return app.auth().signOut();
      }),
    [loaded]
  );
  return { ...state, store, setStore, signIn, signOut, db };
};
