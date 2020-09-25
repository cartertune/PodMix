import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Avatar = (props) => {
  const { avatarUrl } = props;

  return (
    <div className="avatar">
      <img src={avatarUrl} />
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
};

export default Avatar;
