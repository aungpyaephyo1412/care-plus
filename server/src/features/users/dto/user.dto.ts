import { z } from 'zod';

export const userDtoSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  password: z.string().min(1),
  address: z.string().min(1),
  dateOfBirth: z.coerce.date(),
  age: z.number().min(1),
  role: z.enum(['User', 'Admin', 'SuperAdmin']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type UserDto = z.infer<typeof userDtoSchema>;
