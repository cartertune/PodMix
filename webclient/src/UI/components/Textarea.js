import React from "react";
import PropTypes from "prop-types";
import classname from "classnames";

const Textarea = (props) => {
  const { onChange, value, placeholder, timestamp, onEnterPressed } = props;

  const cN = classname("textbox form-control", {
    withtimestamp: !!timestamp,
  });

  const handleKeyPress = (evt) => {
    const { key } = evt;

    if (key == "Enter") {
      onEnterPressed && onEnterPressed();
    }
  };

  return (
    <div className="position-relative">
      {timestamp ? (
        <div className="timestamp-container">
          <p>{timestamp}</p>
        </div>
      ) : null}
      <textarea
        className={cN}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

Textarea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Textarea;
