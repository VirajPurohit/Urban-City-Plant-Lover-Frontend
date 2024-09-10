import React from "react";
import { Card } from "react-bootstrap";

export default function IdentifyPlantCard({ data, img }) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        {" "}
        Identify that plant with the help from Google Gemini !!
      </h3>
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50%",
        }}
      >
        <Card.Img
          variant="top"
          src={img}
          style={{ marginLeft: "10%", height: "450px", width: "500px" }}
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
