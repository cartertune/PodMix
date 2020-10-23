import axios from "axios";
import _ from "lodash";

export const uploadBase64ToS3 = async (signedRequest, file, onProgress) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: evt => onProgress(evt.loaded / evt.total) 
    };
    const result = await axios
      .put(signedRequest, file, options)
      .then((result) => {
        console.log("Response from s3");
      })
      // .catch((error) => {
      //   alert("ERROR " + JSON.stringify(error));
      // });
    return result;
 
};

export const secondsToTimestamp = (seconds) => {
  const rSeconds = _.floor(seconds);
  const s = rSeconds % 60;
  const m = _.floor(rSeconds / 60);

  return `${m}:${s.toString().padStart(2, "0")}`;
};

// export const readFileFromLocalUrl = (localUrl, callback) => {
//   const reader = new FileReader()

//   reader.onloadend = () => callback(reader.result)
//   reader.readAsDataURL(localUrl)
// }
