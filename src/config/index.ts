// This file contains all the basic configuration logic for the app server to work
import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  REDIS_SERVER_URL: string;
  TTL_LOCK: number;
};

function loadEnv() {
  dotenv.config();
  console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
  REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "redis://localhost:6379",
  TTL_LOCK: Number(process.env.TTL) || 5000,
};
