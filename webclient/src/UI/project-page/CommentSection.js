import React from "react";
import _ from "lodash";

import Comment from "./Comment";

const CommentSection = (props) => {
  const {
    mix,
    handlePosChange,
    onDeleteComment,
    onCommentSelected,
    currentAudioPosition,
  } = props;
  const { comments } = mix;
  return (
    <div className="comment-section mt-3 pb-3">
      {_.isEmpty(comments) ? (
        <div className="w-100 text-center pt-5">
          <p>No Comments yet</p>
        </div>
      ) : (
        _.map(_.sortBy(comments, "time"), (comment) => (
          <div key={comment.id} className="mb-2">
            <Comment
              comment={comment}
              onClick={() => onCommentSelected(comment)}
              onDelete={() =>
                onDeleteComment({ mixId: mix.id, commentId: comment.id })
              }
              isHighlighted={_.inRange(
                currentAudioPosition,
                comment.time,
                comment.time + 3
              )}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
