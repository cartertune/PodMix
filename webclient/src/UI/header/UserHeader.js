import React from "react";
import _ from "lodash";
import Auth from "../../auth/Auth";
import Avatar from "../components/Avatar";

const UserHeader = props => {
  const { user, onClick } = props;

  if (!_.isEmpty(user)) {
    return (
      <div className="A d-flex align-items-center relative" onClick={onClick}>
        <div className="pr-4">{user.name}</div>
        <Avatar avatarUrl={user.picture} />
      </div>
    );
  }
  return (
    <a
      onClick={() => {
        Auth.login({ callbackLink: _.get(props, "location.pathname") });
      }}
    >
      Login / Sign-up
    </a>
  );
};

export default UserHeader;
