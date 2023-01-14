require('dotenv').config();
import config from 'config';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(config.get<string>('sendgridApiKey'));

interface IMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
}

export const sendEmail = async (
  to: string,
  from: string,
  subject: string,
  text: string
): Promise<[sgMail.ClientResponse, {}]> => {
  const msg: IMessage = {
    to,
    from,
    subject,
    text,
  };

  try {
    console.log(`Sending mail to ${to} from ${from}`);
    return await sgMail.send(msg);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error)
      throw new Error(
        `Error  while sending email to ${to}: ${{
          name: error.name,
          message: error.message,
        }}`
      );
    else throw new Error('Something unexpected happened.');
  }
};
