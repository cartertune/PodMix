import React, { Children } from "react";

const Dropdown = (props) => {
  const { show, children } = props;

  if (!show) {
    return null;
  }
  return <div className="pm-dropdown">{children}</div>;
};

export default Dropdown;
