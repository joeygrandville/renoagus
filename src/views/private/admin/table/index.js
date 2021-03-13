import { Delete, GetApp, Publish } from "@material-ui/icons";
import { MTableBody } from "material-table";
import React from "react";
import MaterialTable from "../../../../components/Table";
import { useAdminContext } from "../context";
import useDownload from "../Download";
import Footer from "./Footer";
import { mapColumns } from "./columns";

const AdminTable = ({ onConfirm, onUploadChange }) => {
  const { handleDownload } = useDownload();
  const {
    store,
    actions: { onSubmit },
  } = useAdminContext();
  const data = store.invitados.filter((i) => !i.eliminado);
  const tableProps = {
    columns: mapColumns(store),
    options: { draggable: false, addRowPosition: "first" /* , maxBodyHeight: "calc(100vh - 140px)" */ },
    actions: [
      { icon: Delete, tooltip: "Eliminar", onClick: onConfirm },
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
    title: "Lista de Invitados",
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
