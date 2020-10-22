import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const { type, onChange, value, placeholder, onEnterPressed } = props;

  const handleKeyPress = (evt) => {
    const { key } = evt;

    if (key == "Enter") {
      onEnterPressed && onEnterPressed();
    }
  };

  return (
    <input
      className="input form-control"
      type={type}
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {};

export default Input;
