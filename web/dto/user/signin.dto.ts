import mmphone from 'mm-mobile-tool';
import { z } from 'zod';

export const signinDtoSchema = z.object({
  name: z.string().min(1),
  phone: z
    .string({ message: 'Phone number is required!' })
    .min(11, { message: 'Phone number must be at least 11 numbers' })
    // .max(11, { message: 'Phone number must be at most 11 numbers' })
    .refine((value) => mmphone.isValid(value), {
      message: 'Please enter a valid phone number',
    }),
  password: z
    .string({ message: 'Password is required!' })
    .min(6, { message: 'Password is must be at least 6 characters' })
    .max(12, { message: 'Password is must be at most 12 characters' }),
  address: z.string().min(1, { message: 'Address is required' }),
  age: z
    .number({ message: 'Age is required' })
    .min(1, { message: 'Age is required' }),
  dateOfBirth: z.coerce.date({
    message: 'Date of Birth is required',
    invalid_type_error: 'Date of Birth is required',
  }),
});

export type SigninDto = z.infer<typeof signinDtoSchema>;
