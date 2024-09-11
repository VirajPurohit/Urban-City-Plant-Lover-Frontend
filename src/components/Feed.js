import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const Feed = ({ images }) => {
  const [width, setWidth] = useState(0);
  const divref = useRef("null");

  //https://stackoverflow.com/questions/72822172/how-to-get-html-element-width-dynamically-even-on-page-resize-in-react

  //https://legacy.reactjs.org/docs/hooks-effect.html#:~:text=What%20does%20useEffect%20do%3F,after%20performing%20the%20DOM%20updates.

  useEffect(() => {
    // when the component gets mounted

    setWidth(divref.current.offsetWidth);

    // to handle page resize
    const getwidth = () => {
      setWidth(divref.current.offsetWidth);
    };
    window.addEventListener("resize", getwidth);
    // remove the event listener before the component gets unmounted
    return () => window.removeEventListener("resize", getwidth);
  }, []);

  const styleobj = {
    "margin-top": "5px",
    display: "grid",
    "grid-template-columns": `repeat(auto-fill,300px)`,
    "grid-auto-rows": "auto",
    //overflow: "hidden",
    gap: "15px",
    width: "100%",
  };

  return (
    <>
      <div className="grid" ref={divref} style={styleobj}>
        {images !== null && <ImageCard gallery={images.data} />}
      </div>
    </>
  );
};

export default Feed;
