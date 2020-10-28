import React from "react";
import classnames from "classnames";

export default (props) => {
  const className = classnames("H3", props.className, {});
  return <h3 className={className}>{props.children}</h3>;
};
