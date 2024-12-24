import { z } from 'zod';

const createReviewValidationSchema = z.object({
  room: z.string().nonempty({ message: 'Room ID is required' }),
  user: z.string().nonempty({ message: 'UserId ID is required' }),
  review: z.string().nonempty({ message: 'Review is required' }),
});

const updateReviewValidationSchema = z.object({
  review: z.string().nonempty({ message: 'Review is required' }).optional(),
});
export const reviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
