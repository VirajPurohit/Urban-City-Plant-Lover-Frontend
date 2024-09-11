import React from "react";
import { Card, Row, Col, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import { ReactComponent as Upvote } from "../assets/upvote.svg";
import { ReactComponent as Downvote } from "../assets/downvote.svg";
import { ReactComponent as Comment } from "../assets/comments.svg";
import "./ImageCard.css";

export default function ImageCard({ gallery }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/post/details/${id}`);
  };

  return (
    <>
      {gallery.map(function (post, index) {
        let id = post.id;
        let imgsrc = post.pic.fileURL;
        let title = post.title;

        return (
          <Card key={id} className="imageCard" onClick={() => handleClick(id)}>
            <Card.Img
              variant="top"
              src={imgsrc}
              style={{ height: "19rem", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Row>
                <Col>
                  <Stack direction="horizontal" gap={2}>
                    <Upvote
                      style={{ height: "20px", width: "20px" }}
                      className="upvote"
                      stroke="white"
                      fill="white"
                    />
                    <span>{post.upvotes.length - post.downvotes.length}</span>
                    <Downvote
                      style={{ height: "20px", width: "20px" }}
                      className="downvote"
                      stroke="white"
                      fill="white"
                    />
                  </Stack>
                </Col>
                <Col>
                  <Stack direction="horizontal" gap={2}>
                    <Comment
                      style={{
                        height: "30px",
                        width: "30px",
                        stroke: "white",
                        fill: "white",
                        borderColor: "white",
                      }}
                    />
                    <span>{post.comments.length}</span>
                  </Stack>
                </Col>
                <Col>
                  <ShareIcon
                    style={{
                      height: "30px",
                      width: "30px",
                      stroke: "white",
                      fill: "white",
                      borderColor: "white",
                    }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
