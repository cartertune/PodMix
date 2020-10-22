import React from "react";
import { secondsToTimestamp } from "../../util/util";
import Avatar from "../components/Avatar";
import Auth from "../../auth/Auth";
import { FiX } from "react-icons/fi";

const Comment = (props) => {
  const { comment, onClick, onDelete, isHighlighted } = props;
  const { time, text, creator } = comment;
  const user = Auth.getUser();

  return (
    <div className="comment position-relative">
      <div className="timestamp-container">
        <p>{`${secondsToTimestamp(time)} -`}</p>
      </div>
      <div
        className={`form-control position-relative withtimestamp d-flex justify-content-between ${
          isHighlighted ? "highlighted" : ""
        }`}
        onClick={onClick}
      >
        <p>{text}</p>
        <div className="avatar-container">
          {creator.email == _.get(user, "email") ? (
            <FiX className="delete-button" onClick={() => onDelete()} />
          ) : (
            <Avatar avatarUrl={_.get(comment, "creator.avatarUrl")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
