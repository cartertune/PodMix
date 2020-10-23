import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import UploadAndPreview from "../components/UploadAndPreview";
import LoadingBar from "../components/LoadingBar";

const AddMixModal = (props) => {
  const {
    modalData,
    show,
    closeModal,
    onEditField,
    onAddMix,
    isAddingMix,
  } = props;
  const { title, tempAudioUrl, file, uploadPerc } = modalData;

  const handleAudioUpload = (file) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      onEditField({ field: "tempAudioUrl", value: window.URL.createObjectURL(file) });
      onEditField({ field: "file", value: file });
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
          onRemove={() => onEditField({ field: "file", value: null })}
          audioFile={tempAudioUrl}
          file={file}
          onDrop={(files) => handleAudioUpload(files[0])}
        />
      </div>
      {tempAudioUrl && file ? (
        <div className="mt-4 d-flex justify-content-center w-100">
          {isAddingMix ? 
            <LoadingBar percentage={uploadPerc}/> : 
            <Button
              isLoading={isAddingMix}
              disabled={isAddingMix}
              className="btn btn-primary px-4 py-3"
              onClick={() => onAddMix({ title, file })}
            >
              <h3>Add Mix</h3>
            </Button>}
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
