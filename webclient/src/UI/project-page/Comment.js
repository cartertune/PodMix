import React, { useState } from "react";
import { secondsToTimestamp } from "../../util/util";
import Avatar from "../components/Avatar";
import { FiTrash, FiCheck, FiMoreVertical, FiX } from "react-icons/fi";
import P from "../components/P";
import Dropdown from "../components/Dropdown";

const Comment = (props) => {
  const {
    comment,
    onClick,
    onDelete,
    onCompleteComment,
    isHighlighted,
  } = props;
  const { time, text, isComplete } = comment;

  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className={`comment position-relative ${isComplete ? "is-complete" : ""}`}
    >
      <div className="timestamp-container">
        <P>{`${secondsToTimestamp(time)} -`}</P>
      </div>
      <div
        className={`form-control position-relative withtimestamp d-flex justify-content-between ${
          isHighlighted ? "highlighted" : ""
        }`}
        onClick={onClick}
      >
        <P>{text}</P>
        <div className="avatar-container">
          <Avatar avatarUrl={_.get(comment, "creator.avatarUrl")} />
          <div className="pl-1 position-relative">
            {showOptions ? (
              <FiX onClick={() => setShowOptions(false)} />
            ) : (
              <FiMoreVertical onClick={() => setShowOptions(true)} />
            )}
            <Dropdown show={showOptions}>
              <div
                onClick={() => {
                  onCompleteComment();
                  setShowOptions(false);
                }}
              >
                {isComplete ? (
                  <>
                    <div className="pt-1 pr-2">
                      <FiX />
                    </div>
                    <P>Uncomplete</P>
                  </>
                ) : (
                  <>
                    <div className="pt-1 pr-2">
                      <FiCheck />
                    </div>
                    <P>Complete</P>
                  </>
                )}
              </div>
              <hr />
              <div onClick={() => onDelete()}>
                <div className="pt-1 pr-2">
                  <FiTrash />
                </div>
                <P>Delete</P>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
