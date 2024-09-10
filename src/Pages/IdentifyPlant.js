import { React, useState } from "react";
//import Sidebar from "../components/Sidebar";
import IdentifyPlantCard from "./IdentifyPlantCard";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function IdentifyPlant() {
  const [APIdata, setAPIData] = useState(null);
  const [disableBtn, setdisableBtn] = useState(false);
  const [loading, setloading] = useState(false);

  async function getResponseFromAPI(file) {
    let respData = null;
    try {
      respData = await axios.post(
        "http://localhost:5000/identifyPlants",
        {
          img_file: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    if (respData.status === 200) {
      setAPIData(respData.data);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setdisableBtn(true);
    setloading(true);
    await getResponseFromAPI(event.target.img_file.files[0]);
    setloading(false);
  }

  if (APIdata) {
    return <IdentifyPlantCard data={APIdata.response} img={APIdata.fileURL} />;
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
      <h2> Identify that plant with the help from Google Gemini !!</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label for="img_file">
            Upload the image of your plant that you want to identify
          </label>
          <br />
          <input type="file" name="img_file" id="img_file" required />
          <br />
          <br />
          <button type="submit" disabled={disableBtn}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
