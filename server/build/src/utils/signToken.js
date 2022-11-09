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
exports.signTokens = void 0;
require('dotenv').config();
const config_1 = __importDefault(require("config"));
const _1 = require(".");
// Sign access and Refresh Tokens
const signTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('user: (signToken.ts -> signTokens) ', user);
    console.log('***************');
    const payload = {
        id: user.id,
        role: user.role,
    };
    console.log('payload: (signToken.ts -> signTokens) ', payload);
    console.log('***************');
    // 2. Create Access and Refresh tokens
    const access_token = yield (0, _1.signJwt)(payload, 'accessTokenPrivateKey', {
        expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
    });
    console.log('access_token: (signToken.ts -> signTokens) ', access_token);
    console.log('***************');
    const refresh_token = yield (0, _1.signJwt)(payload, 'refreshTokenPrivateKey', {
        expiresIn: `${config_1.default.get('refreshTokenExpiresIn')}m`,
    });
    console.log('refresh_token: (signToken.ts -> signTokens) ', refresh_token);
    console.log('***************');
    return { access_token, refresh_token };
});
exports.signTokens = signTokens;
