import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import AddMixModal from "./AddMixModal";
import AddCommentModal from "./AddCommentModal";
import AddCollaboratorsModal from "./AddCollaboratorsModal";
import { LoadingScreen } from "../components/Loading";
import MediaSection from "./MediaSection";
import Comment from "./Comment";
import logo from "../../resources/Logo.png";

const ProjectPage = (props) => {
  const {
    openMixModal,
    mixModalData,
    isMixModalOpen,
    editMixModalField,
    closeMixModal,
    addMix,
    openCommentModal,
    commentModalData,
    isCommentModalOpen,
    editCommentModalField,
    closeCommentModal,
    addComment,
    openCollaboratorModal,
    collaboratorModalData,
    isCollaboratorModalOpen,
    editCollaboratorModalField,
    closeCollaboratorModal,
    addCollaborator,
    selectedMixId,
    handleSelectMix,
    isPlaying,
    audioPosition,
    handleTogglePlay,
    handlePosChange,
    project,
  } = props;

  if (!project) {
    return <LoadingScreen />;
  }

  const { id, title, owner, mixes, collaborators } = project;

  const renderProjectButtons = () => {
    if (_.isEmpty(mixes)) {
      return (
        <div className="mix-share-section row d-flex justify-content-center mt-4">
          <div className="col-4">
            <button
              className="btn btn-primary w-100 py-3"
              onClick={() => openMixModal({ defaultMixNum: mixes.length + 1 })}
            >
              <h3>Add Mix</h3>
            </button>
          </div>
        </div>
      );
    }

    if (selectedMixId == "") {
      handleSelectMix({ value: mixes[0].id });
    }

    return (
      <div className="mix-share-section row d-flex justify-content-center">
        <div className="col-4">
          <select
            className="form-control mix-select"
            value={selectedMixId}
            onChange={(evt) =>
              handleSelectMix({
                value: evt.target.value,
                defaultMixNum: mixes.length + 1,
              })
            }
          >
            {_.map(mixes, (mix) => (
              <option key={mix.id} value={mix.id}>
                {mix.title}
              </option>
            ))}
            <option value="NEW_MIX">Add New Mix</option>
          </select>
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary w-100 h-100"
            onClick={openCollaboratorModal}
          >
            <h3>Share</h3>
          </button>
        </div>
      </div>
    );
  };

  const selectedMix = _.find(mixes, (m) => m.id == selectedMixId) || {};
  return (
    <React.Fragment>
      <div className="project-page">
        <div className="header-section text-center position-relative">
          <Link className="header-logo" to="/">
            <img src={logo} />
          </Link>
          <h1>{title}</h1>
        </div>
        {renderProjectButtons()}
        {selectedMix != {} && !isCommentModalOpen ? (
          <div>
            <div className="comment-section mt-4">
              {_.map(selectedMix.comments, (comment) => (
                <div key={comment.id} className="mb-2">
                  <Comment
                    comment={comment}
                    onClick={() => handlePosChange(comment.time)}
                  />
                </div>
              ))}
            </div>
            <MediaSection
              audioUrl={selectedMix.fileUrl}
              isPlaying={isPlaying}
              audioPosition={audioPosition}
              handleTogglePlay={handleTogglePlay}
              handlePosChange={handlePosChange}
              onCommentButtonPress={openCommentModal}
            />
          </div>
        ) : null}
      </div>
      <AddMixModal
        modalData={mixModalData}
        show={isMixModalOpen}
        onEditField={editMixModalField}
        closeModal={closeMixModal}
        onAddMix={addMix}
      />
      <AddCommentModal
        selectedMixId={selectedMixId}
        modalData={commentModalData}
        show={isCommentModalOpen}
        onEditField={editCommentModalField}
        closeModal={closeCommentModal}
        onAddComment={addComment}
        audioUrl={selectedMix.fileUrl}
        audioPosition={audioPosition}
        handlePosChange={handlePosChange}
      />
      <AddCommentModal
        selectedMixId={selectedMixId}
        modalData={commentModalData}
        show={isCommentModalOpen}
        onEditField={editCommentModalField}
        closeModal={closeCommentModal}
        onAddComment={addComment}
        audioUrl={selectedMix.fileUrl}
        audioPosition={audioPosition}
        handlePosChange={handlePosChange}
      />
      <AddCollaboratorsModal
        modalData={collaboratorModalData}
        show={isCollaboratorModalOpen}
        onEditField={editCollaboratorModalField}
        closeModal={closeCollaboratorModal}
        onAddCollaborator={addCollaborator}
        project={project}
      />
    </React.Fragment>
  );
};

export default ProjectPage;
