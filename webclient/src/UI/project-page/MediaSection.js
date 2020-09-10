import React from "react";
import Waveform from "../components/Waveform";
import PlayPauseButton from "../components/PlayPauseButton";
import AddCommentButton from "../components/AddCommentButton";

const MediaSection = (props) => {
  const {
    isPlaying,
    audioPosition,
    handleTogglePlay,
    audioUrl,
    handlePosChange,
    onCommentButtonPress,
  } = props;
  return (
    <div className="media-section">
      <div className="media-button-section row">
        <div className="col-4" />
        <div className="col-4">
          <PlayPauseButton isPlaying={isPlaying} onPress={handleTogglePlay} />
        </div>
        <div className="col-2 d-flex flex-column justify-content-center">
          <AddCommentButton onClick={onCommentButtonPress} />
        </div>
      </div>
      <div className="sound-timeline w-100">
        <Waveform
          onFinish={handleTogglePlay}
          audioFile={audioUrl}
          isPlaying={isPlaying}
          handlePosChange={handlePosChange}
          audioPosition={audioPosition}
        />
      </div>
    </div>
  );
};

export default MediaSection;
