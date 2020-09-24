import React from "react";
import logo from "../../resources/Logo.png";

const LogoHeader = (props) => {
  return (
    <div className="logo-header d-flex align-items-center">
      <div className="header-logo mr-1">
        <img src={logo} />
      </div>
      <h1>PodMix</h1>
    </div>
  );
};

export default LogoHeader;
