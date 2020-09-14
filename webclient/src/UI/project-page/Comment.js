import React from "react";
import { secondsToTimestamp } from "../../util/util";

const Comment = (props) => {
  const { comment, onClick } = props;
  const { time, text } = comment;

  return (
    <div className="position-relative">
      <div className="timestamp-container">
        <p>{secondsToTimestamp(time)}</p>
      </div>
      <div
        className="form-control position-relative withtimestamp"
        onClick={onClick}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
