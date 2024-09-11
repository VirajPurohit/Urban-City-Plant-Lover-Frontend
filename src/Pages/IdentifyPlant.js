import { React, useState, useRef } from "react";
//import Sidebar from "../components/Sidebar";
import IdentifyPlantCard from "./IdentifyPlantCard";
import { ReactComponent as PictureIcon } from "../assets/pictureIcon.svg";
import { Card, Image, Button } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./IdentifyPlant.css";
import Error from "../components/Error";
import Header from "../components/Header";

export default function IdentifyPlant() {
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
        `${process.env.REACT_APP_SERVER_URL}/identifyPlants`,
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
      SetError({
        isError: true,
        status: err.response.status,
        message: err.message,
        debugMsg: err.response.data.msg,
        stack: err.response.data.stack,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
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

  if (APIdata) {
    return (
      <IdentifyPlantCard
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
        <>
          <div className="identify-plants-popup">
            <form className="identify-plants-popup-form">
              <div className="d-flex flex-row">
                <PictureIcon className="identify-plant-picture-icon" />
                <label
                  htmlFor="img_file"
                  style={{ marginLeft: "10px", textAlign: "center" }}
                >
                  Upload an image of a plant that you want to identify
                </label>
              </div>
              <br />
              <button
                className="identify-plants-custom-file-button"
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
        </>
      )}
      {value.file && !error.isError && (
        <div>
          <Header isMobile={true} />
          <Card className="identify-plant-card">
            <Card.Header>
              <Card.Title as="h3">
                Plant Image: Identify plants with Google Gemini
              </Card.Title>
            </Card.Header>
            <Image
              src={value.file}
              style={{
                objectFit: "contain",
                maxHeight: "550px",
              }}
              fluid
            />
            <Card.Body style={{ fontSize: "16px" }}>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                variant="primary"
                style={{ marginLeft: "10px" }}
                onClick={(e) => setValue({ file: "", imgFile: "" })}
              >
                Reset
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
      {error.isError && (
        <>
          <Header isMobile={true} /> <Error err={error} />
        </>
      )}
    </>
  );
}
