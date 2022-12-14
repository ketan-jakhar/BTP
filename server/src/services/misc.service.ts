import dotenv from 'dotenv';
import config from 'config';
import { SESv2 } from '@aws-sdk/client-sesv2';
import { SendEmailCommandInput } from '@aws-sdk/client-sesv2/dist-types/commands';
import AWS, { S3 } from 'aws-sdk';

dotenv.config();

// New SESv2 client
const client: SESv2 = new SESv2({ region: config.get<string>('awsRegion') });

export const sendEmail = (
  emailTo: string,
  emailFrom: string,
  subject: string,
  message: string
) => {
  const params: SendEmailCommandInput = {
    Content: {
      Simple: {
        Body: {
          Text: {
            Data: message,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    },
    Destination: {
      ToAddresses: [emailTo],
    },
    FromEmailAddress: emailFrom,
    ReplyToAddresses: [emailFrom],
  };

  try {
    client.sendEmail(params, (err, data) => {
      if (err) console.log(err); // an error occurred
      else console.log('email data:- ', data); // successful response
    });
  } catch (error) {
    console.log('error: (emailService.ts -> sendEmail) ', error);
  }
};

export const s3Upload = async (
  file: any,
  uparamcategory: string,
  uparamid: string
): Promise<S3.ManagedUpload.SendData> => {
  AWS.config.getCredentials((err: Error | null) => {
    if (err) {
      throw err;
    } else {
      console.log('-> AWS Credentials loaded successfully');
      console.log('-> All Configs: ', AWS.config.credentials);
    }
  });

  const s3 = new AWS.S3();

  const generateUploadParams = (category: string, id: string) => {
    const uploadParams = {
      Bucket: config.get<string>('awsBucketName'),
      Key: `images/${category}/${id}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };
    return uploadParams;
  };

  const genParams = generateUploadParams(uparamcategory, uparamid);

  console.log('-> Upload Parameters: ', genParams.Key);

  console.log('-> Upload parameters are set');

  return new Promise(function (resolve, reject) {
    s3.upload(genParams, function (err: Error, data: any) {
      if (err) {
        console.log('Error in s3.upload -> misc.service ', err);

        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
