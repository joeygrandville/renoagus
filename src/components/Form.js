import React from "react";

const Form = ({ onSubmit, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onSubmit !== "function") return false;
    return onSubmit(e.target.elements);
  };
  return <form onSubmit={handleSubmit} {...props} />;
};

export default Form;
