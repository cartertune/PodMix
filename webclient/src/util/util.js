import axios from "axios";

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
