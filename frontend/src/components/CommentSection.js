import React from "react";
import Comment from "./Comment";

const CommentSection = ({ comments }) => {
  console.log("In Comment Section with props:", comments);

  return (
    <div className="comment-section">
      {comments.map((data, i) => (
        <Comment key={i} comment={data} />
      ))}
    </div>
  );
};

export default CommentSection;
