import { z } from 'zod';

export const userDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  dateOfBirth: z.coerce.date(),
  role: z.enum(['User', 'Admin', 'SuperAdmin']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type UserDto = z.infer<typeof userDtoSchema>;
