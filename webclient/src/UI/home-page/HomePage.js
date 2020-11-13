import React from "react";
import CreateProjectModal from "./CreateProjectModal";
import ProjectItem from "./ProjectItem";
import { LoadingScreen } from "../components/Loading";
import LogoHeader from "../components/LogoHeader";
import H3 from "../components/H3";
import P from "../components/P";
import { Link, Route } from "react-router-dom";
import { store } from "../../store";
import Auth from "../../auth/Auth";

const HomePage = (props) => {
  const {
    createModalData,
    editCreateModalField,
    createProject,
    closeCreateModal,
    openCreateModal,
    isCreatingProject,
    currentUser,
    loadingUser,
    refetchUser,
    history,
    logout,
  } = props;

  if (!Auth.isLoggedIn() && !_.get(store.getState(), "auth.jwt")) {
    console.log(store.getState());
    console.log("here is the problem :/");
    history.push("/");
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
            <P onClick={() => logout()}>logout</P>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between h-100">
          {currentUser.projects.length != 0 ? (
            <div className="mt-4">
              <div className="d-flex mt-2 pl-2">
                <H3>Your Projects</H3>
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
              <H3>Create New Project</H3>
            </button>
          </div>
        </div>
      </div>
      <Route
        exact
        path={"/dashboard/create-project"}
        component={() => {
          return (
            <CreateProjectModal
              modalData={createModalData}
              onEditField={editCreateModalField}
              closeModal={closeCreateModal}
              onCreate={createProject}
              isCreatingProject={isCreatingProject}
            />
          );
        }}
      />
    </React.Fragment>
  );
};

export default HomePage;
