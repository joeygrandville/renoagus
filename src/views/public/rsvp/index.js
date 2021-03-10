import React from "react";
import { withRsvpStyles } from "../../../components/common.styles";
import { usePublicContext } from "../context";
import RsvpStep1 from "./Step1";
import RsvpStep2 from "./Step2";
import RsvpStep3 from "./Step3";

const Rsvp = withRsvpStyles(({ classes, ...other }) => {
  const {
    state: { step },
  } = usePublicContext();
  return (
    <div className={`section ${classes.root}`}>
      <div className={classes.container}>
        <h1 className="bg-text">RSVP</h1>
        {step === 0 && <RsvpStep1 {...other} />}
        {step === 1 && <RsvpStep2 {...other} />}
        {step === 2 && <RsvpStep3 {...other} />}
      </div>
    </div>
  );
});

export default Rsvp;
