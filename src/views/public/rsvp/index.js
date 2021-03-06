import React from "react";
import { withRsvpStyles } from "../../../components/common.styles";
import { usePublicContext } from "../context";
import RsvpStep1 from "./Step1";
import RsvpStep2 from "./Step2";
import RsvpStep3 from "./Step3";

// <BgButton onClick={() => fullpageApi.moveTo("reward")}>Nuestro Regalo</BgButton>

const Rsvp = withRsvpStyles(({ classes, fullpageApi }) => {
  const {
    state: { step },
  } = usePublicContext();
  return (
    <div className={`section ${classes.root}`}>
      <div className={classes.container}>
        <h1 className="bg-text">RSVP</h1>
        {step === 0 && <RsvpStep1 />}
        {step === 1 && <RsvpStep2 />}
        {step === 2 && <RsvpStep3 />}
      </div>
    </div>
  );
});

export default Rsvp;
