import { FormHelperText, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BgButton from "../../../components/BgButton";
import { withRsvpStepStyles } from "../../../components/common.styles";
import Form from "../../../components/Form";
import TextField from "../../../components/StyledInput";
import { usePublicContext } from "../context";

const RsvpStep1 = withRsvpStepStyles(({ classes }) => {
  const {
    state: { rsvp, loading: disabled },
    actions: { onValidate },
  } = usePublicContext();

  const [{ error, value }, setState] = useState({ error: "", value: "" });
  const onChange = ({ target: { value } }) => setState((s) => ({ ...s, value, error: value ? "" : "El código es requerido" }));
  const onSubmit = ({ codigo: { value } }) => {
    onChange({ target: { value } });
    if (!value) return false;
    return onValidate(value).catch(({ message }) => setState((s) => ({ ...s, error: message })));
  };
  const history = useHistory();
  useEffect(() => {
    setState((s) => {
      if (rsvp) {
        setTimeout(() => {
          onSubmit({ codigo: { value: rsvp } });
          history.replace(`/?rsvp=${rsvp}#confirmation`);
        }, 100);
      }
      return { ...s, value: rsvp || s.value };
    });
  }, [rsvp]);
  return (
    <>
      <h3>Si recibiste un código de invitación, ingresalo abajo para confirmar tu asistencia.</h3>
      <h3>Podés hacerlo hasta el 23 de Abril.</h3>
      <Form {...{ onSubmit }}>
        <Grid container spacing={2} wrap="nowrap" className={classes.container} justify="flex-end">
          <Grid item className={classes.label}>
            Código
          </Grid>
          <Grid item xs>
            <TextField
              name="codigo"
              required
              error={Boolean(error)}
              {...{ onChange, value, disabled }}
              endAdornment={disabled && <i className="fa fa-sync-alt fa-spin" />}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </Grid>
          <Grid item className="hide-xs">
            <BgButton type="submit" {...{ disabled }}>
              Validar
            </BgButton>
          </Grid>
        </Grid>
        <Grid container className={`${classes.container} show-xs`} justify="flex-end">
          <Grid item>
            <BgButton type="submit" {...{ disabled }}>
              Validar
            </BgButton>
          </Grid>
        </Grid>
      </Form>
    </>
  );
});

export default RsvpStep1;
