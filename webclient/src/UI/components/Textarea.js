import React from "react";
import PropTypes from "prop-types";

const Textarea = props => {
  const { onChange, value, placeholder } = props;

  return (
    <textarea
      className="textbox form-control"
      value={value}
      onChange={evt => onChange(evt.target.value)}
      placeholder={placeholder}
    />
  );
};

Textarea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default Textarea;
