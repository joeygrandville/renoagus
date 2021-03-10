import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { handleEvent, isEmail, useValidation } from "../../../components/common";
import { useFbContext } from "../../../firebase/context";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

const schema = yup.object().shape({
  nombre: yup.string().required("Nombre Requerido"),
  email: yup
    .string()
    .test("", "Email Requerido", (v, c) =>
      c.parent.options.some((e) => e.id === c.parent.estado && e.text === "Confirmado") ? isEmail(v) : !v || isEmail(v)
    ),
  estado: yup.string().required("Nombre Requerido"),
  invitados: yup.number().nullable().required("Nombre Requerido"),
});

const names = [
  ["nombre", true],
  ["email", true],
  ["id", false, "nowrap", "max"],
  ["link", false, "nowrap", "max"],
  ["estado", true],
  ["invitados", true, true],
];

const AdminContextProvider = (props) => {
  const [invitado, setInvitado] = useState(undefined);
  const { error, validateSchema, clearError: onClearError } = useValidation(schema);
  const {
    user,
    db: { getInvitados, postInvitado, deleteInvitado, importInvitados },
    loaded,
    store: { options, invitados },
    setStore,
    parseInvitado,
  } = useFbContext();
  const { uid, email } = user || {};
  useEffect(() => {
    if (loaded) {
      getInvitados().then((invitados) => setStore((s) => ({ ...s, invitados })));
    }
  }, [getInvitados, setStore, loaded]);
  const actions = {
    onAdd: useCallback(() => setInvitado({ estado: options.find((e) => e.text === "Pendiente")?.id || "", invitados: 1 }), [options]),
    onCancel: useCallback(() => setInvitado(undefined), []),
    onClearError,
    onDelete: ({ id }) =>
      deleteInvitado(id, { uid, email }).then(() => setStore((s) => ({ ...s, invitados: s.invitados.filter((i) => i.id !== id) }))),
    onEdit: useCallback((i) => handleEvent(() => setInvitado(i)), []),
    onImport: (data, onSuccess) =>
      importInvitados(data, { uid, email })
        .then((invs) => {
          setStore((s) => ({
            ...s,
            invitados: [...(data.delExisting ? [] : s.invitados), ...invs].sort((a, b) => a.nombre.localeCompare(b.nombre)),
          }));
          if (typeof onSuccess !== "function") return false;
          return onSuccess();
        })
        .catch(console.log),
    onSubmit: (els) => {
      const parse = (i) => (i ? parseInt : (v) => v);
      const { id } = invitado || {};
      let inv = names.reduce((a, [k, f, i]) => (f && (!i || els[k]?.value) ? { ...a, [k]: parse(i)(els[k]?.value, 0) } : a), { id });
      const { valid } = actions.onValidate(inv);
      if (!valid) return false;
      inv = { id, ...parseInvitado(inv), history: { uid, email } };
      return postInvitado(inv)
        .then((i) => {
          setStore((s) => ({
            ...s,
            invitados: [
              ...(!s.invitados.some(({ id }) => id === i.id) ? [{ ...i, new: true }] : []),
              ...s.invitados
                .reduce(
                  (a, x) => [...a, x.id === i.id ? { ...i, new: undefined, modified: true } : { ...x, new: undefined, modified: undefined }],
                  []
                )
                .sort((a, b) => a.nombre.localeCompare(b.nombre)),
            ],
          }));
          return setInvitado(undefined);
        })
        .catch(console.log);
    },
    onValidate: useCallback((data) => validateSchema({ ...data, options }), [validateSchema, options]),
  };
  const data = invitados
    .filter((i) => !i.eliminado)
    .map((i) => {
      return {
        ...i,
        link: i.id ? `${window.location.origin}?rsvp=${i.id}#confirmation` : undefined,
        txEstado: i.estado ? options.find(({ id }) => id === i.estado)?.text : undefined,
      };
    });
  return <AdminContext.Provider value={{ actions, invitado, invitados, data, names, options, error }} {...props} />;
};

export default AdminContextProvider;
