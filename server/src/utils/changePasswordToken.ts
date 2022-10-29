import config from 'config';
import crypto from 'crypto';

const secret_key: Buffer = crypto.randomBytes(32);
const initVector: Buffer = crypto.randomBytes(16);
const algorithm: string = 'aes-256-cbc';

export const generateToken = (id: string): { token: any; success: boolean } => {
  try {
    const ttl: number = config.get<number>('changePasswordTokenExpiresIn'); //time to live
    const expires: number = Date.now() + ttl;
    const data: string = `${id}:?:${expires}`; // concat id with expires
    let token: string = encryptData(data);
    if (token) {
      return { token, success: true };
    }
    return { token: null, success: false };
  } catch (error) {
    console.log(error);
    return { token: null, success: false };
  }
};

export const verifyToken = (
  token: string
): { id?: string; error?: string; success: boolean } => {
  try {
    const decryptedData = decryptData(token);
    const [id, expires] = decryptedData.split(':?:');
    console.log(
      'id(decrypted from token): (changePasstoken -> verifyToken)',
      id
    );

    const now: number = Date.now();
    if (now > parseInt(expires)) {
      return {
        error: 'Token expired',
        success: false,
      };
    }
    return { id, success: true };
  } catch (err) {
    return {
      error: 'Invalid token',
      success: false,
    };
  }
};

export const encryptData = (data: string): string => {
  let cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secret_key),
    initVector
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const token = `${initVector.toString('hex')}:::${encrypted.toString('hex')}`;
  return token;
};

export const decryptData = (data: string): string => {
  let [init_vector, encrypted] = data.split(':::');
  let iv = Buffer.from(init_vector, 'hex');
  let encryptedData = Buffer.from(encrypted, 'hex');
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secret_key),
    iv
  );
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
