import React from "react";
import { LoadingIcon } from "./Loading";

const Button = (props) => {
  const { isLoading, children } = props;
  return <button {...props}>{isLoading ? <LoadingIcon /> : children}</button>;
};

export default Button;
