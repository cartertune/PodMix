import React from "react";
import _ from "lodash";

import Comment from "./Comment";

const CommentSection = (props) => {
  const { mix, handlePosChange } = props;
  const { comments } = mix;
  return (
    <div className="comment-section mt-4">
      {_.isEmpty(comments) ? (
        <div className="w-100 text-center pt-5">
          <p>No Comments yet</p>
        </div>
      ) : (
        _.map(comments, (comment) => (
          <div key={comment.id} className="mb-2">
            <Comment
              comment={comment}
              onClick={() => handlePosChange(comment.time)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
