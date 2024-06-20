import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  role: z.enum(['user', 'admin'], {
    message: 'Role must be either user or admin',
  }),
});

export const UserValidation = {
  userValidationSchema,
};
