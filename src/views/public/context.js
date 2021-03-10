import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQueryString } from "../../components/common";
import { useFbContext } from "../../firebase/context";

const PublicContext = createContext();

export const usePublicContext = () => useContext(PublicContext);

const anchors = ["home", "location", "confirmation", "reward"];

const date = new Date("2021-05-23T15:00:00Z");

const PublicContextProvider = (props) => {
  const {
    store: { estados: es, menus: ms },
    db: { getInvitado, postInvitado },
    parseInvitado,
  } = useFbContext();
  const estados = es.filter((e) => e.estado !== "Pendiente").map(({ id, descripcion, ...e }) => ({ id, text: descripcion, ...e }));
  const menus = ms.map(({ id, menu }) => ({ id, text: menu }));
  const [state, setState] = useState({ home: true, step: 0, loading: false, date, ...anchors.reduce((ac, a, i) => ({ ...ac, [a]: i === 0 }), {}) });
  const { rsvp } = useQueryString();
  const showLoading = useCallback(() => setState((s) => ({ ...s, loading: true })), []);
  const hideLoading = useCallback(() => setState((s) => ({ ...s, loading: false })), []);
  const onValidate = useCallback(
    (id) =>
      new Promise((res, rej) => {
        showLoading();
        return getInvitado(id)
          .then((invitado) => {
            if (invitado.eliminado) throw new Error("Invitación no encontrada");
            setState((s) => ({ ...s, invitado, step: 1, loading: false }));
            return res(invitado);
          })
          .catch(rej)
          .finally(hideLoading);
      }),
    [getInvitado, showLoading, hideLoading]
  );
  const onConfirm = useCallback(
    (inv) =>
      new Promise((res, rej) => {
        showLoading();
        return postInvitado({ id: inv.id, ...parseInvitado(inv), history: { uid: "rsvp" } })
          .then((invitado) => {
            setState((s) => ({ ...s, invitado, step: 2, loading: false }));
            return res(invitado);
          })
          .catch(rej)
          .finally(hideLoading);
      }),
    [postInvitado, showLoading, hideLoading, parseInvitado]
  );
  const onResponseBack = useCallback(() => setState((s) => ({ ...s, step: 1, back: true })), []);
  const actions = {
    onLeave: useCallback(
      (origin, destination) =>
        setState((s) => {
          return { ...s, ...anchors.reduce((ac, a) => ({ ...ac, [a]: origin.anchor !== a && destination.anchor === a }), {}) };
        }),
      []
    ),
    onValidate,
    onConfirm,
    onResponseBack,
    showLoading,
    hideLoading,
  };
  useEffect(() => {
    setState((s) => ({ ...s, rsvp, loading: Boolean(rsvp) }));
    if (rsvp) onValidate(rsvp);
  }, [rsvp, onValidate]);
  useEffect(() => {
    require("./index.css");
  }, []);
  return <PublicContext.Provider value={{ state, estados, anchors, actions, menus }} {...props} />;
};

export default PublicContextProvider;
