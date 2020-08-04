import React from "react";
import HeaderContainer from "../header/HeaderContainer";
import Main from "./Main";

const Skeleton = props => {
  return (
    <div className="skeleton">
      <HeaderContainer />
      <Main />
    </div>
  );
};

export default Skeleton;
