import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Input from "../components/Input";

const AddMixModal = (props) => {
  const { modalData, show, closeModal, onEditField, onAddMix } = props;
  const { title, fileUrl } = modalData;

  return (
    <Modal header="Create Project" show={show} onClose={closeModal}>
      <div className="mt-4">
        <Input
          value={title}
          onChange={(value) => onEditField({ field: "title", value })}
          placeholder="Mix Title*"
        />
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <button
          className="btn btn-primary px-4 py-3"
          onClick={() => uploadAudio()}
        >
          <h3>Upload</h3>
        </button>
      </div>
      {fileUrl ? (
        <div className="mt-3 d-flex justify-content-center">
          <button
            className="btn btn-primary px-4 py-3"
            onClick={() => onAddMix()}
          >
            <h3>Add Mix</h3>
          </button>
        </div>
      ) : null}
    </Modal>
  );
};

AddMixModal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onEditField: PropTypes.func.isRequired,
  onAddMix: PropTypes.func.isRequired,
  modalData: PropTypes.object,
};

export default AddMixModal;
