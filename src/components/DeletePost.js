import { React, useState } from "react";
import { ReactComponent as ThreeDots } from "../assets/three-dots-vertical.svg";
import { useNavigate } from "react-router-dom";
import "./DeletePost.css";
import axios from "axios";

function DeletePost({ postId, SetError }) {
  const navigate = useNavigate();

  async function handleDelete(e) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      let respData = null;
      try {
        respData = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/delete/${postId}`
        );
        if (respData.status === 200) {
          navigate("/posts");
        }
      } catch (err) {
        SetError({
          isError: true,
          status: err.response.status,
          message: err.message,
          debugMsg: err.response.data.msg,
          stack: err.response.data.stack,
        });
      }
    }
  }

  return (
    <>
      <div className="dropdown-wrapper">
        <ThreeDots className="dropdown" />
        <div className="dropdown-content">
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      </div>
    </>
  );
}

export default DeletePost;
