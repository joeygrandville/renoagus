import { Grid, SvgIcon, withStyles } from "@material-ui/core";
import React from "react";
import { ReactComponent as HeMask } from "../../assets/he-mask.svg";
import { ReactComponent as SheMask } from "../../assets/she-mask.svg";
import { ReactComponent as Gel } from "../../assets/gel.svg";
import { ReactComponent as Distance } from "../../assets/distance.svg";

const Icon = withStyles({ root: { fontSize: 45 } })(SvgIcon);

const Covid = withStyles((t) => ({ root: { paddingTop: t.spacing(3), "& p": { marginTop: 0 } } }))(({ classes, ...other }) => (
  <Grid container alignItems="center" spacing={2} justify="flex-start" className={classes.root} {...other}>
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
    <Grid item xs={12}>
      <p>Recordá mantener la distancia, traer tu barbijo y alcohol, del sanitizante... del que se toma nos encargamos nosotros!</p>
    </Grid>
  </Grid>
));

export default Covid;
