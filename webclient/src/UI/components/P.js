import React from "react";
import classnames from "classnames";

export default props => {
  const { gray, big, light, center } = props;
  const className = classnames("P", {
    gray,
    big,
    light,
    center
  });

  return <p className={className}>{props.children}</p>;
};
