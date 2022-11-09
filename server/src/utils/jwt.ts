import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from 'config';

// Sign Access/Refresh Token
export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  const privateKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');
  console.log('privateKey: (jwt.ts -> signJwt) ', privateKey);
  console.log('***************');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

// Verify Access/Refresh Token
export const verifyJwt = (
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): string | JwtPayload | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      'base64'
    ).toString('ascii');
    const decoded: string | JwtPayload = jwt.verify(token, publicKey);

    console.log('decoded: (jwt.ts -> verifyJwt) ', decoded);
    console.log('***************');

    return decoded;
  } catch (error) {
    console.log('error: (jwt.ts -> verifyJwt) ', error);
    return null;
  }
};
