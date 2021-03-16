import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { isEmail } from "../components/common";
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
        .sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
    }),
  getInvitado: (id) =>
    new Promise((res, rej) =>
      once(`invitados/${id}`).then((s) => {
        const val = s.val();
        if (!val) return rej({ message: "Código no válido" });
        return res({ id, ...val });
      })
    ),
  getEstados: () => {
    let r = ref("estados").orderByChild("orden");
    return once(null, r).then((s) => {
      const val = s.val();
      if (!val) {
        r = ref().child("estados");
        return [
          { estado: "Pendiente" },
          { descripcion: "Sí asistiré", details: true, estado: "Confirmado" },
          { descripcion: "No podré asistir", estado: "Rechazado" },
        ].reduce((a, item, orden) => {
          const e = { ...item, orden };
          const id = r.push(e).key;
          return [...a, { id, ...e }];
        }, []);
      }
      return Object.keys(val).reduce((a, k) => [...a, { id: k, ...val[k] }], []);
    });
  },
  getPaths: () => {
    let r = ref("paths").orderByChild("orden");
    return once(null, r).then((s) => {
      const val = s.val();
      if (!val) {
        r = ref().child("paths");
        return [
          { default_val: null, icon: "Person", name: "nombre", orden: 0, path: "Nombre", required: true, type: "string" },
          { default_val: null, icon: "AlternateEmail", name: "email", orden: 1, path: "Email", required: false, type: "email" },
          { default_val: null, icon: "Fingerprint", name: "id", orden: 2, path: "Código", required: null, type: null },
          { default_val: null, icon: "Link", name: "link", orden: 3, path: "Link", required: null, type: null },
          { default_val: "Pendiente", icon: "QueryBuilder", name: "estado", orden: 4, path: "Estado", required: true, type: "select:estados:estado" },
          { default_val: 1, icon: "PlusOne", name: "invitados", orden: 5, path: "Invitados", required: true, type: "integer" },
          { default_val: null, icon: "PermContactCalendar", name: "edad", orden: 6, path: "Edad", required: false, type: "integer" },
          { default_val: null, icon: "Phone", name: "telefono", orden: 7, path: "Teléfono", required: false, type: "phone" },
          { default_val: "Regular", icon: "Restaurant", name: "menu", orden: 8, path: "Menú", required: true, type: "select:menus:menu" },
        ].reduce((a, p) => {
          const id = r.push({ ...p, active: true }).key;
          return [...a, { id, ...p, active: true }];
        }, []);
      }
      return Object.keys(val).reduce((a, k) => [...a, { id: k, ...val[k] }], []);
    });
  },
  getMenus: () => {
    let r = ref("menus").orderByChild("orden");
    return once(null, r).then((s) => {
      const val = s.val();
      if (!val) {
        r = ref().child("menus");
        return [{ menu: "Celíaco" }, { menu: "Regular" }, { menu: "Vegetariano" }].reduce((a, p) => {
          const id = r.push({ ...p, active: true }).key;
          return [...a, { id, ...p, active: true }];
        }, []);
      }
      return Object.keys(val).reduce((a, k) => [...a, { id: k, ...val[k] }], []);
    });
  },
  postInvitado: ({ id, history, ...other }) =>
    new Promise((res, rej) => {
      try {
        const h = { ...history, date: new Date().getTime(), value: other };
        if (!id) {
          const i = ref()
            .child("invitados")
            .push({ ...other, history: [h] }).key;
          return res({ id: i, ...other });
        }
        const r = ref(`invitados/${id}`);
        r.get().then((s) => {
          const val = s.val();
          if (!val) return rej("Invitado no encontrado");
          return r.set({ ...other, history: [...(Array.isArray(val.history) ? val.history : []), h] }).then(() => res({ id, ...other }));
        });
      } catch (err) {
        return rej(err);
      }
    }),
  deleteInvitado: (id, hist) =>
    new Promise((res, rej) => {
      try {
        const r = ref(`invitados/${id}`);
        r.get()
          .then((s) => {
            const val = s.val();
            if (!val || val.eliminado) return rej("Invitado no encontrado");
            const { history, ...other } = val;
            const h = { ...hist, date: new Date().getTime(), value: { ...other, eliminado: true } };
            r.set({ ...h.value, history: [...(Array.isArray(history) ? history : []), h] })
              .then(res)
              .catch(rej);
          })
          .catch(rej);
      } catch (ex) {
        return rej(ex);
      }
    }),
  importInvitados: ({ delExisting, invitados }, hist) =>
    new Promise((res, rej) => {
      const r = ref("invitados");
      const h = { ...hist, import: true, date: new Date().getTime() };
      const importNow = () => {
        try {
          const result = invitados.reduce((a, i) => {
            const id = r.push({ ...i, history: [{ ...h, value: i }] }).key;
            return [...a, { id, ...i }];
          }, []);
          return res(result);
        } catch (ex) {
          return rej(ex);
        }
      };
      if (delExisting)
        return once(null, r)
          .then((sInvitados) => {
            const invitados = sInvitados.val();
            if (invitados)
              return Promise.all(
                Object.keys(invitados).map(
                  (key) =>
                    new Promise((iRes, iRej) => {
                      const iR = ref(`invitados/${key}`);
                      iR.get()
                        .then((sInvitado) => {
                          const invitado = sInvitado.val();
                          if (invitado?.eliminado) return iRes("Invitado ya eliminado");
                          const { history, ...other } = invitado;
                          const iHist = { ...h, value: { ...other, eliminado: true } };
                          iR.set({ ...iHist.value, history: [...(Array.isArray(history) ? history : []), iHist] })
                            .then(iRes)
                            .catch(iRej);
                        })
                        .catch(iRej);
                    })
                )
              )
                .then(importNow)
                .catch(rej);
            return importNow();
          })
          .catch(rej);
      return importNow();
    }),
  getSettings: () =>
    once("settings").then((s) => {
      const val = s.val();
      if (!val) {
        const nval = {
          wamsg:
            "¡¡FORMALIZAMOS!! y queremos compartirlo con ustedes.\r\nPor favor confirmá si podrás acompañarnos el 23 de Mayo, ingresando al siguiente link:\r\n{{url}}\r\nPodés hacerlo hasta el 23 de abril",
          wadesk: true,
        };
        ref("settings").set(nval);
        return nval;
      }
      console.log(val);
      return val;
    }),
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
      new Promise((res, rej) => {
        if (!loaded) return rej({ mesage: "App was not initialized. Please try again" });
        return app.auth().signInWithEmailAndPassword(username, password).then(res).catch(rej);
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
  const parseInvitado = (i) => {
    const errors = [];
    const result = store.paths
      .filter((p) => !!p.type)
      .reduce((a, { default_val, name, required, type: t }) => {
        const [type, source, srcname] = t.split(":");
        let value;
        switch (type) {
          case "string":
          case "phone":
          case "email":
            value = String(i[name] || "").trim();
            if (!value && default_val) value = default_val;
            if (type === "email" && value && !isEmail(value)) errors.push({ name, msg: "Email not valid" });
            break;
          case "integer":
            value = parseInt(i[name], 0);
            if (Number.isNaN(value)) value = 0;
            if (!value && default_val >= 0) value = default_val;
            break;
          case "select":
            value = String(i[name] || "").trim();
            if (!value && default_val)
              try {
                value = store[source].find((s) => s[srcname] === default_val)?.id;
              } catch (_e) {}
            break;
          default:
        }
        if (required && !value) errors.push({ name, msg: "Value required" });
        if (!value) return a;
        return { ...a, [name]: value };
      }, {});
    if (errors.length > 0) throw new Error(errors.reduce((a, { name, msg }) => `${a}${name}: ${msg}`, ""));
    return result;
  };
  return { ...state, store, setStore, signIn, signOut, parseInvitado, db };
};
