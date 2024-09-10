import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default function GardeningTipsCard({ data, img }) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        {" "}
        Gardening Tips from Google Gemini for your selected plant
      </h3>
      <Card
        style={{
          margin: "auto",
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
