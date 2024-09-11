import { React, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./GardeningTipsCard.css";
import Header from "../components/Header";

export default function GardeningTipsCard({ data, img, publicId }) {
  useEffect(() => {
    return () => {
      onBeforeUnload();
    };
  }, []);

  const onBeforeUnload = async (e) => {
    const formData = new FormData();
    formData.append("publicId", data.publicId);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/removePic`, {
        publicId: publicId,
      });
    } catch (err) {
      console.log(err.status, err.message);
    }
  };

  return (
    <>
      <Header isMobile={true} />
      <h3 style={{ textAlign: "center" }}>
        {" "}
        Gardening Tips from Google Gemini for your selected plant
      </h3>
      <Card className="gardening-tips-result-card">
        <Card.Img
          variant="top"
          src={img}
          //style={{ objectFit: "contain", maxHeight: "550px" }}
          className="gardening-tips-result-img"
          fluid
        />
        <Card.Body>
          <Card.Title> Common Name: {data.name}</Card.Title>
          <Card.Subtitle>Scientific Name: {data.scientificName}</Card.Subtitle>
          <Card.Text>{data.description}</Card.Text>
          <Card.Subtitle>Gardening Tips</Card.Subtitle>
          <ListGroup variant="flush">
            {data.gardeningTips.map((tip) => {
              return <ListGroupItem>{tip}</ListGroupItem>;
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}
