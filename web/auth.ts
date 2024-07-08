import { authConfig } from '@/auth.config';
import { userLoginDtoSchema } from '@/dto/user/user.dto';
import safeFetch from '@/lib/safeFetch';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { error, data } = await safeFetch(
          userLoginDtoSchema,
          '/auth/login',
          {
            cache: 'no-store',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(credentials),
          }
        );
        if (error) return null;
        return {
          id: data.data.id,
          name: data.data.name,
          role: data.data.role,
          phone: data.data.phone,
          age: data.data.age,
          createdAt: data.data.createdAt,
          updatedAt: data.data.updatedAt,
          dateOfBirth: data.data.dateOfBirth,
          address: data.data.address,
          jwt: data.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }
      if (trigger === 'signIn') {
        if (user)
          return {
            ...token,
            id: user.id,
            name: user.name,
            role: user.role,
            phone: user.phone,
            age: user.age,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            jwt: user.jwt,
          };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            id: token.id,
            name: token.name,
            role: token.role,
            phone: token.phone,
            age: token.age,
            createdAt: token.createdAt,
            updatedAt: token.updatedAt,
            dateOfBirth: token.dateOfBirth,
            address: token.address,
            jwt: token.jwt,
          },
        };
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
});
