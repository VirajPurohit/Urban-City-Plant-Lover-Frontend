import { React, useState } from "react";
import GardeningTipsCard from "./GardeningTipsCard";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function GardeningTips() {
  const [APIdata, setAPIData] = useState(null);
  const [disableBtn, setdisableBtn] = useState(false);
  const [loading, setloading] = useState(false);

  async function getResponseFromAPI(file) {
    let respData = null;
    try {
      respData = await axios.post(
        "http://localhost:5000/plantTips",
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
    return <GardeningTipsCard data={APIdata.response} img={APIdata.fileURL} />;
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
      <h2> Get Gardening Tips from Google Gemini !!</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label for="img_file">
            Upload the image of your plant for which you want gardening tips
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
