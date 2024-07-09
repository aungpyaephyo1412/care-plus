'use server';

import { signinDtoSchema } from '@/dto/user/signin.dto';
import { userRegisterDtoSchema } from '@/dto/user/user.dto';
import { actionClient } from '@/lib/safe-action';
import safeFetch from '@/lib/safeFetch';

const register = actionClient
  .schema(signinDtoSchema)
  .action(async ({ parsedInput }) => {
    const { error, data } = await safeFetch(
      userRegisterDtoSchema,
      '/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(parsedInput),
      }
    );
    console.log(error, data);
    return { error, data };
  });

export { register };
