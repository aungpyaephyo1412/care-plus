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
export const userRegisterDtoSchema = z.object({
  message: z.string(),
  data: userDtoSchema,
});
export const userLoginDtoSchema = z.object({
  data: userDtoSchema,
  jwt: z.string().min(1),
});
export type User = z.infer<typeof userDtoSchema>;
