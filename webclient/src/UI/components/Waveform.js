require("wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js");
import React from "react";
import Wavesurfer from "react-wavesurfer";

const purple = "#5032e8";
const progressPurple = "rgba(0, 0, 0, 0.5)";
const black = "#181a1e";

class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPerc: 0,
    };
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  handleOnLoad(e) {
    const perc = e.originalArgs[0];
    this.setState({ loadingPerc: perc });
  }

  handlePosChange(e) {
    const { handlePosChange } = this.props;
    handlePosChange(e.originalArgs[0]);
  }
  renderLoadingBar() {
    const { loadingPerc } = this.state;

    if (loadingPerc < 100) {
      return (
        <div className="pt-5 position-absolute w-100">
          <div className="progress" style={{ backgroundColor: black }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={`${loadingPerc}`}
              style={{ width: `${loadingPerc}%`, backgroundColor: purple }}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      );
    }
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
        {this.renderLoadingBar()}
        <Wavesurfer
          id="#wave"
          audioFile={audioFile}
          pos={audioPosition}
          onPosChange={(e) => this.handlePosChange(e)}
          onFinish={(e) => onFinish()}
          playing={isPlaying}
          onLoading={(e) => this.handleOnLoad(e)}
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
