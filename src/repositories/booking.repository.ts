import { idempotencyKey, Prisma } from "@prisma/client";

import prisma from "../prisma/client";
import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createBooking(bookingInput: Prisma.bookingCreateInput) {
  const booking = await prisma.booking.create({
    data: bookingInput,
  });
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId?: number) {
  const idempotencyKey = await prisma.idempotencyKey.create({
    data: {
      idemKey: key,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });

  return idempotencyKey;
}

export async function getIdempotencykey(
  txn: Prisma.TransactionClient,
  key: string
) {
  if (!isValidUUID(key)) {
    throw new BadRequestError("Not a Valid Idempotency Key");
  }
  const idempotencyKey: Array<idempotencyKey> = await txn.$queryRaw(
    Prisma.raw(
      `SELECT * FROM idempotencyKey WHERE idemKey = '${key}' FOR UPDATE;`
    )
  );
  if (!idempotencyKey || idempotencyKey.length === 0) {
    throw new NotFoundError("Idempotency Key not found");
  }
  return idempotencyKey[0];
}

export async function getBookingById(bookingId: number) {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  return booking;
}

export async function confirmBooking(
  txn: Prisma.TransactionClient,
  bookingId: number
) {
  const booking = await txn.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CONFIRMED",
    },
  });
  return booking;
}

export async function cancelBooking(bookingId: number) {
  const booking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  return booking;
}

export async function finalizeIdempotencyKey(
  txn: Prisma.TransactionClient,
  key: string
) {
  const booking = await txn.idempotencyKey.update({
    where: {
      idemKey: key,
    },
    data: {
      finalized: true,
    },
  });
  return booking;
}
