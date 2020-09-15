import React from "react";
import Button from "./Button";
import { FiMessageSquare } from "react-icons/fi";

const AddCommentButton = (props) => {
  const { onClick, disabled, isLoading } = props;
  return (
    <Button
      className="btn btn-primary comment-button"
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
    >
      <FiMessageSquare />
    </Button>
  );
};

export default AddCommentButton;
