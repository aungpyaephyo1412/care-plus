import { z } from 'zod';

export const createUserDtoSchema = z.object({
  phone: z.string(),
  password: z.string(),
  address: z.string(),
  name: z.string(),
  age: z.number(),
  dateOfBirth: z.coerce.date(),
});
export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
