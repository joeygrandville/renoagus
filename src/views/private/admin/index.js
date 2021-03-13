import React from "react";
import useConfirmDelete from "./ConfirmDelete";
import useImport from "./import";
import Layout from "../Layout";
import AdminContextProvider, { useAdminContext } from "./context";
import AdminTable from "./table/index";

const AdminWrapper = () => {
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

const Admin = () => (
  <Layout>
    <AdminContextProvider>
      <AdminWrapper />
    </AdminContextProvider>
  </Layout>
);

export default Admin;
