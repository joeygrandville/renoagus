import React from "react";
import Counter from "../../components/Counter";

const Home = () => {
  const date = new Date("2021-05-23T15:00:00Z");
  return (
    <div className="section home-welcome">
      <div className="container">
        <div className="main-countdown">
          <h1>¡Formalizamos!</h1>
          <p>Y queremos festejarlo con ustedes</p>
          <h3>23 de Mayo</h3>
          <h1>Agustín y Renata</h1>
          <div className="countdown-container">
            <Counter {...{ date }} />
          </div>
          <div className="home-actions">
            <a href="#confirmation">Confirmar Asistencia</a>
            <a href="#reward">Nuestro Regalo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
