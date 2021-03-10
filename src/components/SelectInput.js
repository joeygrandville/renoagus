import { FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { memo, useState } from "react";
import { handleEvent, memProps } from "./common";

const SelectInput = memo(({ allowClear, disabled, label, name, onChange, options, fullWidth, ...other }) => {
  const renderValue = (val) => {
    const value = (() => options.find(({ id: oid }) => String(oid) === String(val))?.text || "")();
    return (
      <Grid container wrap="nowrap">
        <Grid item style={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </Grid>
        <Grid item style={{ height: 15, marginTop: -2 }}>
          <IconButton
            size="small"
            onClick={handleEvent(() => {
              if (typeof onChange === "undefined") return false;
              return onChange({ target: { name, value: "" } });
            })}
          >
            <Close style={{ fontSize: 18 }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  };
  const [open, setOpen] = useState(false);
  const props = {
    disabled,
    input: <Input onClick={disabled ? undefined : handleEvent(() => setOpen((ps) => !ps))} />,
    name,
    onChange,
    open,
    renderValue: allowClear && !disabled ? renderValue : undefined,
    ...other,
  };
  return (
    <FormControl {...{ fullWidth }}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select {...props}>
        {options.map(({ id, text }) => (
          <MenuItem key={id} value={id}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}, memProps(["allowClear", "value", "error", "options", "placeholder"]));

export default SelectInput;
