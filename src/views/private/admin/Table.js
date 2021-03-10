import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Add, AlternateEmail, Fingerprint, Link, Person, PlusOne, QueryBuilder } from "@material-ui/icons";
import React from "react";
import { handleEvent } from "../../../components/common";
import { withAdminTableStyles } from "../../../components/common.styles";
import IconButton from "../../../components/IconButton";
import { useAdminContext } from "./context";
import DownloadButton from "./DownloadJson";
import Footer from "./Footer";
import Invitado from "./Invitado";
import UploadButton from "./UploadExcel";

const HeadCell = ({ icon, text, children, ...props }) => (
  <TableCell {...props}>
    <Grid container wrap="nowrap" spacing={1} alignItems="center">
      <Grid className="admin-th-icon" item>
        {icon}
      </Grid>
      <Grid className="admin-th-title" item>
        {text}
      </Grid>
      {children}
    </Grid>
  </TableCell>
);

const AdminTable = withAdminTableStyles(({ onConfirm, onUploadChange, classes }) => {
  const {
    actions: { onAdd },
    data,
    invitado,
  } = useAdminContext();
  const onUpload = handleEvent(() => document.querySelector("#upload-input").click());
  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <HeadCell icon={<Person />} text="Invitado" />
          <HeadCell icon={<AlternateEmail />} text="Email" />
          <HeadCell className="max" icon={<Fingerprint />} text="Código" />
          <HeadCell className="max" icon={<Link />} text="Link" />
          <HeadCell icon={<QueryBuilder />} text="Estado" />
          <HeadCell colSpan={2} icon={<PlusOne />} text="Invitados">
            {data.length && (
              <Grid item className="nowrap">
                <UploadButton onClick={onUpload} />
                <DownloadButton />
                <IconButton tooltip="Nuevo Invitado" onClick={onAdd} disabled={Boolean(invitado)} icon={<Add />} />
              </Grid>
            )}
            <input
              id="upload-input"
              accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              type="file"
              value=""
              onChange={onUploadChange}
            />
          </HeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {invitado && !invitado.id && <Invitado edit {...{ invitado }} />}
        {(!data.length && !invitado && (
          <TableRow>
            <TableCell align="center" colSpan={6}>
              No hay datos
            </TableCell>
            <TableCell align="right" className="np-l nowrap">
              <UploadButton onClick={onUpload} />
              <IconButton tooltip="Nuevo Invitado" onClick={onAdd} disabled={Boolean(invitado)} icon={<Add />} />
            </TableCell>
          </TableRow>
        )) ||
          data.map((inv) => (
            <Invitado key={inv.id} disabled={Boolean(invitado)} {...{ onConfirm }} edit={(invitado || {}).id === inv.id} invitado={inv} />
          ))}
      </TableBody>
      {data.length > 0 && <Footer />}
    </Table>
  );
});

export default AdminTable;
