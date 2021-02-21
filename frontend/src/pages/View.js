import React from "react";
import sampleresume from "../images/sampleresume.jpg";

import { Link, useParams } from "react-router-dom";

import { Magnifier } from "react-image-magnifiers";
import Comment from "../components/Comment";

const View = ({ getResume }) => {
  let { id } = useParams();
  const resume = getResume(id);
  console.log(resume);
  return (
    <div className="view">
      <div className="pad"></div>
      <h1 className="resume-title">{resume.title}</h1>
      <h1 className="resume-subtitle">Resume ID: {id}</h1>
      <p className="resume-desc">{resume.description}</p>
      <Magnifier
        id="pdf"
        imageSrc={sampleresume}
        imageAlt="Example"
        style={{
          width: "500px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          transform: "translateY(10%)",
        }}
      />
      <br />
      <br />
      <br />
      <br />

      {resume.comments.map((data, i) => (
        <Comment key={i} comment={data} />
      ))}
      <br />
      <br />
      <br />
      <form>
        <textarea
          id="comment"
          placeholder="Leave a comment"
          style={{
            color: "black",
            width: "500px",
            height: "100px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "20px",
            borderRadius: "10px",
            padding: "10px",
          }}
        ></textarea>
      </form>
      <br />
      <br />
      <div className="view-btns">
        <input
          type="submit"
          value="Submit"
          style={{
            color: "white",
            width: "150px",
            height: "50px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "#00d46a",
            boxShadow: "0 4px 7px rgba(0, 0, 0, 0.4)",
            fontSize: "15px",
            resize: "none",
            cursor: "pointer",
          }}
        />

        <Link to="/list">
          <button
            className="cancel"
            style={{
              color: "white",
              width: "150px",
              height: "50px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#d40000",
              boxShadow: "0 4px 7px rgba(0, 0, 0, 0.4)",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default View;
