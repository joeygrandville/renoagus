import { Delete, GetApp, Publish, WhatsApp } from "@material-ui/icons";
import { MTableBody } from "material-table";
import React from "react";
import { conformToMask } from "react-text-mask";
import MaterialTable from "../../../../components/Table";
import { useAdminContext } from "../context";
import useDownload from "./Download";
import Footer from "./Footer";
import { mapColumns } from "./columns";
import IconButton from "../../../../components/IconButton";
import { openLink, rsvpHref } from "../../../../components/common";
import { nsmask } from "../../../../components/PhoneInput";

const AdminTable = ({ onConfirm, onUploadChange }) => {
  const { handleDownload } = useDownload();
  const {
    store,
    actions: { onSubmit },
  } = useAdminContext();
  const {
    invitados,
    settings: { wamsg, wadesk },
  } = store;
  const data = invitados.filter((i) => !i.eliminado);
  const tableProps = {
    columns: mapColumns(store),
    options: { draggable: false, addRowPosition: "first" },
    actions: [
      { icon: Delete, tooltip: "Eliminar", onClick: onConfirm },
      {
        icon: ({ data, ...p }) => (!data?.telefono && <></>) || <IconButton icon={<WhatsApp />} tooltip="Enviar por WhatsApp" {...p} />,
        custom: true,
        onClick: ({ id, telefono }) => {
          const msg = wamsg.replace(/{{url}}/g, rsvpHref(id));
          const phone = conformToMask(telefono, nsmask).conformedValue;
          const waurl = wadesk ? "whatsapp://" : "https://web.whatsapp.com/";
          return openLink(`${waurl}send?l=es&phone=549${phone}&text=${encodeURI(msg)}`);
        },
      },
      ...(data.length ? [{ icon: GetApp, isFreeAction: true, tooltip: "Descargar Excel", onClick: handleDownload(true) }] : []),
      { icon: Publish, isFreeAction: true, tooltip: "Importar Excel", onClick: () => document.querySelector("#upload-input").click() },
    ],
    components: {
      Body: (p) => (
        <>
          <MTableBody {...p} />
          <Footer />
        </>
      ),
      Container: ({ children }) => <div className="scroll-table-y">{children}</div>,
    },
    data,
    onRowUpdate: onSubmit,
    onRowAdd: onSubmit,
  };
  return (
    <>
      <MaterialTable hidePaging {...tableProps} />
      <input
        id="upload-input"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        type="file"
        value=""
        onChange={onUploadChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default AdminTable;
