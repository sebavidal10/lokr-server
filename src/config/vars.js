// import .env variables
const dotenv = require('dotenv');
dotenv.config();

const db_username = process.env.MONGO_USER || 'admin';
const db_password = process.env.MONGO_PASS || 'password';
const db_name = process.env.MONGO_DBNAME || 'shorter_db';
const mongo_server = process.env.MONGO_SERVER || 'localhost';
const mongo_port = process.env.MONGO_PORT || 27017;

module.exports = {
  env: process.env.NODE_ENV,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? `mongodb://${db_username}:${db_password}@${mongo_server}:${mongo_port}/${db_name}_test?authSource=admin`
        : `mongodb://${db_username}:${db_password}@${mongo_server}:${mongo_port}/${db_name}?authSource=admin`,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
};
