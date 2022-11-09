"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.encryptData = exports.verifyToken = exports.generateToken = void 0;
const config_1 = __importDefault(require("config"));
const crypto_1 = __importDefault(require("crypto"));
const secret_key = crypto_1.default.randomBytes(32);
const initVector = crypto_1.default.randomBytes(16);
const algorithm = 'aes-256-cbc';
const generateToken = (id) => {
    try {
        const ttl = config_1.default.get('changePasswordTokenExpiresIn'); //time to live
        const expires = Date.now() + ttl;
        const data = `${id}:?:${expires}`; // concat id with expires
        let token = (0, exports.encryptData)(data);
        if (token) {
            return { token, success: true };
        }
        return { token: null, success: false };
    }
    catch (error) {
        console.log(error);
        return { token: null, success: false };
    }
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decryptedData = (0, exports.decryptData)(token);
        const [id, expires] = decryptedData.split(':?:');
        console.log('id(decrypted from token): (changePasstoken -> verifyToken)', id);
        const now = Date.now();
        if (now > parseInt(expires)) {
            return {
                error: 'Token expired',
                success: false,
            };
        }
        return { id, success: true };
    }
    catch (err) {
        return {
            error: 'Invalid token',
            success: false,
        };
    }
};
exports.verifyToken = verifyToken;
const encryptData = (data) => {
    let cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(secret_key), initVector);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const token = `${initVector.toString('hex')}:::${encrypted.toString('hex')}`;
    return token;
};
exports.encryptData = encryptData;
const decryptData = (data) => {
    let [init_vector, encrypted] = data.split(':::');
    let iv = Buffer.from(init_vector, 'hex');
    let encryptedData = Buffer.from(encrypted, 'hex');
    let decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(secret_key), iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
exports.decryptData = decryptData;
