import React from "react";
import PropTypes from "prop-types";
import H2 from "../components/H2";
import { FiX } from "react-icons/fi";

const Modal = (props) => {
  const { show, header, onClose, notClosable, children } = props;

  if (show) {
    return (
      <div className="pm-modal" role="dialog" tabIndex="-1">
        <div className="pm-modal-dialog col-md-5 col-sm-10">
          {!notClosable && (
            <button className="close-icon" onClick={() => onClose()}>
              <FiX />
            </button>
          )}
          <div className="d-flex justify-content-center">
            <h1>{header}</h1>
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
