import { React, useState, useEffect } from "react";
import { Form, Button, Stack, Image, Card } from "react-bootstrap";
import { ReactComponent as Delete } from "../assets/delete-icon.svg";
import axios from "axios";
import io from "socket.io-client";
import "./Comment.css";

const socket = io(`${process.env.REACT_APP_SERVER_IP}`); // Need to find solution for this in Prod

export default function Comments({ user, post, SetError }) {
  const [comments, setComments] = useState([]);
  const [newCommentFlag, setNewCommentFlag] = useState(false);

  useEffect(() => {
    getCommentsInitial();
    socket.on("comments", (updatedPost) => {
      if (updatedPost.id === post._id) {
        getCommentsInitial();
      }
    });
    return () => {
      socket.off("comments");
    };
  }, []);

  useEffect(() => {
    if (newCommentFlag === true) getCommentsInitial();
    setNewCommentFlag(false);
  }, [newCommentFlag]);

  async function getCommentsInitial() {
    try {
      const postId = post._id;
      const url = `${process.env.REACT_APP_SERVER_URL}/${postId}/comments`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setComments(response.data.comments);
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
  }

  async function getResponseFromAPI(formData) {
    try {
      const postId = post._id;
      const url = `${process.env.REACT_APP_SERVER_URL}/${postId}/comments`;
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        setNewCommentFlag(true);
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { comment } = event.target;
    const formData = { comment: comment.value, userid: user._id };
    getResponseFromAPI(formData);
    comment.value = "";
  };

  const handleDelete = async (commentId, event) => {
    try {
      const formData = new FormData();
      formData.append("commentId", commentId);
      const url = `${process.env.REACT_APP_SERVER_URL}/${post._id}/delComments`;
      await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
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

  return (
    <>
      <br />
      <Form onSubmit={handleSubmit} className="comment-form">
        <Form.Group>
          <Form.Control
            as="textarea"
            row={10}
            cols={50}
            placeholder="Write a comment"
            name="comment"
            controlId="comment"
            style={{ border: "1px solid black" }}
          ></Form.Control>

          <Button variant="primary" type="submit" style={{ display: "inline" }}>
            Submit
          </Button>
        </Form.Group>
      </Form>
      <br />
      {comments.length > 0 && (
        <Stack direction="vertical" style={{ margin: "auto", width: "50%" }}>
          {comments.map((comment) => {
            return (
              <>
                <Card key={comment._id}>
                  <Card.Header className="dflex-justify-content-between">
                    <span>
                      <Image
                        src={comment.profilePic}
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
                        {comment.username}
                      </span>
                      <span
                        className="postedOn p-2"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {comment.commentedAt.split("T")[0]}
                      </span>
                    </span>
                    {user.username === comment.username && (
                      <Delete
                        style={{ height: "25px", width: "25px" }}
                        className="ms-auto"
                        onClick={(event) => handleDelete(comment._id, event)}
                      />
                    )}
                  </Card.Header>

                  <Card.Body>
                    <Card.Text>{comment.comment}</Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </>
            );
          })}
        </Stack>
      )}
    </>
  );
}
