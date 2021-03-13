import React, { createContext, useCallback, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { isEmail, useValidation } from "../../../components/common";
import { useFbContext } from "../../../firebase/context";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

const schema = yup.object().shape({
  nombre: yup.string().required("Nombre Requerido"),
  email: yup
    .string()
    .test("", "Email Requerido", (v, c) =>
      c.parent.estados.some((e) => e.id === c.parent.estado && e.estado === "Confirmado") ? isEmail(v) : !v || isEmail(v)
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
  const { error, validateSchema, clearError: onClearError } = useValidation(schema);
  const {
    user,
    db: { getInvitados, postInvitado, deleteInvitado, importInvitados },
    loaded,
    store,
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
    onClearError,
    onDelete: ({ id }) =>
      deleteInvitado(id, { uid, email }).then(() => setStore((s) => ({ ...s, invitados: s.invitados.filter((i) => i.id !== id) }))),
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
    onSubmit: async (params) => {
      const { id, ...invitado } = params;
      const inv = { id, ...parseInvitado(invitado), history: { uid, email } };
      const i = await postInvitado(inv);
      setStore((s) => ({
        ...s,
        invitados: [
          ...(!s.invitados.some(({ id }) => id === i.id) ? [{ ...i, new: true }] : []),
          ...s.invitados
            .reduce((a, x) => [...a, x.id === i.id ? { ...i, new: undefined, modified: true } : { ...x, new: undefined, modified: undefined }], [])
            .sort((a, b) => a.nombre.localeCompare(b.nombre)),
        ],
      }));
    },
    onValidate: useCallback((data) => validateSchema({ ...data }), [validateSchema]), // TODO fix
  };
  return <AdminContext.Provider value={{ actions, error, names, store }} {...props} />;
};

export default AdminContextProvider;
