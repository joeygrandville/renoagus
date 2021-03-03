import { Input, withStyles } from "@material-ui/core";
import React, { memo } from "react";
import NumberFormat from "react-number-format";
import { memProps } from "./common";

export const IntegerInput = memo(
  withStyles({
    root: {
      "& input": {
        textAlign: "center",
      },
    },
  })(({ name, onChange, ...other }) => {
    const props = {
      ...other,
      name,
      onKeyPress: (e) => ![...Array(10).keys()].some((x) => String(x) === e.key) && e.preventDefault(),
      onValueChange: ({ floatValue }) => {
        if (typeof onChange !== "function") return;
        onChange({ target: { value: floatValue, name } });
      },
      customInput: Input,
      decimalScale: 0,
    };
    return <NumberFormat fullWidth {...props} />;
  }, memProps(["value", "error", "placeholder"]))
);

export default IntegerInput;
