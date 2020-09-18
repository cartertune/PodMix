import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { FiChevronDown } from "react-icons/fi";

const Select = (props) => {
  const { id, options, onChange, value, placeholder } = props;

  return (
    <div className="position-relative select-container">
      <div className="position-absolute chevron-icon">
        <FiChevronDown />
      </div>
      <select
        id={id}
        className="select form-control"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      >
        {placeholder ? (
          <option disabled value="">
            {placeholder}
          </option>
        ) : null}
        {_.map(options, (opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Select.defaultProps = {};

export default Select;
