"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookies = exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = exports.cookiesOptions = void 0;
require('dotenv').config;
const config_1 = __importDefault(require("config"));
// Cookie Options
exports.cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
if (process.env.NODE_ENV === 'production')
    exports.cookiesOptions.secure = true;
// Access Token Cookie Options
exports.accessTokenCookieOptions = Object.assign(Object.assign({}, exports.cookiesOptions), { expires: new Date(Date.now() + config_1.default.get('accessTokenExpiresIn') * 60 * 1000), maxAge: config_1.default.get('accessTokenExpiresIn') * 60 * 1000 });
// Refresh Token Cookie Options
exports.refreshTokenCookieOptions = Object.assign(Object.assign({}, exports.cookiesOptions), { expires: new Date(Date.now() + config_1.default.get('refreshTokenExpiresIn') * 60 * 1000), maxAge: config_1.default.get('refreshTokenExpiresIn') * 60 * 1000 });
const clearCookies = (res) => {
    res.cookie('access_token', '', { maxAge: -1 });
    res.cookie('refresh_token', '', { maxAge: -1 });
    res.cookie('logged_in', '', { maxAge: -1 });
    console.log('Res.cookie: (auth.controller -> logout)', res.cookie);
};
exports.clearCookies = clearCookies;
