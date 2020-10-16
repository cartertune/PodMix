import React from "react";
import logo from "../../resources/BigLogo.png";
import Auth from "../../auth/Auth";

const MobileSplashPage = (props) => {
  return (
    <div className="mobile-login-splash-page">
      <div className="logo-section row">
        <div className="col-2" />
        <div className="logo col-8 pt-100">
          <img src={logo} />
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

export default MobileSplashPage;
