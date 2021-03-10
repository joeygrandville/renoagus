import { Checkbox as MuiCheckbox, FormControlLabel, FormHelperText, FormControl } from "@material-ui/core";
import React from "react";

export const Checkbox = ({ error, indeterminate, ...other }) => {
  return (
    <FormControl error={Boolean(error)}>
      <FormControlLabel {...other} control={<MuiCheckbox size="small" {...{ indeterminate }} />} />
      {typeof error === "string" && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
