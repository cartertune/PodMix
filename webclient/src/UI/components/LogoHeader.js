import React from "react";
import logo from "../../resources/Logo.png";
import H1 from "./H1";

const LogoHeader = (props) => {
  return (
    <div className="logo-header d-flex align-items-center">
      <div className="header-logo mr-1">
        <img src={logo} />
      </div>
      <H1>PoopMix</H1>
    </div>
  );
};

export default LogoHeader;
