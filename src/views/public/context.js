import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQueryString } from "../../components/common";
import { useFbContext } from "../../firebase/context";

const PublicContext = createContext();

export const usePublicContext = () => useContext(PublicContext);

const anchors = ["home", "location", "confirmation", "reward"];

const date = new Date("2021-05-23T15:00:00Z");

const PublicContextProvider = (props) => {
  const {
    store: { estados: es },
    db: { getInvitado, postInvitado },
  } = useFbContext();
  const estados = es.filter((e) => e.estado !== "Pendiente").map(({ id, descripcion, ...e }) => ({ id, text: descripcion, ...e }));
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
        return postInvitado(inv)
          .then((invitado) => {
            setState((s) => ({ ...s, invitado, step: 2, loading: false }));
            return res(invitado);
          })
          .catch(rej)
          .finally(hideLoading);
      }),
    [postInvitado, showLoading, hideLoading]
  );
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
  return <PublicContext.Provider value={{ state, estados, anchors, actions }} {...props} />;
};

export default PublicContextProvider;
