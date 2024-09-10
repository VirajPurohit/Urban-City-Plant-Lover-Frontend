import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import axios from "axios";
import Header from "./Header";
import DeletePost from "./DeletePost";
import Comments from "./Comments";
import Like from "./Like";
import Share from "./Share";
import { Card, Image, Stack, Badge, Row, Col } from "react-bootstrap";
import comments from "../assets/comments.svg";
import Error from "./Error";

import "./PostDetails.css";

function PostDetails({ user }) {
  const { id } = useParams(); //Post Id
  const [post, setPost] = useState(null);
  const [error, SetError] = useState({
    isError: false,
    status: "",
    message: "",
    debugMsg: "",
    stack: "",
  });

  const getPostDetails = async () => {
    try {
      let respData;
      let url = `${process.env.REACT_APP_SERVER_URL}/post/${id}`;
      respData = await axios.get(url);

      if (respData && respData.status === 200) {
        setPost(respData.data);
      }
    } catch (err) {
      SetError({
        isError: true,
        status: err.response.status,
        message: err.message,
        debugMsg: err.response.data.msg,
        stack: err.response.data.stack,
      });
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  if (error.isError) {
    return <Error err={error} />;
  }

  if (post !== null) {
    return (
      <>
        <Header isMobile={true} />
        <Card
          // style={{
          //   margin: "auto",
          //   width: "50%",
          //   maxHeight: "fitContent",
          // }}
          className="post-details-card"
        >
          <Card.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Card.Title as="h3" style={{ display: "inline-block" }}>
                {post.title}
              </Card.Title>
              {post.postedBy._id === user._id && (
                <DeletePost postId={post._id} SetError={SetError} />
              )}
            </div>
            <Stack direction="horizontal">
              <Image
                src={post.postedBy.profilepic.fileURL}
                roundedCircle
                style={{
                  maxHeight: "22px",
                }}
              />
              <span
                className="username p-2"
                style={{
                  fontSize: "12px",
                }}
              >
                {post.postedBy.username}
              </span>
            </Stack>
            <Stack direction="vertical">
              <span
                className="postedOn"
                style={{
                  fontSize: "12px",
                }}
              >
                {post.createdAt.split("T")[0]}
              </span>
            </Stack>
          </Card.Header>
          <Image
            src={post.pic.fileURL}
            style={{
              objectFit: "contain",
              maxHeight: "550px",
            }}
            fluid
          />
          <Card.Body style={{ fontSize: "16px" }}>
            <Card.Subtitle>Description</Card.Subtitle>
            <Card.Text>{post.description}</Card.Text>
            {/*<Card.Subtitle>Tags</Card.Subtitle>
            <Card.Text>
              <Stack direction="horizontal" gap={2}>
                {post.tags.map((tag) => {
                  return (
                    <Badge
                      bg="success"
                      className="ml-2"
                      style={{
                        fontSize: "16px",
                        color: "white",
                        fontWeight: "400",
                      }}
                    >
                      {tag}
                    </Badge>
                  );
                })}
              </Stack>
            </Card.Text>*/}
            <Row>
              <Col>
                <Card.Subtitle>Likes</Card.Subtitle>
                <Like
                  totalVotes={post.totalVotes}
                  postId={id}
                  userId={user._id}
                  SetError={SetError}
                />
              </Col>
              <Col>
                <Card.Subtitle>Comments</Card.Subtitle>
                <Stack direction="horizontal" gap={2}>
                  <Image
                    src={comments}
                    style={{ height: "20px", width: "20px" }}
                  />
                  <span>{post.comments.length}</span>
                </Stack>
              </Col>
              <Col>
                <Card.Subtitle>Share</Card.Subtitle>
                <Share
                  postId={id}
                  postTitle={post.title}
                  url={window.location.href}
                  SetError={SetError}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Comments user={user} post={post} SetError={SetError} />
      </>
    );
  }
}

export default PostDetails;
