import { React, useState, useRef } from "react";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import { Overlay, Tooltip, Stack } from "react-bootstrap";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  RedditIcon,
  RedditShareButton,
} from "react-share";

function Share({ postId, postTitle, url }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  let Share_URL = `${process.env.REACT_APP_IP}/post/details/${postId}`; //Remove in prod

  return (
    <>
      <ShareIcon
        style={{ height: "20px", width: "20px" }}
        ref={target}
        onClick={() => setShow(!show)}
      />
      <Overlay placement="top" target={target.current} show={show}>
        {(props) => (
          <Tooltip id="ShareButton-tooltip" {...props}>
            <Stack direction="horizontal" gap={8}>
              <FacebookShareButton url={Share_URL} title={postTitle}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={Share_URL} title={postTitle}>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
              <RedditShareButton url={Share_URL} title={postTitle}>
                <RedditIcon size={40} round={true} />
              </RedditShareButton>
            </Stack>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default Share;
