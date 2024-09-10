import { React, useState } from "react";
import "./MobileSideBar.css";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as HamburgerIcon } from "../assets/Hamburger-Icon.svg";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    setIsOpen(!isOpen);
  }

  return (
    <div className="hamburger-menu-wrapper">
      <HamburgerIcon onClick={handleClick} className="hamburger" />
      {isOpen && (
        <div className="mobile-sidebar">
          <nav>
            <div className="mobile-sidebar-Items-Container">
              <Link to="/">
                <div className="mobile-sidebar-Items"> Home </div>
              </Link>

              <Link to="/plantSuggestion">
                <div className="mobile-sidebar-Items">
                  {" "}
                  Get Plant Suggestions{" "}
                </div>
              </Link>
              <Link to="/gardeningTips">
                <div className="mobile-sidebar-Items"> Get Gardening Tips</div>
              </Link>
              <Link to="/identifyPlant">
                <div className="mobile-sidebar-Items"> Identify that Plant</div>
              </Link>
              <Link to="/posts">
                <div className="mobile-sidebar-Items">
                  {" "}
                  Check out our digital garden
                </div>
              </Link>
            </div>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
}
