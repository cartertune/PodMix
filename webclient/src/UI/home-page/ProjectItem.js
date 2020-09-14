import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = (props) => {
  const { project } = props;
  const { title, id } = project;

  return (
    <Link to={`/projects/${id}`}>
      <div className="form-control d-flex align-items-center">
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default ProjectItem;
