import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Error from "../components/Error";

export default function Allposts() {
  const [images, setImages] = useState(null);
  const [dropdownval, setDropDownVal] = useState("upvotes");
  const [error, SetError] = useState({
    isError: false,
    status: "",
    message: "",
    debugMsg: "",
    stack: "",
  });

  async function fetchFromAPI(sortBy) {
    try {
      const URL = `${process.env.REACT_APP_SERVER_URL}/gallery?sortby=${sortBy}`;
      const data = await axios.get(URL);
      return data;
    } catch (err) {
      console.log(err);
      SetError({
        isError: true,
        status: err.response.status,
        message: err.message,
        debugMsg: err.response.data.msg,
        stack: err.response.data.stack,
      });
    }
  }

  useEffect(() => {
    setImages(null);
    fetchFromAPI(dropdownval).then((data) => setImages(data));
  }, [dropdownval]);

  const HandleChange = (event) => {
    setDropDownVal(event.target.value);
    //alert(event.target.value);
  };

  return (
    <>
      {!error.isError && (
        <>
          <Header isMobile={true} />
          <div className="Feed-container" style={styleObj.FeedContainer}>
            <div
              className="Feed-container-bar"
              style={styleObj.FeedContainerBar}
            >
              <select
                name="sortBy"
                id="sortBy"
                className="Dropdown"
                onChange={HandleChange}
              >
                <option value="upvotes" defaultValue>
                  Most Upvotes
                </option>
                <option value="latest">Latest</option>
              </select>
            </div>
            {images && <Feed images={images} />}
          </div>
        </>
      )}
      {error.isError && <Error err={error} />}
    </>
  );
}

const styleObj = {
  FeedContainer: {
    marginTop: "50px",
    marginLeft: "5%",
    marginRight: "5%",
  },
  FeedContainerBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
