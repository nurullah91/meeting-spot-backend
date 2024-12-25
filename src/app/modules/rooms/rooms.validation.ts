import { z } from 'zod';

const createRoomsValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  img: z.string().nonempty({ message: 'Img is required' }),
  details: z.string().nonempty({ message: 'Details is required' }),
  description: z.string().nonempty({ message: 'Details is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  detailImages: z.array(
    z.string().nonempty({ message: 'Detail Images cannot be empty' }),
  ),
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
  discount: z
    .number()
    .positive({ message: 'Discount must be a positive number' })
    .optional(),
  amenities: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .nonempty({ message: 'At least one amenity is required' }),
});

const updateRoomsValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }).optional(),
  img: z.string().nonempty({ message: 'Img is required' }).optional(),
  details: z
    .string()
    .nonempty({ message: 'Details cannot be empty' })
    .optional(),
  description: z
    .string()
    .nonempty({ message: 'Details cannot be empty' })
    .optional(),
  category: z
    .string()
    .nonempty({ message: 'category cannot be empty' })
    .optional(),
  detailImages: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .optional(),
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
  discount: z
    .number()
    .positive({ message: 'Discount must be a positive number' })
    .optional(),
  isFeatured: z.boolean({ message: 'isFeatured must be a boolean' }).optional(),
  amenities: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .nonempty({ message: 'At least one amenity is required' })
    .optional(),
});
export const roomsValidation = {
  createRoomsValidationSchema,
  updateRoomsValidationSchema,
};
