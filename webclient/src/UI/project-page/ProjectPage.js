import React from "react";
import AddMixModal from "./AddMixModal";

const ProjectPage = (props) => {
  const {
    openMixModal,
    addMixModalData,
    isMixModalOpen,
    editMixModalField,
    closeMixModal,
    addMix,
    project: { id, title, owner },
  } = props;

  return (
    <React.Fragment>
      <div className="project-page">
        <div className="header-section d-flex justify-content-between">
          <div>Logo</div>
          <h1>{title}</h1>
          <div />
        </div>
        <div className="mix-share-section">
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button className="btn btn-primary">Share</button>
        </div>
        <div className="comment-section">Comment Section</div>
        <div className="media-section">Media Section</div>
      </div>
      <AddMixModal
        modalData={addMixModalData}
        show={isMixModalOpen}
        onEditField={editMixModalField}
        closeModal={closeMixModal}
        onCreate={addMix}
      />
    </React.Fragment>
  );
};

export default ProjectPage;
