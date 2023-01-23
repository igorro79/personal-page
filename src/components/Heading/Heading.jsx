import React from "react";
import s from "./Heading.module.scss";

export const Heading = ({ children, tag, ...props }) => {
  switch (tag) {
    case "h2":
      return (
        <h2 className={s.h2} {...props}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={s.h3} {...props}>
          {children}
        </h3>
      );
    default:
      return (
        <h1 className={s.h1} {...props}>
          {children}
        </h1>
      );
  }
};
