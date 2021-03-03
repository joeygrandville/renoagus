import { Input, TableCell, TableRow } from "@material-ui/core";
import { Clear, Delete, Edit, Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import IconButton from "../../components/IconButton";
import IntegerInput from "../../components/IntegerInput";
import SelectInput from "../../components/SelectInput";

const Field = ({ edit, error, name, state, onChange, onClearError, options, ...other }) => {
  const props = { name, value: state[name] || "", onChange, ...other, error: Boolean(error[name]) };
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

const Invitado = ({ disabled, names, onCancel, onDelete, onEdit, onValidate, invitado, ...other }) => {
  const [state, setState] = useState({});
  const [valid, setValid] = useState(false);
  const onChange = ({ target: { name: n, value } }) => setState((s) => ({ ...s, [n]: value, ready: true }));
  useEffect(() => {
    if (state.ready) setValid(onValidate(state).valid);
  }, [state, onValidate]);
  const { edit, options } = other;
  useEffect(() => {
    setValid(edit);
    setState(invitado || { estado: options.find((e) => e.text === "Pendiente")?.id, invitados: 1 });
  }, [edit, invitado, options]);
  return (
    <TableRow style={{ opacity: !edit && disabled ? 0.5 : 1 }}>
      {names.map(([name, isInput]) => (
        <TableCell key={name}>{(!isInput && (state[name] || "-")) || <Field {...{ name, state, onChange, ...other }} />}</TableCell>
      ))}
      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
        {(edit && (
          <>
            <IconButton type="submit" icon={<Save />} disabled={!valid} />
            <IconButton onClick={onCancel} icon={<Clear />} />
          </>
        )) || (
          <>
            <IconButton onClick={onEdit(invitado)} icon={<Edit />} />
            <IconButton onClick={onDelete(invitado)} icon={<Delete />} {...{ disabled }} />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Invitado;
