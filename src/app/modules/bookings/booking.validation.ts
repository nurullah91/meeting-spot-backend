import { z } from 'zod';

const createBooking = z.object({
  date: z.string().nonempty(),
  slots: z.array(z.string().nonempty()).nonempty(),
  room: z.string().nonempty(),
  user: z.string().nonempty(),
});

const updateBooking = z.object({
  date: z.string().optional(),
  slots: z.array(z.string()).optional(),
  room: z.string().optional(),
  user: z.string().optional(),
  totalAmount: z.number().optional(),
  isConfirmed: z.enum(['unconfirmed', 'confirmed']).optional(),
  isDeleted: z.boolean().optional(),
});

export const BookingValidation = {
  createBooking,
  updateBooking,
};
