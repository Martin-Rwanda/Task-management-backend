import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

interface SequelizeConfig {
  development: DbConfig;
  test: DbConfig;
  production: DbConfig;
}

const config: SequelizeConfig = {
  development: {
    username: process.env.DEV_DB_USER as string,
    password: process.env.DEV_DB_PASS as string,
    database: process.env.DEV_DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USER as string,
    password: process.env.TEST_DB_PASS as string,
    database: process.env.TEST_DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USER as string,
    password: process.env.PROD_DB_PASS as string,
    database: process.env.PROD_DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: 'postgres',
  },
};

export default config;
