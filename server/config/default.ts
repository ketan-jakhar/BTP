export default {
  origin: 'http://localhost:4000',
  accessTokenExpiresIn: 60,
  refreshTokenExpiresIn: 60 * 24, // 1 day
  changePasswordTokenExpiresIn: 1000 * 60 * 60 * 24 * 3, // 3 days
};
