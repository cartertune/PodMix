import React from "react";
import _ from "lodash";
import AddMixModal from "./AddMixModal";
import { LoadingScreen } from "../components/Loading";

const ProjectPage = (props) => {
  const {
    openMixModal,
    mixModalData,
    isMixModalOpen,
    editMixModalField,
    closeMixModal,
    addMix,
    project,
  } = props;

  if (!project) {
    return <LoadingScreen />;
  }

  const { id, title, owner, mixes } = project;

  const mixSelect = () => {
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

    return (
      <div className="mix-share-section row d-flex justify-content-center">
        <div className="col-4">
          <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="col-4">
          <button className="btn btn-primary w-100 h-100">Share</button>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="project-page">
        <div className="header-section text-center">
          <h1>{title}</h1>
        </div>
        {mixSelect()}
        <div>
          <div className="comment-section mt-4">Comment Section</div>
          <div className="media-section">Media Section</div>
        </div>
      </div>
      <AddMixModal
        modalData={mixModalData}
        show={isMixModalOpen}
        onEditField={editMixModalField}
        closeModal={closeMixModal}
        onAddMix={addMix}
      />
    </React.Fragment>
  );
};

export default ProjectPage;
