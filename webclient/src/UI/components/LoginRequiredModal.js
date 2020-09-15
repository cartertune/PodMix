import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Auth from "../../auth/Auth";
import Button from "./Button";

const LoginRequiredModal = (props) => {
  const { show, currentLocation } = props;

  return (
    <Modal header="Login Required" show={show} notClosable>
      <div className="mt-2 d-flex flex-column align-items-center justify-content-center">
        <div className="mb-4">
          <p className="text-center">
            To use this feature you need to login so we can track your learning
          </p>
        </div>
        <Button
          className="btn btn-primary px-4"
          onClick={() => {
            Auth.login({ callbackLink: currentLocation });
          }}
        >
          Login
        </Button>
      </div>
    </Modal>
  );
};

LoginRequiredModal.propTypes = {
  show: PropTypes.bool,
  currentLocation: PropTypes.string.isRequired,
};

export default LoginRequiredModal;
