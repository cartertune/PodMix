import React from "react";
import Button from "./Button";
import { FiSkipBack } from "react-icons/fi";

const SkipBackButton = (props) => {
  const { onClick, disabled, isLoading } = props;
  return (
    <Button
      className="btn skip-back-button"
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
    >
      <FiSkipBack />
    </Button>
  );
};

export default SkipBackButton;
