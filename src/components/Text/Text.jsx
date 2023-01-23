import React from "react";
import s from "./Text.module.scss";

export const Text = React.forwardRef((props, ref) => (
  <p className={s.text} ref={ref} {...props}>
    {props.children}
  </p>
));
