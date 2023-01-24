import React from "react";
import s from "./Text.module.scss";
import classnames from "classnames";

export const Text = React.forwardRef((props, ref) => {
  console.log(props);
  return (
    <p
      className={classnames(s.text, { [s.dots]: props.dots }, props.className)}
      ref={ref}
      {...props}
    >
      {props.children}
    </p>
  );
});
