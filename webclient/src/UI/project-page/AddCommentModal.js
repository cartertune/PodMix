import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Textarea from "../components/Textarea";
import Waveform from "../components/Waveform";

const AddCommentModal = (props) => {
  const {
    modalData,
    show,
    closeModal,
    onEditField,
    onAddComment,
    audioUrl,
    audioPosition,
    handlePosChange,
  } = props;
  const { text } = modalData;

  return (
    <Modal
      header="Add Comment"
      className="add-comment-modal"
      show={show}
      onClose={closeModal}
    >
      <div className="preview">
        <Waveform
          audioFile={audioUrl}
          audioPosition={audioPosition}
          handlePosChange={handlePosChange}
        />
      </div>
      <div className="mt-4">
        <Textarea
          value={text}
          onChange={(value) => onEditField({ field: "text", value })}
          placeholder="Add comment here..."
        />
      </div>

      <div className="mt-4 d-flex justify-content-center">
        <button
          className="btn btn-primary px-4 py-3"
          disabled={text.length == 0}
          onClick={() => onAddComment({ selectedMixId, text, audioPosition })}
        >
          <h3>Add Comment</h3>
        </button>
      </div>
    </Modal>
  );
};

AddCommentModal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onEditField: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  modalData: PropTypes.object,
};

export default AddCommentModal;
