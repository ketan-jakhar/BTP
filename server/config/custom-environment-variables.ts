export default {
  port: 'PORT',
  postgresConfig: {
    host: 'POSTGRES_HOST',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },
  accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',
  awsAccessKeyID: 'AWS_ACCESS_KEY_ID',
  awsSecretAccessKey: 'AWS_SECRET_ACCESS_KEY',
  awsBucketName: 'AWS_BUCKET_NAME',
  awsRegion: 'AWS_REGION',
};
