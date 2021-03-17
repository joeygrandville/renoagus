import React from "react";
import { withGiftStyles } from "../../components/common.styles";

const env = (path) => process.env[`REACT_APP_${path}`];

const rows = [
  ["Tipo y número de cuenta", env("ACCT_TYPE_NO")],
  ["CBU", env("CBU")],
  ["Alias", env("CBU_ALIAS")],
];

const Gift = withGiftStyles(({ classes }) => (
  <div className={`section  ${classes.bg}`}>
    <div className={classes.container}>
      <div className={classes.content}>
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
      </div>
    </div>
  </div>
));

export default Gift;
