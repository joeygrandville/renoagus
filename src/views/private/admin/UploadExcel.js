import { Publish } from "@material-ui/icons";
import React from "react";
import IconButton from "../../../components/IconButton";

const UploadButton = (props) => {
  return <IconButton tooltip="Importar Excel" icon={<Publish />} {...props} />;
};

export default UploadButton;
