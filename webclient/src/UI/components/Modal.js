import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { FiX } from "react-icons/fi";
import H1 from "./H1";

const Modal = (props) => {
  const { show, header, onClose, notClosable, className, children } = props;
  const modalClassname = classnames("pm-modal", className);

  if (show) {
    return (
      <div
        className={modalClassname}
        role="dialog"
        tabIndex="-1"
        onClick={() => onClose()}
      >
        <div
          className="pm-modal-dialog col-md-8 col-sm-10"
          onClick={(e) => e.stopPropagation()}
        >
          {!notClosable && (
            <button className="close-icon" onClick={() => onClose()}>
              <FiX />
            </button>
          )}
          <div className="d-flex justify-content-center">
            <H1>{header}</H1>
          </div>
          <div className="pm-modal-body">{children}</div>
        </div>
      </div>
    );
  }
  return null;
};

Modal.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.string,
  onClose: PropTypes.func,
  notClosable: PropTypes.bool,
};

export default Modal;
