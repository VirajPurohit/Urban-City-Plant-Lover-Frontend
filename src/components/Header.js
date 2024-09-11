import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { Image, Button } from "react-bootstrap";
import { ReactComponent as Coin } from "../assets/GoldCoin.svg";
import axios from "axios";
import MobileSidebar from "../components/MobileSideBar";

export default function Header({ isMobile }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

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
    getUser();
  }, []);
  const logout = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
  };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_SERVER_URL}/auth/google/callback`,
      "_self"
    );
  };

  function handleNewUpload(e) {
    navigate("/newPost");
  }

  if (user) {
    return (
      <div className="Header-Bar">
        <div className="wrapper-start">
          {isMobile && (
            <div className="mobile-sidebar-menu">
              <MobileSidebar />
            </div>
          )}
          <div className="profile-section">
            <Image
              src={user.profilepic.fileURL}
              className="profile-img"
              roundedCircle
            />
            <span className="profile-name" style={{ marginRight: "15px" }}>
              {user.username}
            </span>
          </div>
          {/* location === post  || location === post/details/*, don't display coin section, display upload Image button */}
          {currentPath === "/posts" ||
          currentPath.match(/^\/post\/details\/[a-z,0-9]+/) ? (
            <Button
              size="sm"
              className="new-post-btn"
              onClick={handleNewUpload}
            >
              New Post
            </Button>
          ) : (
            <div>
              <Coin className="tokens" />
              <span style={{ marginRight: "5px" }}>{user.tokens}</span>
            </div>
          )}
        </div>
        <div className="title" style={{ display: "inline" }}>
          Urban City Plant Lover
        </div>
        <div className="wrapper-end">
          <Button size="sm" className="logout-btn" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Header-Bar">
        <div className="title">Urban City Plant Lover</div>
        <Button size="sm" className="login-btn" onClick={googleAuth}>
          Login
        </Button>
      </div>
    );
  }
}
