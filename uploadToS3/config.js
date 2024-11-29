require("dotenv").config();
const config = {
  accessKeyId: process.env.AWS_SECRET_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  defaultBucket: process.env.DEFAULT_BUCKET,
  region: process.env.DEFAULT_REGION,
  signatureVersion: process.env.SIGNATURE_VERSION,
};

module.exports = config;
