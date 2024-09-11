import React from "react";
import { Carousel, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./PlantCard.css";

export default function PlantCards({ data, city }) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        {" "}
        Plant Suggestion to grow in {city}'s climate{" "}
      </h3>
      <div className="plant-card-wrapper">
        <Carousel
          style={{
            marginTop: "2%",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "fit-content",
          }}
        >
          {data.map((plant, index) => {
            return (
              <Carousel.Item interval={15000} key={index}>
                <Card>
                  <div className="d-flex justify-content-center">
                    <Card.Img
                      variant="top"
                      src={plant.img}
                      style={{ height: "450px", width: "500px" }}
                      className="cardImg"
                    />
                  </div>
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
      </div>
    </>
  );
}
