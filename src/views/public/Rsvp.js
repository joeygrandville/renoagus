import React from "react";

const Rsvp = ({ fullpageApi }) => (
  <div className="section confirmation-container">
    <div id="confirmation-form" className="container">
      <h1>RSVP</h1>
      <h3>Por favor, confirmanos tu asistencia.</h3>
      <div className="confirmation-field">
        <label>
          Podrás Asistir? <span className="form-required">*</span>
        </label>
        <div>
          <label className="confirmation-radio-container">
            Sí asistiré
            <input type="radio" name="confirmation-asistencia" value="Sí asistiré" />
            <span className="checkmark" />
          </label>
          <label className="confirmation-radio-container">
            No podré asistir
            <input type="radio" name="confirmation-asistencia" value="No podré asistir" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="confirmation-error">Indicá si podrás asistir</div>
      </div>
      <div className="confirmation-field">
        <label>
          Cantidad De Invitados Confirmados <span className="form-required">*</span>
        </label>
        <input type="text" id="confirmation-cantidad" placeholder="Cantidad" />
        <div className="confirmation-error">Indicá la cantidad de invitados</div>
      </div>
      <div className="confirmation-field">
        <label>
          Nombre <span className="form-required">*</span>
        </label>
        <input type="text" id="confirmation-nombre" placeholder="Nombre" />
        <input type="text" id="confirmation-apellido" placeholder="Apellido" />
        <div className="confirmation-error">Escribí tu Nombre y Apellido</div>
      </div>
      <div className="confirmation-field">
        <button type="button" className="confirmation-button">
          <div>Enviar Confirmación</div>
        </button>
        <div className="confirmation-error">
          Ocurrió un error al enviar tu confirmación.
          <br />
          Por favor, intentá de nuevo.
        </div>
      </div>
    </div>
    <div id="confirmation-success" className="container">
      <h1>RSVP</h1>
      <h2>¡Te esperamos!</h2>
      <h3>Tu confirmación fue enviada</h3>
      <button className="confirmation-button" onClick={() => fullpageApi.moveTo("reward")}>
        <div>Nuestro Regalo</div>
      </button>
    </div>
    <div className="confirmation-loading">
      <div>
        <div>
          <i className="fas fa-sync-alt fa-spin"></i>
        </div>
      </div>
    </div>
  </div>
);

export default Rsvp;
