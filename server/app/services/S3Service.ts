import AWS from "aws-sdk";
import _ from "lodash";

class S3Service {
  constructor() {}

  signURL = async (fileType: string) => {
    const region = process.env.PM_AWS_REGION;
    const bucket = process.env.S3_BUCKET_NAME;

    const s3 = new AWS.S3({
      accessKeyId: process.env.PM_AWS_KEY_ID,
      secretAccessKey: process.env.PM_AWS_SECRET_KEY,
      signatureVersion: "v4",
      region,
    });

    // Key values added to prevent image overwrite.
    const uuidv1 = require("uuid/v1");
    const uniqueValue = uuidv1();

    const params = {
      Bucket: bucket,
      Key: `${uniqueValue}`,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read",
    };

    const signedRequest = await s3.getSignedUrl("putObject", params);
    const url = `https://s3.${region}.amazonaws.com/${bucket}/${uniqueValue}`;
    console.log(url);
    return {
      signedRequest,
      url,
    };
  };
}

export default new S3Service();
