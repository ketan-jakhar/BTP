"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
require('dotenv').config;
const config_1 = __importDefault(require("config"));
const client_sesv2_1 = require("@aws-sdk/client-sesv2");
// New SESv2 client
const client = new client_sesv2_1.SESv2({ region: config_1.default.get('awsRegion') });
const sendEmail = (emailTo, emailFrom, subject, message) => {
    const params = {
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
            if (err)
                console.log(err); // an error occurred
            else
                console.log('email data:- ', data); // successful response
        });
    }
    catch (error) {
        console.log('error: (emailService.ts -> sendEmail) ', error);
    }
};
exports.sendEmail = sendEmail;
