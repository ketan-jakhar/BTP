"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Upload = exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const client_sesv2_1 = require("@aws-sdk/client-sesv2");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
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
const s3Upload = (file, uparamcategory, uparamid) => __awaiter(void 0, void 0, void 0, function* () {
    aws_sdk_1.default.config.getCredentials((err) => {
        if (err) {
            throw err;
        }
        else {
            console.log('-> AWS Credentials loaded successfully');
            console.log('-> All Configs: ', aws_sdk_1.default.config.credentials);
        }
    });
    const s3 = new aws_sdk_1.default.S3();
    const generateUploadParams = (category, id) => {
        const uploadParams = {
            Bucket: config_1.default.get('awsBucketName'),
            Key: `images/${category}/${id}/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
        };
        return uploadParams;
    };
    const genParams = generateUploadParams(uparamcategory, uparamid);
    console.log('-> Upload Parameters: ', genParams.Key);
    console.log('-> Upload parameters are set');
    return new Promise(function (resolve, reject) {
        s3.upload(genParams, function (err, data) {
            if (err) {
                console.log('Error in s3.upload -> misc.service ', err);
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
});
exports.s3Upload = s3Upload;
