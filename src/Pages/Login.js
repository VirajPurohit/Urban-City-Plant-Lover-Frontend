import React from "react";
import { ReactComponent as SignInButton } from "../assets/SignInButton.svg";
import "./Login.css";

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_SERVER_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="login-form-container">
      {/* <div className="garden-img-container"> */}
      <img
        src={require("../assets/Hand-Drawn-Botanical-Garden.jpg")}
        className="garden-img"
      />
      {/* </div> */}

      <div className="login-form">
        <h3>Urban City Plant Lover</h3>
        <h4> Sign in</h4>
        <hr />
        <SignInButton
          onClick={googleAuth}
          style={{ position: "relative", top: "50px" }}
        />
      </div>
    </div>
  );
}

export default Login;
