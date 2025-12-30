import { config as DotEnv } from "dotenv";
DotEnv(); 

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is not defined`);
  return value;
};

export const env: {
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_NAME_PROD: string;
  DB_NAME_TEST: string;
  DB_USER: string;
  DB_PASS: string;

  JWT_SECRET: string;
  JWT_SECRET_REFRESH: string;

  BCRYPT_SALT_ROUNDS: number;
} = {
  PORT: Number(process.env.PORT ?? 3000),

  DB_HOST: requireEnv("DB_HOST"),
  DB_PORT: Number(process.env.DB_PORT ?? 5432),
  DB_NAME: requireEnv("DB_NAME"),
  DB_NAME_PROD: requireEnv("DB_NAME_PROD"),
  DB_NAME_TEST: requireEnv("DB_NAME_TEST"),
  DB_USER: requireEnv("DB_USER"),
  DB_PASS: requireEnv("DB_PASS"),

  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_SECRET_REFRESH: requireEnv("JWT_SECRET_REFRESH"),

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
};