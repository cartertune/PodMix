import React from "react";
import classnames from "classnames";
import { FiPause, FiPlay } from "react-icons/fi";

const PlayPauseButton = (props) => {
  const { isPlaying, small } = props;
  const className = classnames("play-pause-button", {
    small,
  });

  return (
    <button className={className}>
      {isPlaying ? <FiPause /> : <FiPlay />}
    </button>
  );
};

export default PlayPauseButton;
