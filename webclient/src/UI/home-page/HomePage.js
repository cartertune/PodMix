import React from "react";
import { connect } from "react-redux";
import Auth from "../../auth/Auth";
import LoginSplashPage from "./LoginSplashPage";
import CreateProjectModal from "./CreateProjectModal";
import ProjectItem from "./ProjectItem";
import { LoadingScreen } from "../components/Loading";

const HomePage = (props) => {
  const {
    createModalData,
    isCreateModalOpen,
    editCreateModalField,
    createProject,
    closeCreateModal,
    openCreateModal,
    isCreatingProject,
    currentUser,
    loadingUser,
    refetchUser,
  } = props;

  if (!Auth.isLoggedIn()) {
    return <LoginSplashPage {...props} />;
  }

  if (!loadingUser) {
    refetchUser();
  }

  if (!currentUser) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <div className="home-page">
        {currentUser.projects ? (
          <div className="d-flex justify-content-center mt-2">
            <h1>Your Projects</h1>
          </div>
        ) : null}
        {_.map(currentUser.projects, (p) => {
          return (
            <div className="mt-2" key={p.id}>
              <ProjectItem project={p} />
            </div>
          );
        })}
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
        isCreatingProject={isCreatingProject}
      />
    </React.Fragment>
  );
};

export default HomePage;
