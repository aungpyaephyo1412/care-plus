import { z } from 'zod';

export const updateUserDtoSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  dateOfBirth: z.coerce.date(),
});

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
