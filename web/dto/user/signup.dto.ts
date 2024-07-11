import mmphone from 'mm-mobile-tool';
import { z } from 'zod';

export const signupDtoSchema = z.object({
  name: z.string().min(1),
  phone: z
    .string({ message: 'Phone number is required!' })
    .min(11, { message: 'Please enter a valid phone number' })
    // .max(11, { message: 'Phone number must be at most 11 numbers' })
    .refine((value) => mmphone.isValid(value), {
      message: 'Please enter a valid phone number',
    }),
  password: z
    .string({ message: 'Password is required!' })
    .min(6, { message: 'Password is must be at least 6 characters' })
    .max(12, { message: 'Password is must be at most 12 characters' }),
  address: z.string().min(1, { message: 'Address is required' }),
  dateOfBirth: z.coerce.date({
    message: 'Date of Birth is required',
    invalid_type_error: 'Date of Birth is required',
  }),
});

export type SignUpDto = z.infer<typeof signupDtoSchema>;
