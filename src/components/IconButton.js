import Button from "@material-ui/core/IconButton";
import React from "react";

const IconButton = ({ icon, ...other }) => (
  <Button size="small" {...other}>
    {icon}
  </Button>
);

export default IconButton;
