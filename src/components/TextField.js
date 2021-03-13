import { TextField as MuiInput } from "@material-ui/core";
import React from "react";

const TextField = ({ fullWidth = true, error, ...props }) => (
  <MuiInput fullWidth error={!!error} helperText={typeof error === "string" ? error : undefined} {...props} />
);

export default TextField;
