import Home from "../Pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IdentifyPlant from "../Pages/IdentifyPlant";
import GardeningTips from "../Pages/GardeningTips";
import Posts from "../Pages/Allposts";
import PlantSuggestion from "../Pages/PlantSuggestion";
import Login from "../Pages/Login";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      // console.log("User State: ", user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user !== null ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="identifyPlant" element={<IdentifyPlant />} />
        <Route path="gardeningTips" element={<GardeningTips />} />
        <Route path="posts" element={<Posts />} />
        <Route path="plantSuggestion" element={<PlantSuggestion />} />
        <Route
          exact
          path="/login"
          element={user !== null ? <Home /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
