import { useState, useEffect, useRef, React } from "react";
import axios from "axios";
import { ReactComponent as Upvote } from "../assets/upvote.svg";
import { ReactComponent as Downvote } from "../assets/downvote.svg";
import { Stack } from "react-bootstrap";
import io from "socket.io-client";
import Error from "./Error";

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

function Like({ totalVotes, postId, userId, SetError }) {
  const [userState, setUserState] = useState({});
  const [postVote, setPostVote] = useState(0);
  //const [userCount, setUserCount] = useState(0);

  let initialUserState = useRef(0);

  useEffect(() => {
    getVotesFromAPI();
    socket.on("likes", (updatedPost) => {
      if (updatedPost.id === postId) {
        getVotesFromAPI();
      }
    });
    return () => {
      socket.off("likes");
    };
  }, []);

  useEffect(() => {
    if (
      initialUserState.current.upvote !== userState.upvote ||
      initialUserState.current.downvote !== userState.downvote
    ) {
      persistVotesToDB();
    }
  }, [userState]);

  const handleUpvote = (event) => {
    if (userState.upvote === false && userState.downvote === true) {
      setUserState({ upvote: true, downvote: false });
    } else if (userState.upvote === true && userState.downvote === false) {
      setUserState({ upvote: false, downvote: false });
    } else if (userState.upvote === false && userState.downvote === false) {
      setUserState({ upvote: true, downvote: false });
    }
  };

  const handleDownvote = (event) => {
    if (userState.downvote === false && userState.upvote === true) {
      setUserState({ upvote: false, downvote: true });
    } else if (userState.downvote === true && userState.upvote === false) {
      setUserState({ upvote: false, downvote: false });
    } else if (userState.upvote === false && userState.downvote === false) {
      setUserState({ upvote: false, downvote: true });
    }
  };

  const persistVotesToDB = async () => {
    const formData = new FormData();
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/${postId}/updateLikes`;
      formData.append("userId", userId);
      formData.append("userState", JSON.stringify(userState));
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

  const getVotesFromAPI = async () => {
    let response = null;
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/${postId}/getLikes`;
      response = await axios.post(
        url,
        { userId: userId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        initialUserState.current = response.data.state;
        setUserState(response.data.state);
        setPostVote(response.data.upvotes);
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

  return (
    <Stack direction="horizontal" gap={2}>
      <Upvote
        style={{ height: "20px", width: "20px" }}
        className="upvote"
        onClick={handleUpvote}
        fill={userState.upvote ? "rgb(1,185,107)" : "rgb(255,255,255)"}
        stroke="black"
      />
      <span>{postVote}</span>
      <Downvote
        style={{ height: "20px", width: "20px" }}
        className="downvote"
        onClick={handleDownvote}
        fill={userState.downvote ? "rgb(252,99,105)" : "rgb(255,255,255)"}
        stroke="black"
      />
    </Stack>
  );
}

export default Like;
