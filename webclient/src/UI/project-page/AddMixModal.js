import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Input from "../components/Input";
import UploadAndPreview from "../components/UploadAndPreview";

const AddMixModal = (props) => {
  const { modalData, show, closeModal, onEditField, onAddMix } = props;
  const { title, tempAudio, fileName } = modalData;

  const handleAudioUpload = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const base64Audio = reader.result;
      onEditField({ field: "tempAudio", value: base64Audio });
      onEditField({ field: "fileName", value: file.name });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      header="Add Mix"
      className="add-mix-modal"
      show={show}
      onClose={closeModal}
    >
      <div className="mt-4">
        <Input
          value={title}
          onChange={(value) => onEditField({ field: "title", value })}
          placeholder="Mix Title*"
        />
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <UploadAndPreview
          audioFile={tempAudio}
          fileName={fileName}
          onDrop={(files) => handleAudioUpload(files[0])}
        />
      </div>
      {tempAudio && fileName ? (
        <div className="mt-4 d-flex justify-content-center">
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
