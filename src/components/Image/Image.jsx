import React from "react";
import s from "./Image.module.scss";

export const Image = ({ image, name }) => {
  return <img className={s.img} src={image} alt={name} loading="lazy" />;
};
