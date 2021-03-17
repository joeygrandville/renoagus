import { Zoom } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import React from "react";
import { withHomeStyles } from "../../components/common.styles";
import Counter from "../../components/Counter";
import { usePublicContext } from "./context";

const Home = withHomeStyles(({ classes }) => {
  const {
    settings: { loading, eventDate, nombres },
  } = usePublicContext();
  return (
    <div className={clsx("section", classes.bg)}>
      <Zoom in={!loading}>
        <div className={classes.root}>
          <div className={classes.container}>
            <h1>¡Nuestro Casamiento!</h1>
            <p>Queremos festejarlo con ustedes</p>
            <h3>{moment(eventDate).format("DD [de] MMMM")}</h3>
            <h1>{nombres}</h1>
            <div className={classes.counter}>
              <Counter labels />
            </div>
            <div className="home-actions">
              <a href="#confirmation">Confirmar Asistencia</a>
              <a href="#reward">Nuestro Regalo</a>
            </div>
          </div>
        </div>
      </Zoom>
    </div>
  );
});

export default Home;
