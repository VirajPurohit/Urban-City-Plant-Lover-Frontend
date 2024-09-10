import React from "react";
import "./Sidebar.css";
import { Outlet, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="Sidebar"
      style={{
        borderImageSource: "url(" + require("../assets/Vine-Border.jpg") + ")",
      }}
    >
      <nav>
        <div className="Sidebar-Items-Container">
          <Link to="/">
            <div className="Sidebar-Items"> Home </div>
          </Link>

          <Link to="/plantSuggestion">
            <div className="Sidebar-Items"> Get Plant Suggestions </div>
          </Link>
          <Link to="/gardeningTips">
            <div className="Sidebar-Items"> Get Gardening Tips</div>
          </Link>
          <Link to="/identifyPlant">
            <div className="Sidebar-Items"> Identify that Plant</div>
          </Link>
          <Link to="/posts">
            <div className="Sidebar-Items"> Check out our digital garden</div>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
