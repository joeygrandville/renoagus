import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/IconButton";
import React from "react";

const IconButton = ({ forwardRef, icon, tooltip, disabled, ...other }) => {
  const btn = (
    <Button size="small" ref={forwardRef} {...other} {...{ disabled }}>
      {icon}
    </Button>
  );
  if (tooltip && !disabled) return <Tooltip title={tooltip}>{btn}</Tooltip>;
  return btn;
};

export default IconButton;
