import { S3 } from 'aws-sdk';

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const upload = async (filename: string, buffer: Buffer) => {
  await s3
    .putObject({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: filename,
      Body: buffer,
    })
    .promise();

  return `${process.env.IMAGES_URL}/uploads/${filename}`;
};
