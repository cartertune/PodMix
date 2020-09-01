import React from "react";
import Waveform from "./Waveform";
import Dropzone from "react-dropzone";
import PlayPauseButton from "./PlayPauseButton";
import { FiX } from "react-icons/fi";

const AudioUpload = (props) => {
  const { onDrop } = props;

  return (
    <Dropzone
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
      accept="audio/*"
    >
      {({ getRootProps, getInputProps }) => (
        <section className="h-100">
          <div className="btn btn-upload h-100 px-4" {...getRootProps()}>
            <input {...getInputProps()} />
            <h3>Upload</h3>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

const Preview = (props) => {
  const { audioFile, fileName, onRemove } = props;

  return (
    <div className="preview">
      <Waveform audioFile={audioFile} nonPlayable />
      <div className="d-flex align-items-center justify-content-end">
        <h3 className="mt-1">{fileName}</h3>
        <button className="delete-icon" onClick={onRemove}>
          <FiX />
        </button>
      </div>
    </div>
  );
};

const UploadAndPreview = (props) => {
  const { audioFile, fileName, onDrop, onRemove } = props;
  return (
    <React.Fragment>
      {audioFile ? (
        <Preview
          audioFile={audioFile}
          fileName={fileName}
          onRemove={onRemove}
        />
      ) : (
        <AudioUpload onDrop={onDrop} />
      )}
    </React.Fragment>
  );
};

export default UploadAndPreview;
