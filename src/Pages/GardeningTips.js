import { React, useState, useRef } from "react";
import GardeningTipsCard from "./GardeningTipsCard";
import { ReactComponent as PictureIcon } from "../assets/pictureIcon.svg";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./GardeningTips.css";
import Error from "../components/Error";
import Header from "../components/Header";

export default function GardeningTips() {
  const [APIdata, setAPIData] = useState(null);
  const [loading, setloading] = useState(false);
  const formData = new FormData();
  const [value, setValue] = useState({ file: "", imgFile: "" });
  const fileInputRef = useRef();
  const [error, SetError] = useState({
    isError: false,
    status: "",
    message: "",
    debugMsg: "",
    stack: "",
  });

  async function getResponseFromAPI(formData) {
    let respData = null;
    try {
      respData = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/plantTips`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (respData && respData.status === 200) {
        setAPIData(respData.data);
      }
    } catch (err) {
      setloading(false);
      SetError({
        isError: true,
        status: err.status,
        message: err.message,
        debugMsg: err.response.data.msg,
        stack: err.response.data.stack,
      });
    }
  }

  async function handleSubmit(event) {
    setloading(true);
    formData.append("img_file", value.imgFile);
    await getResponseFromAPI(formData);
    setloading(false);
  }

  function handleClick(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

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
        setValue({
          file: URL.createObjectURL(e.target.files[0]),
          imgFile: e.target.files[0],
        });
      }
    }
  }

  if (error.isError) {
    return <Error err={error} />;
  }

  if (APIdata) {
    return (
      <GardeningTipsCard
        data={APIdata.response}
        img={APIdata.fileURL}
        publicId={APIdata.publicId}
      />
    );
  }
  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Spinner animation="border" varaint="success" />
      </div>
    );
  }

  return (
    <>
      {!value.file && (
        <div className="gardening-tips-popup">
          <form className="gardening-tips-popup-form">
            <div className="d-flex flex-row">
              <PictureIcon className="gardening-tips-picture-icon" />
              <label
                htmlFor="img_file"
                style={{ marginLeft: "10px", textAlign: "center" }}
              >
                Upload an image of a plant for which you need gardening tips
              </label>
            </div>
            <br />
            <button
              className="gardening-tips-custom-file-button"
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
      {value.file && !error.isError && (
        <div>
          <Header isMobile={true} />
          <Card className="gardening-tips-card">
            <Card.Header>
              <Card.Title as="h3">
                Plant Image: Get Gardening Tips with Google Gemini
              </Card.Title>
            </Card.Header>
            <Card.Img
              variant="top"
              src={value.file}
              className="gardening-tips-uploaded-img"
            />
            <Card.Body style={{ fontSize: "16px" }}>
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="gardening-tips-signup-btn"
              >
                Submit
              </Button>
              <Button
                variant="primary"
                style={{ marginLeft: "10px" }}
                onClick={(e) => setValue({ file: "", imgFile: "" })}
                className="gardening-tips-reset-btn"
              >
                Reset
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
