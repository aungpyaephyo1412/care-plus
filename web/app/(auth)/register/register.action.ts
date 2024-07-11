'use server';

import { login } from '@/app/(auth)/login/login.action';
import { signupDtoSchema } from '@/dto/user/signup.dto';
import { userRegisterDtoSchema } from '@/dto/user/user.dto';
import { actionClient } from '@/lib/safe-action';
import safeFetch from '@/lib/safeFetch';

const register = actionClient
  .schema(signupDtoSchema)
  .action(async ({ parsedInput }) => {
    const { error } = await safeFetch(userRegisterDtoSchema, '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(parsedInput),
    });
    if (!error) {
      await login(parsedInput);
    }
    return error;
  });

export { register };
