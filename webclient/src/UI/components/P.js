import React from "react";
import classnames from "classnames";

export default (props) => {
  const { onClick } = props;
  const className = classnames("P", props.className, {});

  return (
    <p className={className} onClick={onClick}>
      {props.children}
    </p>
  );
};
