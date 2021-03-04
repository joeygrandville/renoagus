import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/IconButton";
import React from "react";

const IconButton = ({ icon, tooltip, ...other }) => {
  const btn = (
    <Button size="small" {...other}>
      {icon}
    </Button>
  );
  if (tooltip) return <Tooltip title={tooltip}>{btn}</Tooltip>;
  return btn;
};

export default IconButton;
