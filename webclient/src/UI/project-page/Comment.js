import React from "react";
import { secondsToTimestamp } from "../../util/util";
import Avatar from "../components/Avatar";
import Auth from "../../auth/Auth";
import { FiX } from "react-icons/fi";
import Interactable from "react-interactable/noNative";


const Comment = (props) => {
  const { comment, onClick, onDelete } = props;
  const { time, text, creator } = comment;

  const user = Auth.getUser();
  const snapPoints = [{ x: -150 }, { x: 150 }];

  return (
  <Interactable.View horizontalOnly={true} className="w-100">
    <div className="comment position-relative">
      <div className="timestamp-container">
        <p>{`${secondsToTimestamp(time)} -`}</p>
      </div>
    <div
      className="form-control position-relative withtimestamp d-flex justify-content-between"
      onClick={onClick}
    >
      <p>{text}</p>
        <div className="avatar-container">
          {creator.email == _.get(user, "email") ? (
            <FiX className="delete-button" onClick={() => onDelete()} />) : (
          <Avatar avatarUrl={_.get(comment, "creator.avatarUrl")} />
        )}
        </div>
      </div>
    </div>
  </Interactable.View>
  );
};

export default Comment;
