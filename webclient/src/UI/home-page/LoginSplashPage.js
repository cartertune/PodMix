import React from "react";
import Auth from "../../auth/Auth";
import textLogoCombo from "../../resources/TextLogoComboBig.png";
import explainerVid from "../../resources/smartmockups_kh3vi2w1.mp4";

import MobileSplashPage from "./MobileSplashPage";
import P from "../components/P";
import H3 from "../components/H3";

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
              <div className="slogan w-75">
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
                <H3>Sign-up for Free</H3>
              </button>
            </div>
            <div className="section">
              <P>- Keep your project collaboration organized</P>
              <P>- Upload all your mixes to one location</P>
              <P>- Keep the feedback process quick & easy </P>
            </div>
          </div>
        </div>
        <div className="col-5 h-100">
          <div className="screenshot-section p-4">
            <div className="screenshot-container p-5">
              <video src={explainerVid} loop autoPlay muted />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile">
        <MobileSplashPage />
      </div>
    </React.Fragment>
  );
};

export default LoginSplashPage;
