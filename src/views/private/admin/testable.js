import { Grid, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { lazy, Suspense, useEffect, useState } from "react";
import shortid from "shortid";
import { useFbContext } from "../../../firebase/context";

const importIcon = (icon) => lazy(() => import(`@material-ui/icons/${icon}`).catch(() => import("@material-ui/icons/Help")));

const DynIcon = ({ icon }) => {
  const [view, setView] = useState(undefined);
  useEffect(() => {
    const loadIcon = async () => {
      const Icon = await importIcon(icon);
      return <Icon key={shortid.generate()} />;
    };
    loadIcon().then(setView);
  }, [icon]);
  return <Suspense fallback="">{view}</Suspense>;
};

const Test = () => {
  const {
    store: { paths },
  } = useFbContext();
  const cols = paths.filter((p) => p.active);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {cols.map((c) => (
            <TableCell key={`t-head-${c.id}`}>
              <Grid container spacing={2} alignItems="center" wrap="nowrap">
                {c.icon && (
                  <Grid item>
                    <DynIcon icon={c.icon} className="test" />
                  </Grid>
                )}
                <Grid item>{c.path}</Grid>
              </Grid>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default Test;
