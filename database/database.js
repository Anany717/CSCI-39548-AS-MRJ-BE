import { Sequelize } from 'sequelize';
import {dbName, dbUser, dbPwd} from './dbCreds.js';

console.log('Opening database connection');

export const db = new Sequelize(dbName, dbUser, dbPwd, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});