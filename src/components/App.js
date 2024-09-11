import Home from "../Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IdentifyPlant from "../Pages/IdentifyPlant";
import GardeningTips from "../Pages/GardeningTips";
import Posts from "../Pages/Allposts";
import PlantSuggestion from "../Pages/PlantSuggestion";
import Login from "../Pages/Login";
import PostDetails from "../components/PostDetails";
import UploadPicture from "../Pages/uploadPicture";

function App() {
  const mobileMediaQuery = "(max-width:992px)";
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const query = window.matchMedia(mobileMediaQuery);
    function handleQueryChange(queryEvent) {
      setIsMobile(queryEvent.matches);
    }
    getUser();
    query.addEventListener("change", handleQueryChange);

    return () => {
      query.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isMobile={isMobile} />} />
        <Route
          path="identifyPlant"
          element={user !== null ? <IdentifyPlant /> : <Login />}
        />
        <Route
          path="gardeningTips"
          element={user !== null ? <GardeningTips /> : <Login />}
        />
        <Route path="posts" element={<Posts />} />
        <Route
          path="plantSuggestion"
          element={user !== null ? <PlantSuggestion /> : <Login />}
        />
        <Route
          exact
          path="/login"
          element={
            user !== null ? <Home user={user} isMobile={isMobile} /> : <Login />
          }
        />
        <Route
          path="/post/details/:id"
          exact
          element={user !== null ? <PostDetails user={user} /> : <Login />}
        />
        <Route
          path="/newPost"
          element={user !== null ? <UploadPicture user={user} /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
