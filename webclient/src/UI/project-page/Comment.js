import React from "react";
import { secondsToTimestamp } from "../../util/util";
import Avatar from "../components/Avatar";

const Comment = (props) => {
  const { comment, onClick } = props;
  const { time, text } = comment;

  return (
    <div className="position-relative">
      <div className="timestamp-container">
        <p>{secondsToTimestamp(time)}</p>
      </div>
      <div
        className="form-control position-relative withtimestamp d-flex justify-content-between"
        onClick={onClick}
      >
        <p>{text}</p>
        <div className="avatar-container">
          <Avatar avatarUrl={_.get(comment, "creator.avatarUrl")} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
