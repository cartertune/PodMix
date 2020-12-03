import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
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
import H1 from "../components/H1";
import H3 from "../components/H3";
import H4 from "../components/H4";

const ProjectPage = (props) => {
  const {
    // Mix Modal Props
    openMixModal,
    mixModalData,
    editMixModalField,
    closeMixModal,
    addMix,
    isAddingMix,
    isMixModalOpen,

    // Comment Modal Props
    openCommentModal,
    commentModalData,
    editCommentModalField,
    closeCommentModal,
    addComment,
    isAddingComment,
    isCommentModalOpen,

    //Collaborator Modal Props
    openCollaboratorModal,
    collaboratorModalData,
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
    completeComment,
    project,
    user,
    location,
  } = props;

  if (!project) {
    return <LoadingScreen />;
  }

  console.log();
  const splitPath = location.pathname.split("/");
  console.log(splitPath);
  const isAModalOpen = splitPath.length > 3 

  const { id, title, owner, mixes } = project;

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
              <H3>Add Mix</H3>
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
              if (value == "NEW_MIX") {
                openMixModal({ defaultMixNum: mixes.length + 1 });
                return;
              }
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
            <H3>Share</H3>
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
            <div className="w-75">
              <H1 marquee>{title}</H1>
              <H4>{`proj. owner: ${owner.name}`}</H4>
            </div>
          </div>
          {renderProjectButtons()}
        </div>
        {selectedMix != {} && _.get(user, "id") ? (
          <React.Fragment>
            <CommentSection
              mix={selectedMix}
              onDeleteComment={deleteComment}
              onCompleteComment={completeComment}
              handlePosChange={handlePosChange}
              onCommentSelected={handleCommentClick}
              currentAudioPosition={audioPosition}
            />
            {isAModalOpen ? null : (
              <MediaSection
                audioUrl={selectedMix.fileUrl}
                isPlaying={isPlaying}
                audioPosition={audioPosition}
                handleTogglePlay={handleTogglePlay}
                handlePosChange={handlePosChange}
                onCommentButtonPress={openCommentModal}
              />
            )}
          </React.Fragment>
        ) : null}
      </div>
      <LoginRequiredModal
        show={!_.get(user, "id")}
        currentLocation={`/projects/${id}`}
      />
      <Route
        exact
        path={`/projects/${id}/add-mix`}
        render={() => {
          return (
            <AddMixModal
              modalData={mixModalData}
              onEditField={editMixModalField}
              closeModal={closeMixModal}
              onAddMix={addMix}
              isAddingMix={isAddingMix}
            />
          );
        }}
      />
      <Route
        exact
        path={`/projects/${id}/add-comment`}
        render={() => {
          return (
            <AddCommentModal
              selectedMixId={selectedMixId}
              modalData={commentModalData}
              onEditField={editCommentModalField}
              closeModal={closeCommentModal}
              onAddComment={addComment}
              audioUrl={selectedMix.fileUrl}
              audioPosition={audioPosition}
              handlePosChange={handlePosChange}
              isAddingComment={isAddingComment}
            />
          );
        }}
      />
      <Route
        exact
        path={`/projects/${id}/add-collaborator`}
        render={() => {
          return (
            <AddCollaboratorsModal
              modalData={collaboratorModalData}
              onEditField={editCollaboratorModalField}
              closeModal={closeCollaboratorModal}
              onAddCollaborator={addCollaborator}
              isAddingCollaborator={isAddingCollaborator}
              project={project}
            />
          );
        }}
      />
    </React.Fragment>
  );
};

export default ProjectPage;
