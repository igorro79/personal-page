import React from "react";
import s from "./ErrorMsg.module.scss";
export const ErrorMsg = ({ error }) => {
  return <p className={s.error}>{error ? error : null}</p>;
};
