import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  const { type, onChange, value, placeholder } = props;

  return (
    <input
      className="input form-control"
      type={type}
      value={value}
      onChange={evt => onChange(evt.target.value)}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

Input.defaultProps = {};

export default Input;
