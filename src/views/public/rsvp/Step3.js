import { Grid } from "@material-ui/core";
import React from "react";
import BgButton from "../../../components/BgButton";
import { usePublicContext } from "../context";
import Covid from "../Covid";

const RsvpStep3 = ({ fullpageApi }) => {
  const {
    state: {
      invitado: { nombre, estado },
    },
    actions: { onResponseBack },
    estados,
  } = usePublicContext();
  const asiste = estados.some((e) => e.id === estado && e.details);
  return (
    <>
      <h3>{`${nombre}, muchas gracias por enviarnos tu confirmación.`}</h3>
      {(asiste && (
        <>
          <Covid />
          <Grid container spacing={1}>
            <Grid item>
              <BgButton onClick={() => fullpageApi.moveTo("reward")}>Nuestro Regalo</BgButton>
            </Grid>
            <Grid item>
              <BgButton onClick={onResponseBack}>Cambiar Respuesta</BgButton>
            </Grid>
          </Grid>
        </>
      )) || (
        <>
          <p>Lamentamos mucho que no puedas asistir.</p>
          <p>Si cambiás de opinión, podés cambiar tu respuesta hasta el 23 de abril.</p>
          <BgButton onClick={onResponseBack}>Cambiar Respuesta</BgButton>
        </>
      )}
    </>
  );
};

export default RsvpStep3;
