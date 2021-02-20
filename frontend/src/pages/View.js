import React from "react";
import sampleresume from "../images/sampleresume.jpg";

import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

/**
 * view a specific resume with all comments below and timestamp + details to the side maybe
 * probably have to pass in an object representing the resume to the props
 */

const View = () => {
  return (
    <div className="view">
      {/** need the database before we can fill */}
      <h1>Resume #1</h1>
      <SideBySideMagnifier
      id="pdf" imageSrc={sampleresume} imageAlt="Example" style={{ width: "500px", display: "block", marginLeft: "auto", marginRight:"auto", transform: "translateY(20%)" }} />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <form>
        <textarea id="comment" style={{color:"black", width:"500px", height:"100px", display: "block", marginLeft: "auto", marginRight:"auto", fontSize:"20px", borderRadius: "20px", padding: "10px" }}>
          Leave a comment
        </textarea>
      </form>

      <br/>
      <br/>

      <div className="view-btns">
      <input type="submit" value="Submit" style={{
        color:"black", 
        width:"150px", 
        height:"50px",
        borderRadius: "20px", 
        border:"none", 
        backgroundColor:"#00d46a",
        fontSize: "15px",
        resize: "none"
        }}/>

      <Link to="/list">
      <button type="submit" style={{
        color:"black", 
        width:"150px", 
        height:"50px", 
        borderRadius: "20px", 
        border:"none", 
        backgroundColor:"#d40000",
        fontSize: "15px"
        }}>Cancel</button>
        </Link>

        </div>
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default View;
