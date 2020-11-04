import React from "react";
import { Link } from "react-router-dom";
import P from "../components/P";

const ProjectItem = (props) => {
  const { project } = props;
  const { title, id } = project;

  return (
    <Link to={`/projects/${id}`}>
      <div className="form-control d-flex align-items-center">
        <P>{title}</P>
      </div>
    </Link>
  );
};

export default ProjectItem;
