import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { handleEvent } from "../../components/common";
import { useFbContext } from "../../firebase/context";

export const usePrivate = (isLogin) => {
  const auth = useFbContext();
  const history = useHistory();
  const { user } = auth;
  useEffect(() => {
    if (isLogin && user) history.replace("/admin");
    if (!isLogin && !user) history.replace("/login");
  }, [user, history, isLogin]);
  return auth;
};

const schema = yup.object().shape({
  nombre: yup.string().required("Nombre Requerido"),
  email: yup.string().email().required("Email Requerido"),
  estado: yup.string().required("Nombre Requerido"),
  invitados: yup.number().nullable().required("Nombre Requerido"),
});

const names = [["nombre", true], ["email", true], ["id"], ["link"], ["estado", true], ["invitados", true, true]];

export const useAdmin = () => {
  const [invitado, setInvitado] = useState(undefined);
  const [error, setError] = useState({});
  const {
    db: { getInvitados, postInvitado, deleteInvitado },
    loaded,
    store: { options, invitados },
    setStore,
  } = useFbContext();
  const onValidate = useCallback((data) => {
    try {
      schema.validateSync(data, { abortEarly: false });
      setError({});
      return { valid: true, error: {} };
    } catch (e) {
      let messages = {};
      if (typeof e?.inner === "object") {
        messages = e.inner.reduce((acc, error) => ({ ...acc, [error.path]: error.message }), {});
        setError(messages);
      }
      return { valid: false, error: messages };
    }
  }, []);
  const onClearError = useCallback(() => setError({}), []);
  const onAdd = useCallback(() => setInvitado({ estado: options.find((e) => e.text === "Pendiente")?.id || "", invitados: 1 }), [options]);
  const onEdit = useCallback((i) => handleEvent(() => setInvitado(i)), []);
  const onDelete = useCallback(
    ({ id }) => deleteInvitado(id).then(() => setStore((s) => ({ ...s, invitados: s.invitados.filter((i) => i.id !== id) }))),
    [deleteInvitado, setStore]
  );
  const onCancel = useCallback(() => setInvitado(undefined), []);
  const onSubmit = (els) => {
    const parse = (i) => (i ? parseInt : (v) => v);
    const { id } = invitado || {};
    const inv = names.reduce((a, [k, f, i]) => (f && (!i || els[k]?.value) ? { ...a, [k]: parse(i)(els[k]?.value, 0) } : a), { id });
    const { valid } = onValidate(inv);
    if (!valid) return false;
    return postInvitado(inv)
      .then((i) => {
        setStore((s) => ({
          ...s,
          invitados: [
            ...(!s.invitados.some(({ id }) => id === i.id) ? [{ ...i, new: true }] : []),
            ...s.invitados
              .reduce((a, x) => [...a, x.id === i.id ? { ...i, new: undefined, modified: true } : { ...x, new: undefined, modified: undefined }], [])
              .sort((a, b) => a.nombre.localeCompare(b.nombre)),
          ],
        }));
        return setInvitado(undefined);
      })
      .catch(console.log);
  };
  useEffect(() => {
    if (loaded) {
      getInvitados().then((invitados) => setStore((s) => ({ ...s, invitados })));
    }
  }, [getInvitados, setStore, loaded]);
  return { invitado, invitados, names, options, onAdd, onDelete, onEdit, onCancel, onSubmit, error, onValidate, onClearError };
};
