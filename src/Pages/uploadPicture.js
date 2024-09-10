import React from "react";
import { useState, useRef } from "react";
import { ReactComponent as PictureIcon } from "../assets/pictureIcon.svg";
import { Card, Image, Stack, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadPicture.css";
import Error from "../components/Error";
import Header from "../components/Header";

function UploadPicture({ user }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    file: "",
    imgFile: "",
  });

  const [errMsg, setErrMsg] = useState({
    title: "",
    description: "",
  });

  const [error, SetError] = useState({
    isError: false,
    status: "",
    message: "",
    debugMsg: "",
    stack: "",
  });

  const fileInputRef = useRef();

  const navigate = useNavigate();

  function handleChange(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMb = selectedFile.size / (1024 * 1024).toFixed(2);
      const fileType = selectedFile.type;
      if (fileSizeInMb > 10) {
        alert("File size cannot exceed 10 MB");
      } else if (!fileType.match(/image\/(jpeg|jpg|png)/)) {
        alert("Invalid file type, accepted file type are .png,.jpg, .jpeg");
      } else {
        setValues({
          ...values,
          file: URL.createObjectURL(e.target.files[0]),
          imgFile: e.target.files[0],
        });
      }
    }
  }

  function handleTitleChange(e) {
    let str = e.target.value;
    if (str.length <= 20) {
      setValues({ ...values, title: str });
      setErrMsg({
        ...errMsg,
        title: "",
      });
    } else {
      setErrMsg({ ...errMsg, title: "Title cannot exceed 20 characters" });
    }
  }

  function handleDescriptionChange(e) {
    let str = e.target.value;
    if (str.length <= 200) {
      setValues({ ...values, description: str });
      setErrMsg({
        ...errMsg,
        description: "",
      });
    } else {
      setErrMsg({
        ...errMsg,
        description: "Description cannot exceed 200 characters",
      });
    }
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 212)}px`;
  }

  function handleClick(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

  function handleSubmit(e) {
    if (window.confirm("Do you wish to submit this post ?")) {
      if (values.title === "") {
        setErrMsg({ ...errMsg, title: "Title cannot be empty" });
      } else {
        const data = {
          img_title: values.title,
          img_desc: values.description,
          postedBy: user._id,
        };
        let formData = new FormData();

        for (let key in data) {
          formData.append(key, data[key]);
        }
        formData.append("img_file", values.imgFile);
        sendResponse(formData);
      }
    }
  }

  async function sendResponse(formData) {
    let respData = null;
    try {
      respData = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/new-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (respData !== null && respData.status === 200) {
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

  return (
    <>
      {!values.file && (
        <div className="upload-picture-popup">
          <form className="upload-picture-popup-form">
            <div className="d-flex flex-row">
              <PictureIcon className="upload-picture-icon" />
              <label
                htmlFor="img_file"
                style={{ marginLeft: "10px", textAlign: "center" }}
              >
                Upload an image from your garden
              </label>
            </div>
            <br />
            <button
              className="upload-picture-custom-file-button"
              onClick={handleClick}
            >
              Upload
            </button>
            <input
              type="file"
              name="img_file"
              id="img_file"
              onChange={handleChange}
              multiple
              accept=".jpg, .jpeg, .png"
              ref={fileInputRef}
              required
            />
            <br />
          </form>
        </div>
      )}
      {values.file && !error.isError && (
        <div>
          <Header isMobile={true} />
          <Card
            // style={{
            //   margin: "auto",
            //   width: "50%",
            //   maxHeight: "fitContent",
            //   marginTop: "2%",
            // }}
            className="upload-picture-card"
          >
            <Card.Header>
              <Card.Title as="h3">
                <input
                  name="title"
                  type="text"
                  placeholder="Give your post a unique title..."
                  style={{ width: "100%", border: "none" }}
                  onChange={handleTitleChange}
                  required
                />
                <br />
                <span className="error">{errMsg.title}</span>
              </Card.Title>
              <Stack direction="horizontal">
                <Image
                  src={user.profilepic.fileURL}
                  roundedCircle
                  style={{
                    maxHeight: "22px",
                  }}
                />
                <span
                  className="username p-2"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {user.username}
                </span>
              </Stack>
              <Stack direction="vertical">
                <span
                  className="postedOn"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {new Date(Date.now()).toISOString().split("T")[0]}
                </span>
              </Stack>
            </Card.Header>
            <Image
              src={values.file}
              style={{
                objectFit: "contain",
                maxHeight: "550px",
              }}
              fluid
            />
            <Card.Body style={{ fontSize: "16px" }}>
              <Card.Subtitle>Description</Card.Subtitle>
              <Card.Text>
                <textarea
                  placeholder="Add a description..."
                  style={{ width: "100%", height: "" }}
                  onChange={handleDescriptionChange}
                ></textarea>
                <br />
                <span className="error">{errMsg.description}</span>
              </Card.Text>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
      {error.isError && <Error err={error} />}
    </>
  );
}

export default UploadPicture;
