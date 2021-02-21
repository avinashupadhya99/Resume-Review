import React from "react";

const Comment = ({ comment }) => {
  console.log("[Comment.js], data: ", comment);
  return (
    <div className="comment-box">
      <h1></h1>
      <p>{comment.text}</p>
      <h4>{comment.timestamp}</h4>
    </div>
  );
};

export default Comment;
