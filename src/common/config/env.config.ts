export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: +process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  dbPort: +process.env.DB_PORT,
  dbName: +process.env.DB_NAME,
  dbHost: +process.env.DB_HOST,
  dbUsername: +process.env.DB_USERNAME,
  dbPassword: +process.env.DB_PASSWORD,
});
