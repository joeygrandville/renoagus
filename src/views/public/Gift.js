import React from "react";
import Covid from "./Covid";
const env = (path) => process.env[`REACT_APP_${path}`];

const rows = [
  ["Tipo y número de cuenta", env("ACCT_TYPE_NO")],
  ["CBU", env("CBU")],
  ["Alias", env("CBU_ALIAS")],
  ["Titular de la cuenta", env("ACCT_OWNER")],
  ["Tipo y número de documento", env("ACCT_OWNER_ID")],
];

const Gift = () => (
  <div className="section reward-container">
    <div className="container">
      <h1>Nuestro Regalo</h1>
      <h3>¡Lo mas importante es que vengas a compartir con nosotros!</h3>
      <h3>Pero si querés hacernos un relago, aquí te dejamos los datos de nuestra cuenta:</h3>
      <p>
        <b>{env("BANK")}</b>
      </p>
      {rows.map(([label, value]) => (
        <p key={label}>
          {`${label}: `}
          <b>{value}</b>
        </p>
      ))}
      <Covid style={{ color: "#FFF" }} />
    </div>
  </div>
);

export default Gift;
