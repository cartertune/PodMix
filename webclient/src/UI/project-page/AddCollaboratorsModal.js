import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Input from "../components/Input";

const AddCollaboratorsModal = (props) => {
  const {
    modalData,
    show,
    closeModal,
    onEditField,
    onAddCollaborator,
    collaborators,
  } = props;
  const { email } = modalData;

  return (
    <Modal
      header="Share"
      className="collaborators-modal"
      show={show}
      onClose={closeModal}
    >
      <div className="row mt-4">
        <div className="col-8">
          <Input
            value={email}
            onChange={(value) => onEditField({ field: "email", value })}
            placeholder="Add people to project"
          />
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary px-4 py-3 w-100"
            onClick={() => onAddCollaborator({ email })}
          >
            <h3>Share</h3>
          </button>
        </div>
      </div>
      <div className="mt-2 row">
        <div className="col-12">
          {_.map(collaborators, (c) => {
            return (
              <div className="form-control mt-2" key={c.email}>
                <p>{c.email}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

AddCollaboratorsModal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onEditField: PropTypes.func.isRequired,
  onAddCollaborator: PropTypes.func.isRequired,
  modalData: PropTypes.object,
};

export default AddCollaboratorsModal;
