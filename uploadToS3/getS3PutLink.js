const aws = require("aws-sdk");
const config = require("./config");

aws.config.update(config);

const getS3PutLink = (
  uniqueS3Key,
  mimeType,
  bucket = config.defaultBucket,
  region = config.region
) => {
    console.log(config);
  return new Promise(async (resolve, reject) => {
    const options = {
      bucket,
      region,
      signatureVersion: config.signatureVersion,
      segnatureExpires: 60,
      ACL: "private",
      uniqueProfix: true,
    };
    const s3 = new aws.S3(options);
    const params = {
      Bucket: bucket,
      Key: uniqueS3Key,
      Expires: 60,
      ContentType: mimeType,
      ACL: "private",
    };
    s3.getSignedUrl("putObject", params, (err, signedLink) => {
      if (err) throw err;
      console.log("signedLink", signedLink);
      resolve(signedLink);
    });
  });
};

module.exports = getS3PutLink;
