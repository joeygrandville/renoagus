import { Collapse, Grid } from "@material-ui/core";
import React, { useState } from "react";
import BgButton from "../../../components/BgButton";
import { withRsvpStepStyles } from "../../../components/common.styles";
import Form from "../../../components/Form";
import Input, { StyleIntegerInput } from "../../../components/StyledInput";
import { usePublicContext } from "../context";

const RsvpStep2 = withRsvpStepStyles(({ classes }) => {
  const {
    state: { invitado },
    estados,
    actions: { onConfirm },
  } = usePublicContext();
  const [state, setState] = useState(invitado);
  const { nombre, email, invitados, estado } = state;
  const details = estados.some((e) => e.id === estado && e.details);
  const onChange = ({ target: { name, value } }) => setState((s) => ({ ...s, [name]: value }));
  return (
    <Form onSubmit={() => onConfirm(state)}>
      <h3>{`¡Hola ${nombre}!`}</h3>
      <Grid container wrap="nowrap" spacing={2} className={classes.container}>
        <Grid item className={classes.label}>
          Podrás Asistir?
        </Grid>
        <Grid item>
          {estados.map(({ id, text }) => (
            <label className="confirmation-radio-container" key={id}>
              {text}
              <input type="radio" name="estado" value={id} checked={id === estado} {...{ onChange }} />
              <span className="checkmark" />
            </label>
          ))}
        </Grid>
      </Grid>
      <Collapse in={details}>
        <Grid container wrap="nowrap" spacing={2} className={classes.container}>
          <Grid item className={classes.label}>
            Cantidad De Invitados Confirmados
          </Grid>
          <Grid item xs>
            <StyleIntegerInput name="invitados" required value={invitados} {...{ onChange }} />
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={2} className={classes.container}>
          <Grid item className={classes.label}>
            Email
          </Grid>
          <Grid item xs>
            <Input name="email" required value={email} {...{ onChange }} />
          </Grid>
        </Grid>
      </Collapse>
      <Grid container justify="flex-end" spacing={2} className={classes.container}>
        <Grid item>
          <BgButton type="submit">Enviar Confirmación</BgButton>
        </Grid>
      </Grid>
    </Form>
  );
});

export default RsvpStep2;
