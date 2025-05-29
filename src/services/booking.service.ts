import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencykey,
} from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotecyKey } from "../utils/helpers/idempotencyKey";

export async function createBookingService(
  userId: number,
  hotelId: number,
  bookingAmount: number,
  totalGuest: number
) {
  const booking = await createBooking({
    userId,
    hotelId,
    bookingAmount: bookingAmount,
    totalGuest: totalGuest,
  });

  const idempotencyKey = generateIdempotecyKey();

  await createIdempotencyKey(idempotencyKey, booking.id);

  return { bookingId: booking.id, idempotencyKey: idempotencyKey };
}

export async function finalizeBookingService(idempotencyKey: string) {
  const idempotencyKeyData = await getIdempotencykey(idempotencyKey);
  if (!idempotencyKeyData) {
    throw new NotFoundError("Idempotency Key not found");
  }

  if (idempotencyKeyData.finalized) {
    throw new BadRequestError("Idempotency key already finalized");
  }

  const booking = await confirmBooking(idempotencyKeyData.bookingId);
  await finalizeIdempotencyKey(idempotencyKey);

  return booking;
}
