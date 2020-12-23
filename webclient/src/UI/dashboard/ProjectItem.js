import React, { useState } from "react";
import { Link } from "react-router-dom";
import P from "../components/P";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProjectItem = (props) => {
  const { project } = props;
  const { title, id } = project;
  const { isExpanded, expandProject } = useState(false);

  return (
    <Link to={`/projects/${id}`}>
      <div className="form-control d-flex align-items-center">
        <P>{title}</P>
        <div className="position-absolute chevron-icon">
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;
