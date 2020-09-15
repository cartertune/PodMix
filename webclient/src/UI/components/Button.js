import React from "react";
import { LoadingIcon } from "./Loading";

const Button = (props) => {
  const { isLoading, className, onClick, disabled, children } = props;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {isLoading ? <LoadingIcon /> : children}
    </button>
  );
};

export default Button;
