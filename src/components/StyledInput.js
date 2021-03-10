import { FormControl, FormHelperText, Input as MuiInput, InputAdornment } from "@material-ui/core";
import React from "react";
import { withStylesInput } from "./common.styles";
import IntegerInput from "./IntegerInput";

const Input = withStylesInput(({ required, endAdornment, error, ...props }) => (
  <FormControl fullWidth error={Boolean(error)}>
    <MuiInput
      name="codigo"
      {...props}
      endAdornment={(required || endAdornment) && <InputAdornment position="end">{endAdornment || "*"}</InputAdornment>}
    />
    {typeof error === "string" && <FormHelperText error>{error}</FormHelperText>}
  </FormControl>
));

export const StyleIntegerInput = (props) => <IntegerInput customInput={Input} {...props} />;

export default Input;
