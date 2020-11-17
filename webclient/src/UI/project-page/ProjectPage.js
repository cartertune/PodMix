import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import AddMixModal from "./AddMixModal";
import AddCommentModal from "./AddCommentModal";
import AddCollaboratorsModal from "./AddCollaboratorsModal";
import { LoadingScreen } from "../components/Loading";
import MediaSection from "./MediaSection";
import LoginRequiredModal from "../components/LoginRequiredModal";
import logo from "../../resources/Logo.png";
import CommentSection from "./CommentSection";
import Select from "../components/Select";
import { deleteComment } from "../../connections/projectConnections";

const ProjectPage = (props) => {
  const {
    // Mix Modal Props
    openMixModal,
    mixModalData,
    isMixModalOpen,
    editMixModalField,
    closeMixModal,
    addMix,
    isAddingMix,

    // Comment Modal Props
    openCommentModal,
    commentModalData,
    isCommentModalOpen,
    editCommentModalField,
    closeCommentModal,
    addComment,
    isAddingComment,

    //Collaborator Modal Props
    openCollaboratorModal,
    collaboratorModalData,
    isCollaboratorModalOpen,
    editCollaboratorModalField,
    closeCollaboratorModal,
    addCollaborator,
    isAddingCollaborator,

    // Project Page Props
    selectedMixId,
    handleSelectMix,
    isPlaying,
    audioPosition,
    handleTogglePlay,
    handlePosChange,
    handleCommentClick,
    deleteComment,
    project,
    user,
  } = props;

  if (!project) {
    return <LoadingScreen />;
  }

  const { id, title, owner, mixes, collaborators } = project;

  const selectedMix = _.find(mixes, (m) => m.id == selectedMixId) || {};
  if (selectedMix.id == null && !_.isEmpty(mixes)) {
    handleSelectMix({ value: mixes[0].id });
  }

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

    const options = _.map(mixes, (m) => ({ value: m.id, label: m.title }));
    options.push({ value: "NEW_MIX", label: "Add New Mix" });
    return (
      <div className="mix-share-section row d-flex justify-content-center mt-2">
        <div className="col-4">
          <Select
            value={selectedMixId}
            options={options}
            onChange={(value) => {
              handleSelectMix({
                value,
                defaultMixNum: mixes.length + 1,
              });
            }}
          />
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

  return (
    <React.Fragment>
      <div className="project-page">
        <div className="header-section text-center position-relative">
          <div className="d-flex justify-content-center align-items-center">
            <Link className="header-logo" to="/">
              <img src={logo} />
            </Link>
            <div className="title-section">
              <h1 className=" scrolling-text">{title}</h1>
              <h4>{`proj. owner: ${owner.name}`}</h4>
            </div>
          </div>
          {renderProjectButtons()}
        </div>
        {selectedMix != {} &&
        !isCommentModalOpen &&
        !isCollaboratorModalOpen &&
        !isMixModalOpen ? (
          <React.Fragment>
            <CommentSection
              mix={selectedMix}
              onDeleteComment={deleteComment}
              handlePosChange={handlePosChange}
              onCommentSelected={handleCommentClick}
              currentAudioPosition={audioPosition}
            />
            <MediaSection
              audioUrl={selectedMix.fileUrl}
              isPlaying={isPlaying}
              audioPosition={audioPosition}
              handleTogglePlay={handleTogglePlay}
              handlePosChange={handlePosChange}
              onCommentButtonPress={openCommentModal}
            />
          </React.Fragment>
        ) : null}
      </div>
      <LoginRequiredModal
        show={!_.get(user, "id")}
        currentLocation={`/projects/${id}`}
      />
      <AddMixModal
        modalData={mixModalData}
        show={isMixModalOpen}
        onEditField={editMixModalField}
        closeModal={closeMixModal}
        onAddMix={addMix}
        isAddingMix={isAddingMix}
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
        isAddingComment={isAddingComment}
      />
      <AddCollaboratorsModal
        modalData={collaboratorModalData}
        show={isCollaboratorModalOpen}
        onEditField={editCollaboratorModalField}
        closeModal={closeCollaboratorModal}
        onAddCollaborator={addCollaborator}
        isAddingCollaborator={isAddingCollaborator}
        project={project}
      />
    </React.Fragment>
  );
};

export default ProjectPage;
