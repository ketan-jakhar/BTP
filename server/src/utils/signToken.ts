require('dotenv').config();
import config from 'config';
import { signJwt } from '.';
import { User } from '../types/entities';

// Sign access and Refresh Tokens
export const signTokens = async (user: User) => {
  console.log('user: (signToken.ts -> signTokens) ', user);
  console.log('***************');

  const payload: object = {
    id: user.id,
    role: user.role,
  };
  console.log('payload: (signToken.ts -> signTokens) ', payload);
  console.log('***************');

  // 2. Create Access and Refresh tokens
  const access_token = await signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });
  console.log('access_token: (signToken.ts -> signTokens) ', access_token);
  console.log('***************');

  const refresh_token = await signJwt(payload, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });
  console.log('refresh_token: (signToken.ts -> signTokens) ', refresh_token);
  console.log('***************');

  return { access_token, refresh_token };
};
