import React from "react";

const LinkButton = ({ onClick, className, blue, underline, disabled, ...props }) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (typeof onClick !== "function") return false;
    return onClick(event);
  };
  const css = [
    ["lb-root", true],
    ["lb-blue", blue && !disabled],
    ["lb-disabled", disabled],
    ["lb-underline", underline],
    [className, Boolean(className)],
  ]
    .reduce((acc, [p, b]) => `${acc}${p && b ? ` ${p}` : ""}`, "")
    .trim();
  return (
    <button
      {...{
        type: "button",
        className: css,
        onClick: handleClick,
        disabled,
        ...props,
      }}
    />
  );
};

export default LinkButton;
