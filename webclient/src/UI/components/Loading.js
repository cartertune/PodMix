import React from "react";
import classnames from "classnames";

export const LoadingIcon = props => {
  const { large } = props;
  const className = classnames("spinner-border", {
    large
  });
  return (
    <div className={className} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingScreen = props => {
  return (
    <div className="loading-screen">
      <LoadingIcon large />
    </div>
  );
};
