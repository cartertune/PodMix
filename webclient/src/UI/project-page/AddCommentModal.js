import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Textarea from "../components/Textarea";
import Waveform from "../components/Waveform";
import { secondsToTimestamp } from "../../util/util";
import AddCommentButton from "../components/AddCommentButton";

const AddCommentModal = (props) => {
  const {
    selectedMixId,
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
      <div className="row mt-3">
        <div className="col-10">
          <Textarea
            timestamp={secondsToTimestamp(audioPosition)}
            value={text}
            onChange={(value) => onEditField({ field: "text", value })}
            placeholder="Add comment here..."
          />
        </div>

        <div className="col-2 d-flex flex-column justify-content-center">
          <AddCommentButton
            onClick={() =>
              onAddComment({ mixId: selectedMixId, text, audioPosition })
            }
            disabled={text == ""}
          />
        </div>
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
