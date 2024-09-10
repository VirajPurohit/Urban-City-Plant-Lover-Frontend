import React from "react";
import { Card } from "react-bootstrap";

export default function ImageCard({ gallery }) {
  return (
    <>
      {gallery.map(function (post, index) {
        let id = post.id;
        let imgsrc = post.pic.fileURL;
        let title = post.title;

        return (
          <Card
            key={id}
            style={{ width: "18rem" }}
            className="bg-dark text-white"
          >
            <Card.Img
              variant="top"
              src={imgsrc}
              style={{ height: "19rem", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
