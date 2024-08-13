import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PWD;

export {
  dbName,
  dbUser,
  dbPwd
};
