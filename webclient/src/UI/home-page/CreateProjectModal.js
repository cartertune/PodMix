import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Input from "../components/Input";

const CreateProjectModal = (props) => {
  const { modalData, show, closeModal, onEditField, onCreate } = props;
  const { title } = modalData;

  return (
    <Modal header="Create Project" show={show} onClose={closeModal}>
      <div className="mt-5">
        <Input
          value={title}
          onChange={(value) => onEditField({ field: "title", value })}
          placeholder="Project Title*"
        />
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <button
          className="btn btn-primary px-4 py-3"
          onClick={() => onCreate({ title })}
        >
          <h3>Create</h3>
        </button>
      </div>
    </Modal>
  );
};

CreateProjectModal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onEditField: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalData: PropTypes.object,
};

export default CreateProjectModal;
