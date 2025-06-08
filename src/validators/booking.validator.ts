import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.number({ message: "User ID must be present" }),
  hotelId: z.number({ message: "User ID must be present" }),
  bookingAmount: z
    .number({ message: "Booking amount must be present" })
    .min(1, { message: "Booking amount must be greater than 1" }),
  totalGuest: z
    .number({ message: "Booking amount must be present" })
    .min(1, { message: "Total guests must be at least 1" }),
});
