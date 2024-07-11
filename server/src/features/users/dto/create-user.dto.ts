import { z } from 'zod';

export const createUserDtoSchema = z.object({
  phone: z.string().min(1),
  password: z.string().min(1),
  address: z.string().min(1),
  name: z.string().min(1),
  dateOfBirth: z.coerce.date(),
});
export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
