require("wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js");
import React from "react";
import Wavesurfer from "react-wavesurfer";
import { secondsToTimestamp } from "../../util/util";
import LoadingBar from "./LoadingBar";

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
    handlePosChange && handlePosChange(e.originalArgs[0]);
  }

  renderLoadingBar() {
    const {loadingPerc } = this.state

    if (loadingPerc >= 100) {
      return null
    }
    return (
    <div className="pt-5 position-absolute w-100">
      <LoadingBar percentage={loadingPerc}/>
    </div>
    )
  }

  render() {
    const {
      audioPosition,
      audioFile,
      isPlaying,
      togglePlay,
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
          onFinish={(e) => togglePlay()}
          playing={isPlaying}
          onLoading={(e) => this.handleOnLoad(e)}
          onReady={(e) => {
            this.setDuration(e);
          }}
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
