import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Add, AlternateEmail, Fingerprint, Link, Person, PlusOne, QueryBuilder } from "@material-ui/icons";
import React from "react";
import Form from "../../components/Form";
import IconButton from "../../components/IconButton";
import { useAdmin } from "./common";
import Invitado from "./Invitado";

const HeadCell = ({ icon, text, ...props }) => (
  <TableCell {...props}>
    <Grid container wrap="nowrap" spacing={1} alignItems="center">
      <Grid item style={{ lineHeight: 1 }}>
        {icon}
      </Grid>
      <Grid item>{text}</Grid>
    </Grid>
  </TableCell>
);

const Admin = () => {
  const { invitado, loaded, invitados, onAdd, onSubmit, ...other } = useAdmin();
  const { options } = other;
  const data = invitados.map((i) => {
    const link = i.id ? `${window.location.origin}?rsvp=${i.id}#confirmation` : undefined;
    return {
      ...i,
      link: (
        <a rel="noreferrer" href={link} target="_blank">
          {link}
        </a>
      ),
      txEstado: i.estado ? options.find(({ id }) => id === i.estado)?.text : undefined,
    };
  });
  return (
    <Form {...{ onSubmit }}>
      <Table>
        <TableHead>
          <TableRow>
            <HeadCell icon={<Person />} text="Invitado" style={{ minWidth: 245 }} />
            <HeadCell icon={<AlternateEmail />} text="Email" style={{ minWidth: 245 }} />
            <HeadCell icon={<Fingerprint />} text="Código" />
            <HeadCell icon={<Link />} text="Link" />
            <HeadCell icon={<QueryBuilder />} text="Estado" style={{ width: 130 }} />
            <HeadCell icon={<PlusOne />} text="Invitados" style={{ width: 150 }} />
            <TableCell align="right" style={{ width: 92 }}>
              {(data.length && <IconButton onClick={onAdd} disabled={Boolean(invitado)} icon={<Add />} />) || " "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invitado && !invitado.id && <Invitado edit {...other} />}
          {(!data.length && !invitado && (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                No hay datos
              </TableCell>
              <TableCell align="right" style={{ width: 92 }}>
                <IconButton onClick={onAdd} disabled={Boolean(invitado)} icon={<Add />} />
              </TableCell>
            </TableRow>
          )) ||
            data.map((inv) => <Invitado key={inv.id} disabled={Boolean(invitado)} edit={(invitado || {}).id === inv.id} invitado={inv} {...other} />)}
        </TableBody>
      </Table>
    </Form>
  );
};

export default Admin;
