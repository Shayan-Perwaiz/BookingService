import { v4 as uuidv4 } from "uuid";

export function generateIdempotecyKey(): string {
  const uuid = uuidv4();
  return uuid;
}
