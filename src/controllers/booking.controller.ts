import { NextFunction, Request, Response } from "express";
import {
  createBookingService,
  finalizeBookingService,
} from "../services/booking.service";

export const createBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const booking = await createBookingService(req.body);
  res.status(201).json({
    bookingId: booking.bookingId,
    idempotencyKey: booking.idempotencyKey,
  });
};

export const finalizeBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const booking = await finalizeBookingService(req.params.idempotencyKey);
  res.status(200).json(booking);
};
