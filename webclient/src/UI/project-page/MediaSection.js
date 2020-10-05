import React from "react";
import Waveform from "../components/Waveform";
import PlayPauseButton from "../components/PlayPauseButton";
import AddCommentButton from "../components/AddCommentButton";
import SkipBackButton from "../components/SkipBackButton";

const MediaSection = (props) => {
  const {
    isPlaying,
    audioPosition,
    handleTogglePlay,
    audioUrl,
    handlePosChange,
    onCommentButtonPress,
  } = props;

  if (!audioUrl) {
    return null;
  }

  return (
    <div className="media-section mt-4">
      <div className="media-button-section row">
        <div className="col-2" />
        <div className="col-2 d-flex flex-column justify-content-center">
          <SkipBackButton
            onClick={() => {
              handlePosChange(0.0);
            }}
          />
        </div>
        <div className="col-4">
          <PlayPauseButton isPlaying={isPlaying} onPress={handleTogglePlay} />
        </div>
        <div className="col-2 d-flex flex-column justify-content-center">
          <AddCommentButton onClick={onCommentButtonPress} />
        </div>
      </div>
      <div className="sound-timeline w-100">
        <Waveform
          togglePlay={handleTogglePlay}
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
