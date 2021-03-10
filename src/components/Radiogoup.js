import { makeStyles } from "@material-ui/core";
import React from "react";
import { transition } from "./common.styles";

const useStyles = makeStyles((t) => ({
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
    "& input": { display: "none" },
    "&:hover input ~ span.checkmark": { backgroundColor: "#ccc" },
    "& input:checked ~ span.checkmark:after": { display: "block" },
    "& span.checkmark": {
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
    },
  },
  horizontal: { display: "inline-block", margin: t.spacing(0, 1.5, 0, 0) },
}));

const RadioGroup = ({ horizontal, name, options, value, onChange }) => {
  const classes = useStyles();
  if (!Array.isArray(options)) return null;
  const onFireChange = ({ target: { value } }) => {
    if (typeof onChange !== "function") return false;
    return onChange({ target: { name, value: parseInt(value, 0) || value } });
  };
  return options.map(({ id, text }) => (
    <label className={`bg-radio ${classes.label}${horizontal ? ` ${classes.horizontal}` : ""}`} key={id}>
      {text}
      <input type="radio" value={id} checked={id === value} {...{ name }} onChange={onFireChange} />
      <span className="checkmark" />
    </label>
  ));
};

export default RadioGroup;
