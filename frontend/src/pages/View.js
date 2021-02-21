import React, { useState, useEffect } from "react";
import sampleresume from "../images/sampleresume.jpg";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

import { Magnifier } from "react-image-magnifiers";
import Comment from "../components/Comment";



const View = ({ getResume }) => {
  const [resume, setResume] = useState(null);
  const [comment, setComment] = useState("");
  let { id } = useParams();

  useEffect(() => {

    axios.get(`http://104.211.49.83/resume/${id}/details`).then((res) => {
      console.log(res.data);
      const resume_details = res.data;
      // axios.get({
      //   url: `http://104.211.49.83/resume/${id}/file`,
      //   responseType: 'blob'
      // }).then((res) => {
        setResume(resume_details);
      //   console.log(res.data);
      // }).catch((error) => {
      //   console.log(error);
      //   // TODO: Display Error
      // });
    }).catch((err) => {
      console.log(err);
      // TODO: Display 404
    });
  },[]);

  const handleSubmission = (event) => {
    event.preventDefault();
    let body = {
      'review': comment,
      'user_id': '1234567890',
      'resume_id': id
    }
    console.log(body);

    axios({
      method: 'post',
      url: 'http://104.211.49.83/review/new',
      data: body,
      headers: {'Content-Type': 'application/json' }
    })
    .then(function (response) {
        //handle success
        console.log(response);
        // Clear fields
        setComment("");
    })
    .catch(function (response) {
        //handle error
        console.log(response);
        // TODO: Display error message
    });

  };
  if(resume) {

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
        <br />
        <br />
        <br />
        <form  onSubmit={handleSubmission}>
          <textarea
            id="comment"
            placeholder="Leave a comment"
            value={comment}
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
            onChange={e => setComment(e.target.value)}
          ></textarea>
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
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {/* {resume.comments.map((data, i) => (
          <Comment key={i} comment={data} />
        ))} */}
      </div>
    );

  } else {
    return <>Loading</>;
  }
};

export default View;
