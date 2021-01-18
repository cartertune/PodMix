import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import P from "../components/P";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GiMusicalNotes } from "react-icons/gi";
import { FaComment } from "react-icons/fa";

const ProjectItem = (props) => {
  const { project, history } = props;
  const { title, id, mixes } = project;
  const [isExpanded, toggleExpansion] = useState(false);
  const projectUrl = `/projects/${id}`;

  const MixItem = (props) => {
    const { mix } = props;

    return (
      <div className="w-100 d-flex pt-3 position-relative">
        <P bold>{mix.title}</P>

        <div className="icons d-flex align-items-center px-2">
          <P>{mix.comments.length}</P>
          <FaComment className="mx-2" />
        </div>
      </div>
    );
  };
  return (
    <div
      className="project-item form-control d-flex flex-column justify-content-center"
      onClick={() => history.push(projectUrl)}
    >
      <div className="position-relative w-100 d-flex align-items-center">
        <P bold>{title}</P>
        <div
          className="icons p-2"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpansion(!isExpanded);
          }}
        >
          <div className="d-flex align-items-center">
            <P>{mixes.length}</P>
            <GiMusicalNotes className="music mx-2" />
            {isExpanded ? (
              <FiChevronUp className="chevron" />
            ) : (
              <FiChevronDown className="chevron" />
            )}
          </div>
        </div>
      </div>

      {isExpanded ? (
        <>
          {_.map(project.mixes, (mix) => (
            <MixItem mix={mix} key={mix.id} />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default withRouter(ProjectItem);
