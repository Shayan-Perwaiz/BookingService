import IOredis from "ioredis";
import Redlock from "redlock";
import { serverConfig } from ".";

export const redisClient = new IOredis(serverConfig.REDIS_SERVER_URL);

export const redisRedlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 10,
  retryDelay: 200,
  retryJitter: 200,
  automaticExtensionThreshold: 500,
});
