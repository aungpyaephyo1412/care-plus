import mmphone from 'mm-mobile-tool';
import { z } from 'zod';

export const signinDtoSchema = z.object({
  phone: z
    .string({ message: 'Phone number is required!' })
    .min(10, { message: 'Phone number must be at least 10 numbers' })
    .max(10, { message: 'Phone number must be at most 10 numbers' })
    .refine((value) => mmphone.isValid(`0${value}`), {
      message: 'Please enter a valid phone number',
      path: ['phone'],
    }),
  password: z
    .string({ message: 'Password is required!' })
    .min(6, { message: 'Password is must be at least 6 characters' })
    .max(12, { message: 'Password is must be at most 12 characters' }),
});

export type SigninDto = z.infer<typeof signinDtoSchema>;
