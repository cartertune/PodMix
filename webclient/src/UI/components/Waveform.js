require("wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js");
import React from "react";
import Wavesurfer from "react-wavesurfer";

const purple = "#5032e8";
const progressPurple = "rgba(0, 0, 0, 0.5)";
const black = "#181a1e";

class Waveform extends React.Component {
  constructor(props) {
    super(props);

    this.handlePosChange = this.handlePosChange.bind(this);
  }

  handlePosChange(e) {
    const { handlePosChange } = this.props;
    handlePosChange(e.originalArgs[0]);
  }
  render() {
    const {
      audioPosition,
      audioFile,
      isPlaying,
      onFinish,
      hideCursor,
    } = this.props;
    return (
      <div className="waveform">
        <audio src={audioFile} />
        <Wavesurfer
          id="#wave"
          audioFile={audioFile}
          pos={audioPosition}
          onPosChange={(e) => this.handlePosChange(e)}
          onFinish={(e) => onFinish()}
          playing={isPlaying}
          options={{
            waveColor: purple,
            progressColor: hideCursor ? purple : progressPurple,
            cursorColor: hideCursor ? "transparent" : black,
          }}
        />
      </div>
    );
  }
}

export default Waveform;
