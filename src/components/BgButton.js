import React from "react";

const BgButton = ({ children, ...props }) => (
  <button className="bg-button" {...props}>
    <div>{children}</div>
  </button>
);

export default BgButton;
