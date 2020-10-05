import React from "react";
import Auth from "../../auth/Auth";
import LoginSplashPage from "./LoginSplashPage";
import CreateProjectModal from "./CreateProjectModal";
import ProjectItem from "./ProjectItem";
import { LoadingScreen } from "../components/Loading";
import LogoHeader from "../components/LogoHeader";

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
    logout,
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
        <div className="d-flex justify-content-center position-relative">
          <LogoHeader />
          <div className="logout-button">
            <p onClick={() => logout()}>logout</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between h-100">
          {currentUser.projects.length != 0 ? (
            <div className="mt-4">
              <div className="d-flex mt-2 pl-2">
                <h3>Your Projects</h3>
              </div>
              {_.map(currentUser.projects, (p) => {
                return (
                  <div className="mt-2" key={p.id}>
                    <ProjectItem project={p} />
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="row justify-content-center pt-4 pb-3">
            <button
              className="btn btn-primary col-8 py-4"
              onClick={openCreateModal}
            >
              <h3>Create New Project</h3>
            </button>
          </div>
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
