import { createBookingDTO } from "../dto/booking.dto";
import prisma from "../prisma/client";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencykey,
} from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotecyKey } from "../utils/helpers/idempotencyKey";

export async function createBookingService(createBookingDto: createBookingDTO) {
  const booking = await createBooking({
    userId: createBookingDto.userId,
    hotelId: createBookingDto.hotelId,
    bookingAmount: createBookingDto.bookingAmount,
    totalGuest: createBookingDto.totalGuest,
  });

  const idempotencyKey = generateIdempotecyKey();

  await createIdempotencyKey(idempotencyKey, booking.id);

  return { bookingId: booking.id, idempotencyKey: idempotencyKey };
}

export async function finalizeBookingService(idempotencyKey: string) {
  return await prisma.$transaction(async (txn) => {
    const idempotencyKeyData = await getIdempotencykey(txn, idempotencyKey);
    if (!idempotencyKeyData) {
      throw new NotFoundError("Idempotency Key not found");
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError("Idempotency key already finalized");
    }

    const booking = await confirmBooking(txn, idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(txn, idempotencyKey);

    return booking;
  });
}
