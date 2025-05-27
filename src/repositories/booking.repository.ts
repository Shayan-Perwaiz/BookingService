import { Prisma, PrismaClient } from "@prisma/client";

import prismaClient from "../prisma/client";

export async function createBooking(bookingInput: Prisma.bookingCreateInput) {
  const booking = await prismaClient.booking.create({
    data: bookingInput,
  });
  return booking;
}
