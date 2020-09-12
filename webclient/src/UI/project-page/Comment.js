import React from "react";
import { secondsToTimestamp } from "../../util/util";

const Comment = (props) => {
  const { comment, onClick } = props;
  const { time, text } = comment;

  return (
    <div className="form-control position-relative" onClick={onClick}>
      <div className="timestamp-container">
        <p>{secondsToTimestamp(time)}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
