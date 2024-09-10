import React from "react";

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_SERVER_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div>
      <button onClick={googleAuth}>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;
