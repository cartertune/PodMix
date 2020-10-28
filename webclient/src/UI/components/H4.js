import React from "react";
import classnames from "classnames";

export default (props) => {
  const className = classnames("H3", props.className, {});
  return <h4 className={className}>{props.children}</h4>;
};
