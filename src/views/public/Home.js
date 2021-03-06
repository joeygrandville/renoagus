import React from "react";
import { withHomeStyles } from "../../components/common.styles";
import Counter from "../../components/Counter";

const Home = withHomeStyles(({ classes }) => (
  <div className="section bg-black-red">
    <div className={classes.root}>
      <div className={classes.container}>
        <h1>¡Formalizamos!</h1>
        <p>Y queremos festejarlo con ustedes</p>
        <h3>23 de Mayo</h3>
        <h1>Agustín y Renata</h1>
        <div className={classes.counter}>
          <Counter labels />
        </div>
        <div className="home-actions">
          <a href="#confirmation">Confirmar Asistencia</a>
          <a href="#reward">Nuestro Regalo</a>
        </div>
      </div>
    </div>
  </div>
));

export default Home;
