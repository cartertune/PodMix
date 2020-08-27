import React from "react";
import { connect } from "react-redux";
import Auth from "../../auth/Auth";
import LoginSplashPage from "./LoginSplashPage";
import CreateProjectModal from "./CreateProjectModal";

const HomePage = (props) => {
  const {
    createModalData,
    isCreateModalOpen,
    editCreateModalField,
    createProject,
    closeCreateModal,
    openCreateModal,
  } = props;

  if (!Auth.isLoggedIn()) {
    return <LoginSplashPage {...props} />;
  }

  return (
    <React.Fragment>
      <div className="home-page">
        <div className="row justify-content-center mt-4">
          <button
            className="btn btn-primary col-8 py-4"
            onClick={openCreateModal}
          >
            <h3>Create New Project</h3>
          </button>
        </div>
      </div>
      <CreateProjectModal
        modalData={createModalData}
        show={isCreateModalOpen}
        onEditField={editCreateModalField}
        closeModal={closeCreateModal}
        onCreate={createProject}
      />
    </React.Fragment>
  );
};

export default HomePage;
