import React from "react";
import { Link } from "react-router-dom";

/**
 * we will be retrieving the resumes from the database eventually and then displaying them here so people can see and comment on them
 * it'll probably just list them in columns and sort by newest or # of comments
 * once we connect to the database, we'll have to map through the resumes and pass them as a prop to the view component to dynamically render the right data
 *
 */
const List = () => {
  return (
    <div className="list">
      <Link to="/view">View Resume #1</Link>
    </div>
  );
};

export default List;
