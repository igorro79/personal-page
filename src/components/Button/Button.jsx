import classnames from "classnames";
import React from "react";
import s from "./Button.module.scss";

export const Button = ({ children, type, onClick, className, status }) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      disabled={status}
      className={classnames(s.button, { [s.disabled]: status }, className)}
    >
      {children}
    </button>
  );
};
