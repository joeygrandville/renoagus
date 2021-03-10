import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { transition } from "./common.styles";

const RadioGroup = withStyles(
  (t) => ({
    label: {
      display: "block",
      position: "relative",
      paddingLeft: 25,
      margin: "6px 0",
      cursor: "pointer",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      userSelect: "none",
      transition: transition(t, "all"),
      fontSize: 20,
      lineHeight: 1.3,
      "& input": { position: "absolute", opacity: 0, cursor: "pointer" },
      "&:hover input ~ [class*=radio-group-checkmark]": { backgroundColor: "#ccc" },
    },
    horizontal: { display: "inline-block", margin: t.spacing(0, 1.5, 0, 0) },
    checkmark: {
      position: "absolute",
      top: "2.5px",
      left: 0,
      height: 20,
      width: 20,
      backgroundColor: "#eee",
      borderRadius: "50%",
      transition: transition(t, "all"),
      "&:after": {
        content: '""',
        position: "absolute",
        display: "none",
        top: 6,
        left: 6,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#FFF",
        transition: transition(t, "all"),
      },
      "input:checked ~ &:after": { display: "block" },
    },
  }),
  { name: "radio-group", generateId: () => "" }
)(({ classes, horizontal, name, options, value, onChange }) => {
  if (!Array.isArray(options)) return null;
  const onFireChange = ({ target: { value } }) => {
    if (typeof onChange !== "function") return false;
    return onChange({ target: { name, value: parseInt(value, 0) || value } });
  };
  return options.map(({ id, text }) => (
    <label className={clsx("bg-radio", classes.label, { [classes.horizontal]: horizontal })} key={id}>
      {text}
      <input type="radio" value={id} checked={id === value} {...{ name }} onChange={onFireChange} />
      <span className={classes.checkmark} />
    </label>
  ));
});

export default RadioGroup;
