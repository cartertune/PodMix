import React from "react";
import textLogoCombo from "../../resources/TextLogoComboBig.png";
import screenshot from "../../resources/Screenshot_iphonexspacegrey_portrait.png";

import Auth from "../../auth/Auth";
import H3 from "../components/H3";
import P from "../components/P";
import explainerVid from "../../resources/smartmockups_kh3vi2w1.mp4";

const MobileSplashPage = (props) => {
  return (
    <div className="mobile-login-splash-page row">
      <div className="top-section">
        <div className="logo-combo pt-3">
          <img src={textLogoCombo} />
        </div>
        <div className="slogan py-3">
          <h2>Take your music seriously, not yourself</h2>
        </div>
        <div className="screenshot-container">
          <video src={explainerVid} loop autoPlay muted />
        </div>
        <div className="px-2 d-flex justify-content-center my-5">
          <button
            className="btn btn-primary signup-button py-3 px-5"
            onClick={() => {
              Auth.login({ callbackLink: "/" });
            }}
          >
            <H3>Sign-up for Free</H3>
          </button>
        </div>
      </div>
      <div className="detail-section col-10 py-4">
        <P className="pb-1">- Keep your project collaboration organized</P>
        <P className="pb-1">- Upload all your mixes to one location</P>
        <P className="pb-1">- Keep the feedback process quick & easy </P>
      </div>
      <div className="footer">
        <a href="/privacy" title="Privacy">
          privacy
        </a>
      </div>
    </div>
  );
};

export default MobileSplashPage;
