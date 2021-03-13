import { Grid, TableCell } from "@material-ui/core";
import React from "react";
import DynIcon from "../../../../components/DynamicIcon";
import SelectInput from "../../../../components/SelectInput";
import { useFbContext } from "../../../../firebase/context";

const HeadCell = ({ id, imported, onChange, paths, value }) => {
  const {
    store: { paths: fbPaths },
  } = useFbContext();
  const options = fbPaths
    .filter((fbP) => fbP.type && fbP.name !== "estado" && !paths.some((p) => p.id !== id && fbP.id === p.value))
    .map((p) => ({ ...p, text: p.path }));
  const icon = options.find((o) => o.id === value)?.icon;
  return (
    <TableCell key={`head-${id}`} style={!value ? { opacity: 0.5 } : undefined}>
      <Grid container spacing={2} wrap="nowrap" alignItems="center">
        {icon && (
          <Grid item style={{ lineHeight: 1 }}>
            <DynIcon {...{ icon }} />
          </Grid>
        )}
        <Grid item style={{ flexGrow: 1 }}>
          <div>{imported}</div>
          <SelectInput allowClear name={`${id}-head`} {...{ value, options, onChange }} />
        </Grid>
      </Grid>
    </TableCell>
  );
};

export default HeadCell;
