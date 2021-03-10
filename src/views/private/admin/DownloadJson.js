import { GetApp } from "@material-ui/icons";
import React from "react";
import { handleEvent } from "../../../components/common";
import IconButton from "../../../components/IconButton";
import { useFbContext } from "../../../firebase/context";

const DownloadButton = (props) => {
  const {
    store: { estados, invitados },
  } = useFbContext();
  const onClick = handleEvent(() => {
    const json = {
      estados: estados.reduce((a, { id, ...e }) => ({ ...a, [id]: { ...e } }), {}),
      invitados: invitados.reduce((a, { id, ...i }) => ({ ...a, [id]: { ...i } }), {}),
    };
    const fileData = JSON.stringify(json, "", 2);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  });
  return <IconButton tooltip="Descargar Datos" icon={<GetApp />} {...{ onClick }} {...props} />;
};

export default DownloadButton;
