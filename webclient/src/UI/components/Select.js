import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Select = props => {
  const { options, onChange, value, placeholder } = props;

  return (
    <select
      className="select form-control"
      value={value}
      onChange={evt => onChange(evt.target.value)}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {_.map(options, opt => {
        return (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

Select.defaultProps = {};

export default Select;
