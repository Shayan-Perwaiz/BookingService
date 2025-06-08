import express from "express";
import {
  createBookingController,
  finalizeBookingController,
} from "../../controllers/booking.controller";
import { validateRequestBody } from "../../validators";
import { createBookingSchema } from "../../validators/booking.validator";

export const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  validateRequestBody(createBookingSchema),
  createBookingController
);
bookingRouter.post("/confirm/:idempotencyKey", finalizeBookingController);
