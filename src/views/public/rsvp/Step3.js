import React from "react";
import { usePublicContext } from "../context";
import Covid from "../Covid";

const RsvpStep3 = () => {
  const {
    state: {
      invitado: { nombre, estado },
    },
    estados,
  } = usePublicContext();
  const asiste = estados.some((e) => e.id === estado && e.details);
  console.log(asiste);
  return (
    <>
      <h3>{`${nombre}, muchas gracias por enviarnos tu confirmación.`}</h3>
      {(asiste && <Covid />) || (
        <>
          <p>Lamentamos mucho que no puedas asistir.</p>
          <p>Si cambiás de opinión, podés cambiar tu respuesta en cualquier momento.</p>
        </>
      )}
    </>
  );
};

export default RsvpStep3;
