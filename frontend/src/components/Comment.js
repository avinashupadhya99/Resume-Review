import React from "react";

const Comment = ({ review }) => {
  console.log("[Comment.js], data: ", review);
  return (
    <div className="comment-box">
      <h1></h1>
      <p>{review.review}</p>
      <h4>{review.created_at}</h4>
    </div>
  );
};

export default Comment;
