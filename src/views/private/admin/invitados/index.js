import React from "react";
import useConfirmDelete from "./ConfirmDelete";
import useImport from "./import";
import { useAdminContext } from "../context";
import AdminTable from "./Table";

const Invitados = () => {
  const {
    actions: { onDelete, onImport },
  } = useAdminContext();
  const { modal, onConfirm } = useConfirmDelete({ onSubmit: onDelete });
  const { importModal, onUploadChange } = useImport({ onSubmit: onImport });
  return (
    <>
      <AdminTable {...{ onConfirm, onUploadChange }} />
      {modal}
      {importModal}
    </>
  );
};

export default Invitados;
