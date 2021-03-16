import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { read as xlsx_read, utils as xlsx_utils } from "xlsx";
import Checkbox from "../../../../../components/Checkbox";
import { handleEvent } from "../../../../../components/common";
import IconButton from "../../../../../components/IconButton";
import { useFbContext } from "../../../../../firebase/context";
import HeadCell from "./HeadCell";

const useImport = ({ onSubmit }) => {
  const [{ open, data, paths, allChecked, delExisting }, setState] = useState({
    open: false,
    data: [],
    paths: [],
    allChecked: true,
    delExisting: true,
  });
  const onClose = handleEvent(() => setState((s) => ({ ...s, open: false })));
  const {
    store: { paths: fbPaths },
    parseInvitado,
  } = useFbContext();
  const anyPath = paths.filter((p) => fbPaths.find((f) => f.id === p.value)?.name === "nombre").length > 0;
  const onImport =
    typeof onSubmit === "function" && (delExisting || (data.filter((d) => d.checked).length > 0 && anyPath))
      ? handleEvent(() => {
          const d = {
            delExisting,
            invitados: !anyPath
              ? []
              : data
                  .filter((d) => d.checked)
                  .map((d) =>
                    paths
                      .filter((p) => p.value && d[p.imported])
                      .reduce((a, p) => {
                        const fbP = fbPaths.find((f) => f.id === p.value);
                        if (!fbP) return a;
                        return { ...a, [fbP.name]: d[p.imported] };
                      }, {})
                  )
                  .map(parseInvitado),
          };
          return onSubmit(d, () => setState((s) => ({ ...s, open: false })));
        })
      : undefined;
  const onChange = ({ target: { name, value, checked } }) =>
    setState((s) => {
      const [sId, path] = name.split("-");
      switch (path) {
        case "all":
          return { ...s, allChecked: checked, data: s.data.map((d) => ({ ...d, checked })) };
        case "checked":
          const dt = s.data.map((d) => (String(d.id) === sId ? { ...d, checked } : d));
          return { ...s, data: dt, allChecked: !dt.some((d) => !d.checked) };
        case "head":
          return { ...s, paths: s.paths.map((p) => (String(p.id) === sId ? { ...p, value } : p)) };
        case "delExisting":
          return { ...s, delExisting: checked };
        default:
          return s;
      }
    });
  const indeterminate = !allChecked && data.some((d) => d.checked);
  const importModal = (
    <Dialog {...{ open, onClose }} maxWidth="lg">
      <DialogTitle>
        <Grid container spacing={1} alignItems="center" wrap="nowrap">
          <Grid item xs>
            <Typography variant="h6">Importar Excel</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={onClose} tooltip="Cancelar">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={paths.length + 1} align="center">
                <Checkbox label="Eliminar datos existentes" name="-delExisting" checked={delExisting} {...{ onChange }} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox name="-all" checked={anyPath && allChecked} disabled={!anyPath} {...{ onChange, indeterminate }} />
              </TableCell>
              {paths.map((p) => (
                <HeadCell {...p} {...{ key: `head-${p.id}`, onChange, paths }} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, checked, ...invitado }) => (
              <TableRow key={`row-${id}`}>
                <TableCell>
                  <Checkbox name={`${id}-checked`} checked={anyPath && checked} disabled={!anyPath} {...{ onChange }} />
                </TableCell>
                {paths.map((p, ix) => (
                  <TableCell
                    key={`val${id}-${p.id}`}
                    align={ix > 0 ? "center" : undefined}
                    style={!checked || !p.value ? { opacity: 0.5 } : undefined}
                  >
                    {invitado[p.imported] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={paths.length + 1} align="center">
                {`Total seleccionados: ${data.filter((d) => d.checked).length}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        {onImport && (
          <Button variant="contained" onClick={onImport}>
            Importar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
  const onUploadChange = handleEvent(({ target: { files } }) => {
    try {
      var reader = new FileReader();
      reader.onload = function ({ target: { result } }) {
        const readedData = xlsx_read(result, { type: "binary" });
        const [head, ...rows] = xlsx_utils.sheet_to_json(readedData.Sheets[readedData.SheetNames[0]], { header: 1 });
        const reduce = (r, idx) => head.reduce((a, h, i) => ({ ...a, [h]: r.length > i ? r[i] : undefined }), { id: idx + 1, checked: true });

        setState((s) => ({
          ...s,
          allChecked: true,
          open: true,
          data: rows.reduce((a, r, i) => [...a, reduce(r, i)], []),
          paths: head.reduce((a, h, i) => [...a, { id: i + 1, imported: h, value: "" }], []),
          delExisting: false,
        }));
      };
      reader.readAsBinaryString(files[0]);
    } catch (ex) {
      console.log(ex);
    }
  });
  const onFireImport = useCallback((i) => setState((s) => ({ ...s, open: true, item: i })), []);
  return { importModal, onFireImport, onUploadChange };
};

export default useImport;
