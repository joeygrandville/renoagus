import React from "react";
import { handleEvent } from "./common";

const Form = ({ onSubmit, ...props }) => {
  const handleSubmit = handleEvent((e) => {
    if (typeof onSubmit !== "function") return false;
    return onSubmit(e.target.elements);
  });
  return <form onSubmit={handleSubmit} {...props} />;
};

export default Form;
