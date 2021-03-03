import React from "react";
import Covid from "./Covid";

const Rsvp = ({ fullpageApi }) => (
  <div className="section confirmation-container">
    <div id="confirmation-success" className="container">
      <h1>RSVP</h1>
      <h3>Pronto habilitaremos la opción de confirmar tu asistencia!</h3>
      <button className="bg-button" onClick={() => fullpageApi.moveTo("reward")}>
        <div>Nuestro Regalo</div>
      </button>
      <Covid />
    </div>
  </div>
);

export default Rsvp;
