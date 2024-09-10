import React from "react";
import { Carousel, Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default function PlantCards({ data, city }) {
  console.log(data);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        {" "}
        Plant Suggestion to grow in {city}'s climate{" "}
      </h3>
      <Carousel
        style={{
          marginTop: "2%",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
      >
        {data.map((plant, index) => {
          return (
            <Carousel.Item interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={plant.img}
                  style={{ marginLeft: "10%", height: "450px", width: "500px" }}
                />
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <Card.Text>{plant.description}</Card.Text>
                  <Card.Subtitle>Benefits</Card.Subtitle>
                  <ListGroup variant="flush">
                    {plant.benefits.map((benefit) => {
                      return <ListGroupItem>{benefit}</ListGroupItem>;
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
