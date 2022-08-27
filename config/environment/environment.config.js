/**
 * Enviornment Variables
 */
const envConfig = {
  secretKey: process.env.SECRET_KEY,
  serverPort: process.env.SERVER_PORT,
  nodeEnv: process.env.NODE_ENV,
  userDbHost: process.env.USER_DB_HOST,
  userDbPort: process.env.USER_DB_PORT,
  userDbName: process.env.USER_DB_DATABSE,
  showLog: process.env.SHOW_LOG,
  timeZone: process.env.TIMEZONE,
  saltRounds: process.env.SALT_ROUNDS,
};

module.exports = envConfig;
