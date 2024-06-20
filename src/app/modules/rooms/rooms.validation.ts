import { z } from 'zod';

const createRoomsValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  roomNo: z
    .number()
    .int()
    .nonnegative({ message: 'Room number must be a non-negative integer' }),
  floorNo: z
    .number()
    .int()
    .nonnegative({ message: 'Floor number must be a non-negative integer' }),
  capacity: z
    .number()
    .int()
    .positive({ message: 'Capacity must be a positive integer' }),
  pricePerSlot: z
    .number()
    .positive({ message: 'Price per slot must be a positive number' }),
  amenities: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .nonempty({ message: 'At least one amenity is required' }),
});

const updateRoomsValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }).optional(),
  roomNo: z
    .number()
    .int()
    .nonnegative({ message: 'Room number must be a non-negative integer' })
    .optional(),
  floorNo: z
    .number()
    .int()
    .nonnegative({ message: 'Floor number must be a non-negative integer' })
    .optional(),
  capacity: z
    .number()
    .int()
    .positive({ message: 'Capacity must be a positive integer' })
    .optional(),
  pricePerSlot: z
    .number()
    .positive({ message: 'Price per slot must be a positive number' })
    .optional(),
  amenities: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .nonempty({ message: 'At least one amenity is required' })
    .optional(),
});
export const roomsValidation = {
  createRoomsValidationSchema,
  updateRoomsValidationSchema,
};
