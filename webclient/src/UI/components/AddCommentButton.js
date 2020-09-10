import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const AddCommentButton = (props) => {
  const { onClick, disabled } = props;
  return (
    <button
      className="btn btn-primary comment-button"
      onClick={onClick}
      disabled={disabled}
    >
      <FiMessageSquare />
    </button>
  );
};

export default AddCommentButton;
