import { Grid, TableCell, TableFooter, TableRow, Tooltip } from "@material-ui/core";
import React from "react";
import { useAdminContext } from "./context";

const InvitadosFooter = () => {
  const { data, options } = useAdminContext();
  if (!data.length) return null;
  const groups = options.reduce((a, { id, text }) => {
    const invitaciones = data.filter(({ estado }) => estado === id).length;
    if (!invitaciones) return a;
    const invitados = data.filter(({ estado }) => estado === id).reduce((a, x) => a + x.invitados, 0);
    return [...a, { id, text, invitaciones, invitados }];
  }, []);
  const invitaciones = data.reduce((a, { invitados }) => a + 1, 0);
  const invitados = data.reduce((a, { invitados }) => a + invitados, 0);
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5}>
          <Grid container justify="space-around">
            {groups.map(({ id, text, invitaciones, invitados }) => (
              <Tooltip key={id} title="Invitaciones (Invitados)">
                <Grid item>{`${text}s: ${invitaciones} (${invitados})`}</Grid>
              </Tooltip>
            ))}
          </Grid>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Invitaciones (Invitados)">
            <span>{`Total: ${invitaciones} (${invitados})`}</span>
          </Tooltip>
        </TableCell>
        <TableCell>&nbsp;</TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default InvitadosFooter;
