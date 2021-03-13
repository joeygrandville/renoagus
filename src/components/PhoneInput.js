import React, { memo } from "react";
import MaskedInput from "react-text-mask";
import { FormControl, Input, FormHelperText } from "@material-ui/core";
import { memProps } from "./common";

export const mask = [/[1-9]/, /\d/, /\d/, " ", /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/];

const PhoneMaskedInput = ({ inputRef, ...other }) => {
  return <MaskedInput {...other} ref={(ref) => inputRef(ref ? ref.inputElement : null)} {...{ mask }} placeholderChar={"\u2000"} showMask />;
};

const PhoneInput = memo(({ error, fullWidth = true, ...other }) => {
  return (
    <FormControl {...{ fullWidth }} error={Boolean(error)}>
      <Input {...other} inputComponent={PhoneMaskedInput} />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}, memProps(["value", "error"]));

export default PhoneInput;
