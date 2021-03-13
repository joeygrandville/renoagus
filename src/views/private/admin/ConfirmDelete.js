import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { handleEvent } from "../../../components/common";
import IconButton from "../../../components/IconButton";

const useConfirmDelete = ({ onSubmit }) => {
  const [{ open, item }, setState] = useState({ open: false });
  const onClose = handleEvent(() => setState((s) => ({ ...s, open: false })));
  const onDelete =
    item &&
    typeof onSubmit === "function" &&
    handleEvent(() => {
      setState((s) => ({ ...s, open: false }));
      return onSubmit(item);
    });
  const modal = (
    <Dialog {...{ open, onClose }} PaperComponent={Paper}>
      <DialogContent>
        <Grid container spacing={1} alignItems="center" wrap="nowrap">
          <Grid item xs>
            <Typography>Eliminar Invitado</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose} tooltip="Cancelar">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        {item && (
          <>
            <DialogContentText>
              {`Se eliminará a `}
              <b>{item.nombre}</b>.
            </DialogContentText>
            <DialogContentText>Está seguro de eliminarlo?</DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={onClose}>
          Cancelar
        </Button>
        {onDelete && (
          <Button variant="contained" onClick={onDelete}>
            Si - Eliminar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
  const onConfirm = useCallback((_e, i) => setState((s) => ({ ...s, open: true, item: i })), []);
  return { modal, onConfirm };
};

export default useConfirmDelete;
