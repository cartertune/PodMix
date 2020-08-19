import React from "react";
import Auth from "../../auth/Auth";

const LoginSplashPage = (props) => {
  const { currentLocation } = props;
  return (
    <div className="login-splash-page">
      <div className="logo-section row">
        <div className="col-2" />
        <div className="logo col-8 pt-100">
          <h1>Logo</h1>
        </div>
        <div className="col-2" />
      </div>
      <div className="bottom-section row justify-content-center mt-4">
        <button
          className="btn btn-primary col-8 py-4"
          onClick={() => {
            Auth.login({ callbackLink: "/" });
          }}
        >
          <h3>Login / Sign-up</h3>
        </button>
      </div>
    </div>
  );
};

export default LoginSplashPage;
