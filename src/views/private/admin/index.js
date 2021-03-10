import React from "react";
import Form from "../../../components/Form";
import useConfirmDelete from "./ConfirmDelete";
import useImport from "./import";
import Layout from "../Layout";
import Table from "./Table";
import AdminContextProvider, { useAdminContext } from "./context";

const AdminWrapper = () => {
  const {
    actions: { onDelete, onSubmit, onImport },
  } = useAdminContext();
  const { modal, onConfirm } = useConfirmDelete({ onSubmit: onDelete });
  const { importModal, onUploadChange } = useImport({ onSubmit: onImport });
  return (
    <>
      <Form {...{ onSubmit }}>
        <Table {...{ onConfirm, onUploadChange }} />
      </Form>
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
