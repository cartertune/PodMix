import React from "react";
import Auth from "../../auth/Auth";
import textLogoCombo from "../../resources/TextLogoComboBig.png";
import screenshot from "../../resources/Screenshot_iphonexspacegrey_portrait.png";

import MobileSplashPage from "./MobileSplashPage";

const LoginSplashPage = (props) => {
  return (
    <React.Fragment>
      <div className="splash-page web row">
        <div className="col-7 ">
          <div className="info-section d-flex flex-column justify-content-around">
            <div className="section top-info-section">
              <div className="logo-combo">
                <img src={textLogoCombo} />
              </div>
              <div className="w-75">
                <h2>Take your music seriously, not yourself</h2>
              </div>
            </div>
            <div className="px-2 login-button-container section w-50 my-5">
              <button
                className="btn btn-primary signup-button py-3 px-5"
                onClick={() => {
                  Auth.login({ callbackLink: "/" });
                }}
              >
                <h3>Sign-up for Free</h3>
              </button>
            </div>
            <div className="section">
              <p>- This is one cool thing</p>
              <p>- This is a second</p>
              <p>- And cant foget about this one</p>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="screenshot-section p-4">
            <div className="screenshot-container p-5">
              <img src={screenshot} />
            </div>
          </div>
        </div>
        <div className="gray-block" />
      </div>
      <div className="mobile">
        <MobileSplashPage />
      </div>
    </React.Fragment>
  );
};

export default LoginSplashPage;
