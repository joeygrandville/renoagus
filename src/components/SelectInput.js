import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { memo } from "react";
import { memProps } from "./common";

const SelectInput = memo(
  ({ label, options, fullWidth, ...other }) => (
    <FormControl fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select {...other}>
        {options.map(({ id, text }) => (
          <MenuItem key={id} value={id}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
  memProps(["value", "error", "options", "placeholder"])
);

export default SelectInput;
