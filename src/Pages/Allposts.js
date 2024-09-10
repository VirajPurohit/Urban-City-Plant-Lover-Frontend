import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Feed";

export default function Allposts() {
  const [images, setImages] = useState(null);
  const [dropdownval, setDropDownVal] = useState("upvotes");

  async function fetchFromAPI(sortBy) {
    try {
      const URL = "http://localhost:5000/gallery?sortby=" + sortBy;
      const data = await axios.get(URL);
      return data;
    } catch (err) {
      console.log(err);
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
    <div className="Feed-container" style={styleObj.FeedContainer}>
      <div className="Feed-container-bar" style={styleObj.FeedContainerBar}>
        <select
          name="sortBy"
          id="sortBy"
          className="Dropdown"
          onChange={HandleChange}
        >
          <option value="views">Most Views</option>
          <option value="upvotes" defaultValue>
            Most Upvotes
          </option>
          <option value="latest">Latest</option>
        </select>
      </div>
      {images && <Feed images={images} />}
    </div>
  );
}

const styleObj = {
  FeedContainer: {
    marginTop: "50px",
    marginLeft: "10%",
    marginRight: "8%",
  },
  FeedContainerBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
