require("wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js");
import React from "react";
import Wavesurfer from "react-wavesurfer";

const green = "#329d92";
const purple = "#5032e8";
const black = "#181a1e";

class Waveform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing,
    });
  }

  handlePosChange(e) {
    const { nonPlayable } = this.props;
    if (nonPlayable) {
      return null;
    }

    this.setState({
      pos: e.originalArgs[0],
    });
  }
  render() {
    const { audioFile, nonPlayable } = this.props;
    const { pos, playing } = this.state;
    return (
      <div className="waveform">
        <audio src={audioFile} />
        <Wavesurfer
          id="#wave"
          audioFile={audioFile}
          pos={pos}
          onPosChange={this.handlePosChange}
          playing={playing}
          options={{
            waveColor: nonPlayable ? purple : green,
            progressColor: purple,
            cursorColor: nonPlayable ? "transparent" : black,
          }}
        />
      </div>
    );
  }
}

export default Waveform;
