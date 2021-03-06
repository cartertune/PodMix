import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import H3 from "../components/H3";

const CreateProjectModal = (props) => {
  const {
    modalData,
    closeModal,
    onEditField,
    onCreate,
    isCreatingProject,
  } = props;
  const { title } = modalData;

  return (
    <Modal header="Create Project" onClose={closeModal} show>
      <div className="mt-5">
        <Input
          value={title}
          onChange={(value) => onEditField({ field: "title", value })}
          placeholder="Project Title*"
          onEnterPressed={() => onCreate({ title })}
        />
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <Button
          isLoading={isCreatingProject}
          className="btn btn-primary px-4 py-3"
          onClick={() => onCreate({ title })}
        >
          <H3>Create</H3>
        </Button>
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
