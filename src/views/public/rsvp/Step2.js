import * as yup from "yup";
import { Collapse, FormHelperText, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BgButton from "../../../components/BgButton";
import { withRsvpStepStyles } from "../../../components/common.styles";
import Form from "../../../components/Form";
import Input from "../../../components/StyledInput";
import { usePublicContext } from "../context";
import { array, isEmail, isNumber, useValidation } from "../../../components/common";
import RadioGroup from "../../../components/Radiogoup";

const isDetails = (es, eId) => Array.isArray(es) && es.some((e) => e.id === eId && e.details);

const RsvpStep2 = withRsvpStepStyles(({ classes }) => {
  const {
    state: { invitado, back },
    estados,
    menus,
    actions: { onConfirm },
  } = usePublicContext();
  const isSchemaDetails = (c) => isDetails(c?.parent?.estados, c?.parent?.estado);
  const schema = yup.object().shape({
    estado: yup.string().oneOf(
      estados.reduce((a, { id }) => [...a, id], []),
      "Indicá si podrás asistir"
    ),
    invitados: yup
      .number()
      .nullable()
      .test("", "Indicá la cantidad de invitados", (v, c) => !isSchemaDetails(c) || (isNumber(v) && v > 0)),
    email: yup
      .string()
      .nullable()
      .test("", "El email no es válido", (v, c) => !isSchemaDetails(c) || !v || isEmail(v)),
  });
  const { error, validateSchema } = useValidation(schema);
  const onValidate = (s) => validateSchema({ ...s, estados });
  const [state, setState] = useState(invitado);
  const [max, setMax] = useState(1);
  const { nombre, email, invitados, estado, menu } = state;
  const onChange = ({ target: { name, value } }) =>
    setState((s) => {
      const ns = { ...s, [name]: value };
      onValidate(ns);
      return ns;
    });
  const onSubmit = () => {
    const { valid } = onValidate(state);
    if (!valid) return false;
    return onConfirm(state);
  };
  const details = isDetails(estados, estado);
  useEffect(() => {
    setMax(invitado.invitados);
  }, [invitado.invitados]);
  return (
    <Form {...{ onSubmit }}>
      <h3>{`¡Hola${back ? " de nuevo," : ""} ${nombre}!`}</h3>
      <p>Por favor confirmanos tu asistencia. Podés hacerlo hasta el 23 de abril.</p>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item className={classes.label}>
          Podrás Asistir?
        </Grid>
        <Grid item>
          <RadioGroup name="estado" value={estado} options={estados} {...{ onChange }} />
          {error.estado && <FormHelperText error>{error.estado}</FormHelperText>}
        </Grid>
      </Grid>
      <Collapse in={details}>
        <Grid container wrap="nowrap" spacing={2} alignItems="center" className={`${classes.container} ${classes.container2}`}>
          <Grid item className={classes.labelNp}>
            Cantidad De Invitados Confirmados
          </Grid>
          <Grid item xs className={classes.nowrap}>
            <RadioGroup
              horizontal
              name="invitados"
              value={invitados}
              options={array(max).map((id) => ({ id, text: String(id) }))}
              {...{ onChange }}
            />
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={2} alignItems="center" className={`${classes.container} ${classes.container2}`}>
          <Grid item className={classes.labelNp}>
            Menú
          </Grid>
          <Grid item xs>
            <RadioGroup horizontal name="menu" value={menu} options={menus} {...{ onChange }} />
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={2} className={`${classes.container} hide-xs`}>
          <Grid item className={classes.label}>
            Email
          </Grid>
          <Grid item xs>
            <Input name="email" value={email} {...{ onChange }} error={error.email} />
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
