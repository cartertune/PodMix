require("wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js");
import React from "react";
import Wavesurfer from "react-wavesurfer";
import { secondsToTimestamp } from "../../util/util";

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

  setDuration(e) {
    const { audioFile } = this.props;
    const duration = document.getElementById(audioFile).duration;
    this.setState({ duration });
  }

  handleOnLoad(e) {
    const perc = e.originalArgs[0];
    this.setState({ loadingPerc: perc });
  }

  handlePosChange(e) {
    const { handlePosChange } = this.props;
    const { duration } = this.state;

    if (!duration) {
      this.setDuration();
    }
    handlePosChange(e.originalArgs[0]);
  }

  renderLoadingBar() {
    const { loadingPerc, duration } = this.state;

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
    const { duration } = this.state;
    return (
      <div className="waveform">
        <audio src={audioFile} id={audioFile} />
        {this.renderLoadingBar()}
        <Wavesurfer
          id="#wave"
          audioFile={audioFile}
          pos={audioPosition}
          onPosChange={(e) => this.handlePosChange(e)}
          onFinish={(e) => onFinish()}
          playing={isPlaying}
          onLoading={(e) => this.handleOnLoad(e)}
          onReady={(e) => this.setDuration(e)}
          options={{
            waveColor: purple,
            progressColor: hideCursor ? purple : progressPurple,
            cursorColor: hideCursor ? "transparent" : black,
          }}
        />
        {hideCursor || isNaN(duration) ? null : (
          <React.Fragment>
            <div className="timestamp left">
              <p>{secondsToTimestamp(audioPosition)}</p>
            </div>
            <div className="timestamp right">
              <p>{secondsToTimestamp(duration)}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Waveform;
