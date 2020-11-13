import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import P from "../components/P";
import H3 from "../components/H3";

const AddCollaboratorsModal = (props) => {
  const {
    modalData,
    closeModal,
    onEditField,
    onAddCollaborator,
    project,
    isAddingCollaborator,
  } = props;
  const { email } = modalData;

  const getCollaborators = () => {
    const { collaborators, collaboratorEmails } = project;
    const e = _.map(collaboratorEmails, (email) => ({
      email,
    }));
    return _.unionBy(collaborators, e, "email");
  };
  return (
    <Modal
      header="Share"
      className="collaborators-modal"
      onClose={closeModal}
      show
    >
      <div className="row mt-4">
        <div className="col-8">
          <Input
            value={email}
            onChange={(value) => onEditField({ field: "email", value })}
            placeholder="Add people to project"
            onEnterPressed={() => onAddCollaborator({ email })}
          />
        </div>
        <div className="col-4">
          <Button
            className="btn btn-primary px-4 py-3 w-100"
            onClick={() => onAddCollaborator({ email })}
            isLoading={isAddingCollaborator}
          >
            <H3>Share</H3>
          </Button>
        </div>
      </div>
      <div className="mt-2 row">
        <div className="col-12">
          {_.map(getCollaborators(), (c) => {
            return (
              <div
                className="form-control mt-2 d-flex justify-content-between"
                key={c.email}
              >
                <P>{c.email}</P>
                {c.avatarUrl ? <Avatar avatarUrl={c.avatarUrl} /> : null}
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
