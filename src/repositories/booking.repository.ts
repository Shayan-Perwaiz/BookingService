import { Prisma } from "@prisma/client";

import prismaClient from "../prisma/client";

export async function createBooking(bookingInput: Prisma.bookingCreateInput) {
  const booking = await prismaClient.booking.create({
    data: bookingInput,
  });
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId?: number) {
  const idempotencyKey = await prismaClient.idempotencyKey.create({
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

export async function getIdempotencykey(key: string) {
  const idempotencyKey = await prismaClient.idempotencyKey.findUnique({
    where: {
      idemKey: key,
    },
  });
  return idempotencyKey;
}

export async function getBookingById(bookingId: number) {
  const booking = await prismaClient.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  return booking;
}

export async function changeBookingStatus(
  bookingId: number,
  status: Prisma.EnumbookingStatusFieldUpdateOperationsInput
) {
  const booking = await prismaClient.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: status,
    },
  });
  return booking;
}
