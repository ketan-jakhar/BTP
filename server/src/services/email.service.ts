require('dotenv').config;
import config from 'config';
import { SESv2 } from '@aws-sdk/client-sesv2';
import { SendEmailCommandInput } from '@aws-sdk/client-sesv2/dist-types/commands';

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
