import React from "react";
import classnames from "classnames";
import withMarquee from "./withMarquee";

const H1 = (props) => {
  const { marquee, elementId, onLoad } = props;
  const className = classnames("H1", props.className, { marquee });
  return (
    <h1 id={elementId || "NO_ID_SET"} className={className} onLoad={onLoad}>
      {props.children}
    </h1>
  );
};

export default withMarquee(H1);
