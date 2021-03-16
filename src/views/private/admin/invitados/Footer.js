import { Grid, TableCell, TableFooter, TableRow, Tooltip } from "@material-ui/core";
import React from "react";
import { useAdminContext } from "../context";
import { getColSpans } from "./columns";

const InvitadosFooter = () => {
  const { store } = useAdminContext();
  const data = store.invitados.filter((i) => !i.eliminado);
  const { left, right } = getColSpans(store.paths);
  if (!data.length || (!left && !right)) return null;
  const groups = store.estados.reduce((a, { id, estado }) => {
    const invitaciones = data.filter(({ estado }) => estado === id).length;
    if (!invitaciones) return a;
    const invitados = data.filter(({ estado }) => estado === id).reduce((a, x) => a + x.invitados, 0);
    return [...a, { id, text: estado, invitaciones, invitados }];
  }, []);
  const invitaciones = data.reduce((a, { invitados }) => a + 1, 0);
  const invitados = data.reduce((a, { invitados }) => a + invitados, 0);
  return (
    <TableFooter>
      <TableRow>
        {left && (
          <TableCell colSpan={left}>
            <Grid container justify="space-around">
              {groups.map(({ id, text, invitaciones, invitados }) => (
                <Tooltip key={id} title="Invitaciones (Invitados)">
                  <Grid item>{`${text}s: ${invitaciones} (${invitados})`}</Grid>
                </Tooltip>
              ))}
            </Grid>
          </TableCell>
        )}
        <TableCell align="center">
          <Tooltip title="Invitaciones (Invitados)">
            <span>{`Total: ${invitaciones} (${invitados})`}</span>
          </Tooltip>
        </TableCell>
        {right && <TableCell colSpan={right}>&nbsp;</TableCell>}
      </TableRow>
    </TableFooter>
  );
};

export default InvitadosFooter;
