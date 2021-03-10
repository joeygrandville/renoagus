import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/IconButton";
import React from "react";

const IconButton = ({ icon, tooltip, disabled, ...other }) => {
  const btn = (
    <Button size="small" {...other} {...{ disabled }}>
      {icon}
    </Button>
  );
  if (tooltip && !disabled) return <Tooltip title={tooltip}>{btn}</Tooltip>;
  return btn;
};

export default IconButton;
