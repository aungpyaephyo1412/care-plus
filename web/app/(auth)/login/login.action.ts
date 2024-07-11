'use server';

import { signIn } from '@/auth';
import { signinDtoSchema } from '@/dto/user/signin.dto';
import { actionClient } from '@/lib/safe-action';

const login = actionClient
  .schema(signinDtoSchema)
  .action(async ({ parsedInput }) => {
    await signIn('credentials', parsedInput);
  });

export { login };
