import { config as DotEnv } from 'dotenv';
DotEnv(); 

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is not defined`);
  return value;
};

const NODE_ENV = process.env.NODE_ENV ?? 'development';

// DB config per environment
let DB_NAME = '';
let DB_USER = '';
let DB_PASS = '';
let DB_PORT = Number(process.env.DB_PORT ?? 5432);

switch (NODE_ENV) {
  case 'test':
    DB_NAME = requireEnv('TEST_DB_NAME');
    DB_USER = requireEnv('TEST_DB_USER');
    DB_PASS = requireEnv('TEST_DB_PASS');
    DB_PORT = Number(process.env.TEST_DB_PORT ?? 5432);
    break;
  case 'production':
    DB_NAME = requireEnv('PROD_DB_NAME');
    DB_USER = requireEnv('PROD_DB_USER');
    DB_PASS = requireEnv('PROD_DB_PASS');
    DB_PORT = Number(process.env.PROD_DB_PORT ?? 5432);
    break;
  default:
    DB_NAME = requireEnv('DEV_DB_NAME');
    DB_USER = requireEnv('DEV_DB_USER');
    DB_PASS = requireEnv('DEV_DB_PASS');
    DB_PORT = Number(process.env.DEV_DB_PORT ?? 5432);
}

export const env = {
  PORT: Number(process.env.PORT ?? 3000),

  DB_HOST: requireEnv('DB_HOST'),
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,

  JWT_SECRET: requireEnv('JWT_SECRET'),
  JWT_SECRET_REFRESH: requireEnv('JWT_SECRET_REFRESH'),

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
};