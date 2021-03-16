import { Grid } from "@material-ui/core";
import { conformToMask } from "react-text-mask";
import { isEmail, rsvpHref } from "../../../../components/common";
import DynIcon from "../../../../components/DynamicIcon";
import IntegerInput from "../../../../components/IntegerInput";
import PhoneInput, { mask } from "../../../../components/PhoneInput";
import SelectInput from "../../../../components/SelectInput";
import TextField from "../../../../components/TextField";

export const mapColumns = (store) =>
  store.paths
    .filter((p) => p.active)
    .reduce((a, p) => {
      const column = {
        title: (
          <Grid container spacing={1} wrap="nowrap" alignItems="center">
            <Grid item style={{ lineHeight: 1 }}>
              <DynIcon icon={p.icon} />
            </Grid>
            <Grid item>{p.path}</Grid>
          </Grid>
        ),
        field: p.name,
      };
      const [type, source, name] = (p.type || "").split(":");
      const onChange = (col) => ({ target: { value } }) => col.onChange(value);
      column.editComponent = (col) => (
        <TextField onChange={onChange(col)} value={col.value || ""} error={col.helperText || col.error} placeholder={p.path} />
      );
      if (p.required) column.validate = (r) => !!r[p.name] || `${p.path} requerido`;
      column.initialEditValue = p.default_val;
      switch (type) {
        case "":
          column.editable = "never";
          column.cellStyle = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
          if (p.name === "link") {
            column.render = (r) => {
              if (!r.id) return "";
              const link = rsvpHref(r.id);
              return (
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              );
            };
            column.sorting = false;
          }
          break;
        case "select":
          const { def_val, lookup, options } = (Array.isArray(store[source]) &&
            store[source].reduce(
              (a, s) => ({
                lookup: { ...a.lookup, [s.id]: s[name] },
                options: [...a.options, { id: s.id, text: s[name] }],
                def_val: s[name] === p.default_val ? s.id : a.def_val,
              }),
              { lookup: {}, options: [] }
            )) || { lookup: {} };
          column.lookup = lookup;
          column.editComponent = (c) => <SelectInput {...{ options }} value={c.value} onChange={onChange(c)} error={c.helperText} />;
          column.initialEditValue = def_val;
          break;
        case "integer":
          column.cellStyle = { textAlign: "center" };
          column.editComponent = (c) => <IntegerInput value={c.value} onChange={onChange(c)} error={c.helperText} />;
          break;
        case "email":
          column.validate = (r) => !r.email || isEmail(r.email) || "Email no válido";
          break;
        case "phone":
          column.render = (r) => (r[p.name] ? conformToMask(r[p.name], mask).conformedValue : "");
          column.editComponent = (c) => <PhoneInput value={c.value} onChange={onChange(c)} error={c.helperText} />;
          break;
        default:
          break;
      }
      return [...a, column];
    }, []);

export const getColSpans = (paths) => {
  if (!Array.isArray(paths)) return {};
  const ps = paths.filter((p) => p.active);
  const left = ps.findIndex((p) => p.name === "invitados");
  if (left === -1) return {};
  return { left, right: ps.length - left };
};
