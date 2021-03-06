import { Input as MuiInput, InputAdornment } from "@material-ui/core";
import React from "react";
import { withStylesInput } from "./common.styles";
import IntegerInput from "./IntegerInput";

const Input = withStylesInput(({ required, endAdornment, ...props }) => (
  <MuiInput fullWidth name="codigo" {...props} endAdornment={<InputAdornment position="end">{endAdornment || "*"}</InputAdornment>} />
));

export const StyleIntegerInput = (props) => <IntegerInput customInput={Input} {...props} />;

export default Input;
