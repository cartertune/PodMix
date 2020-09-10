import axios from "axios";
import _ from "lodash";

export const uploadBase64ToS3 = async (signedRequest, file) => {
  try {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    const result = await axios
      .put(signedRequest, file, options)
      .then((result) => {
        console.log("Response from s3");
      })
      .catch((error) => {
        alert("ERROR " + JSON.stringify(error));
      });
    return result;
  } catch (e) {
    console.log("Error during base64 -> s3 upload: ", e);
  }
};

export const secondsToTimestamp = (seconds) => {
  const rSeconds = _.floor(seconds);
  const s = rSeconds % 60;
  const m = _.floor(rSeconds / 60);

  return `${m}:${s.toString().padStart(2, "0")} -`;
};
