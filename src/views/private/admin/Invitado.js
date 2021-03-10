import { Input, TableCell, TableRow } from "@material-ui/core";
import { Clear, Delete, Edit, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import IconButton from "../../../components/IconButton";
import IntegerInput from "../../../components/IntegerInput";
import SelectInput from "../../../components/SelectInput";
import { useAdminContext } from "./context";

const Field = ({ className, edit, isInput, name, state, onChange, ...other }) => {
  const { error, options } = useAdminContext();
  const props = { name, value: state[name] || "", onChange, ...other, error: Boolean(error[name]) };
  if (!isInput)
    return (
      <div {...{ className }}>
        {(name === "link" && props.value && (
          <a href={props.value} rel="noreferrer" target="_blank">
            {props.value}
          </a>
        )) ||
          props.value ||
          "-"}
      </div>
    );
  if (!edit)
    switch (name) {
      case "estado":
        return state.txEstado || "-";
      case "invitados":
        return <div style={{ textAlign: "center" }}>{props.value || "-"}</div>;
      default:
        return props.value || "-";
    }
  switch (name) {
    case "invitados":
      return <IntegerInput fullWidth {...props} />;
    case "estado":
      return <SelectInput fullWidth {...props} {...{ options }} />;
    default:
      return <Input fullWidth {...props} />;
  }
};

const Invitado = ({ disabled, onConfirm, edit, invitado }) => {
  const [state, setState] = useState(invitado || {});
  const [valid, setValid] = useState(false);
  const {
    error,
    names,
    actions: { onEdit, onCancel, onValidate },
  } = useAdminContext();
  const onChange = ({ target: { name: n, value } }) => setState((s) => ({ ...s, [n]: value, ready: true }));
  useEffect(() => {
    if (state.ready) setValid(onValidate(state).valid);
  }, [state, onValidate]);
  useEffect(() => {
    setValid(edit);
  }, [edit]);
  useEffect(() => {
    setValid(!Object.keys(error).length);
  }, [error]);
  return (
    <TableRow style={{ opacity: !edit && disabled ? 0.5 : 1 }}>
      {names.map(([name, isInput, className, cellCss]) => (
        <TableCell key={name} className={cellCss}>
          <Field {...{ className, edit, isInput, name, state, onChange }} />
        </TableCell>
      ))}
      <TableCell className="np-l nowrap" align="right">
        {(edit && (
          <>
            <IconButton tooltip="Guardar" type="submit" icon={<Save />} disabled={!valid} />
            <IconButton tooltip="Cancelar" onClick={onCancel} icon={<Clear />} />
          </>
        )) || (
          <>
            <IconButton tooltip="Editar" onClick={onEdit(invitado)} icon={<Edit />} />
            <IconButton tooltip="Eliminar" onClick={() => onConfirm(invitado)} icon={<Delete />} {...{ disabled }} />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Invitado;
