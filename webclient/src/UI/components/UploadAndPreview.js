import React from "react";
import _ from "lodash";
import Waveform from "./Waveform";
import Dropzone from "react-dropzone";
import { FiX } from "react-icons/fi";
import H3 from "./H3";

const AudioUpload = (props) => {
  const { onDrop } = props;

  return (
    <Dropzone
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
      accept="audio/*"
    >
      {({ getRootProps, getInputProps }) => (
        <section className="h-100 pt-2">
          <div className="btn btn-upload h-100 px-5" {...getRootProps()}>
            <input {...getInputProps()} />
            <H3>Upload</H3>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

const Preview = (props) => {
  const { audioFile, file, onRemove } = props;

  return (
    <div className="preview">
      <Waveform audioFile={audioFile} nonPlayable hideCursor />
      <div className="d-flex align-items-center justify-content-end">
        <H3 className="mt-1">{_.get(file, "name")}</H3>
        <button className="delete-icon" onClick={onRemove}>
          <FiX />
        </button>
      </div>
    </div>
  );
};

const UploadAndPreview = (props) => {
  const { audioFile, file, onDrop, onRemove } = props;
  return (
    <React.Fragment>
      {file ? (
        <Preview audioFile={audioFile} file={file} onRemove={onRemove} />
      ) : (
        <AudioUpload onDrop={onDrop} />
      )}
    </React.Fragment>
  );
};

export default UploadAndPreview;
