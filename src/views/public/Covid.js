import { Grid, SvgIcon, withStyles } from "@material-ui/core";
import React from "react";
import { ReactComponent as HeMask } from "../../assets/he-mask.svg";
import { ReactComponent as SheMask } from "../../assets/she-mask.svg";
import { ReactComponent as Gel } from "../../assets/gel.svg";
import { ReactComponent as Distance } from "../../assets/distance.svg";

const Icon = withStyles({ root: { fontSize: "3em" } })(SvgIcon);

const Covid = withStyles((t) => ({ root: { marginBottom: t.spacing(2), "& p": { marginBottom: 0 } } }))(({ classes, ...other }) => (
  <Grid container alignItems="center" spacing={2} justify="flex-start" className={classes.root} {...other}>
    <Grid item xs={12}>
      <p style={{ marginTop: 0 }}>Disfrutemos de la fiesta y nos cuidemos entre todos.</p>
      <p>No olvides traer tu barbijo y mantener la distancia social</p>
    </Grid>
    <Grid item>
      <Icon component={Distance} viewBox="0 0 512 512" />
    </Grid>
    <Grid item>
      <Icon component={SheMask} viewBox="0 0 64 64" />
    </Grid>
    <Grid item>
      <Icon component={Gel} viewBox="0 0 64 64" />
    </Grid>
    <Grid item>
      <Icon component={HeMask} viewBox="0 0 512 512" />
    </Grid>
  </Grid>
));

export default Covid;
