import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  profilePhoto: z
    .string()
    .nonempty({ message: 'Profile Photo cannot be empty' })
    .optional(),
  coverPhoto: z
    .string()
    .nonempty({ message: 'Cover photo cannot be empty' })
    .optional(),
});

const updateUserValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name cannot be empty' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional(),
  phone: z
    .string()
    .nonempty({ message: 'Phone number is required' })
    .optional(),
  address: z.string().nonempty({ message: 'Address is required' }).optional(),
  profilePhoto: z
    .string()
    .nonempty({ message: 'Profile Photo cannot be empty' })
    .optional(),
  coverPhoto: z
    .string()
    .nonempty({ message: 'Cover photo cannot be empty' })
    .optional(),
  role: z
    .enum(['user', 'admin'], {
      message: 'Role must be either user or admin',
    })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
