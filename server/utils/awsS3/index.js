import AWS from "aws-sdk";
    
const uploadToS3 = async (key, image) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const type = image.split(';')[0].split('/')[1];

  const params ={
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  };

  const result = await s3.upload(params).promise();
  return result;
};

export default uploadToS3;