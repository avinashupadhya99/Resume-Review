import React from "react";
import sampleresume from "../images/sampleresume.jpg";

import {
  Route,
  BrowserRouter as Router,
  Link,
  Switch,
  useParams,
} from "react-router-dom";

import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import CommentSection from "../components/CommentSection";

const View = ({ onNewComment, getResume }) => {
  let { id } = useParams();
  const resume = getResume(id);
  console.log(resume);
  return (
    <div className="view">
      <div className="pad"></div>
      <h1 className="resume-title">{resume.title}</h1>
      <h1 className="resume-subtitle">Resume #{id}</h1>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <CommentSection comments={resume.comments} />
    </div>
  );
};

export default View;
