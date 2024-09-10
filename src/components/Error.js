import React from "react";
import "./Error.css";
import ErrorPic from "../assets/error.gif";

function Error({ err }) {
  return (
    <>
      <div className="error-page-wrapper">
        <div className="img-wrapper">
          <img src={ErrorPic} className="error-pic" />
        </div>
        <div className="error-info">
          <p className="error-status">{err.status}</p>
          <p className="error-msg">{err.msg}</p>
          <p className="error-debug-msg">
            Backend Error Message: {err.debugMsg}
          </p>
          <p className="error-stack"> Error Stack :{err.stack}</p>
        </div>
      </div>
    </>
  );
}

export default Error;
