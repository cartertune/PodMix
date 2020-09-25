import React from "react";
import { FiPause, FiPlay } from "react-icons/fi";

const PlayPauseButton = (props) => {
  const { isPlaying, onPress } = props;
  return (
    <button className="play-pause-button" onClick={onPress}>
      {isPlaying ? <FiPause className="pause" /> : <FiPlay className="play" />}
    </button>
  );
};

export default PlayPauseButton;
