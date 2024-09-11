import { React, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import "./IdentifyPlantCard.css";

export default function IdentifyPlantCard({ data, img, publicId }) {
  useEffect(() => {
    return () => {
      onBeforeUnload();
    };
  }, []);

  const onBeforeUnload = async (e) => {
    const formData = new FormData();
    formData.append("publicId", publicId);
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
      <Card className="identify-plants-result-card">
        <Card.Header>
          <Card.Title as="h3">Identify plants with Google Gemini</Card.Title>
        </Card.Header>
        <Image
          src={img}
          style={{
            objectFit: "contain",
            maxHeight: "550px",
          }}
          className="identify-plants-result-image"
          fluid
        />
        <Card.Body>
          <Card.Title> Common Name: {data.name}</Card.Title>
          <Card.Subtitle>Scientific Name: {data.scientificName}</Card.Subtitle>
          <Card.Text>{data.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
