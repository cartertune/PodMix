import React from "react";
import classnames from "classnames";

export default (props) => {
  const { onClick, bold } = props;
  const className = classnames("P", props.className, { bold });

  return (
    <p className={className} onClick={onClick}>
      {props.children}
    </p>
  );
};
