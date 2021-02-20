import React from "react";
import { Link } from "react-router-dom";

/**
 * List out all resumes in the database sorted by newest or something
 */
const List = () => {
  return (
    <div className="list">
      <Link to="/view">View Resume #1</Link>
    </div>
  );
};

export default List;
