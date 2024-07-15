import { userLoginDtoSchema } from '@/dto/user/user.dto';
import safeFetch from '@/lib/safeFetch';
import type { NextAuthConfig, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextRequest } from 'next/server';

export function handleRedirection(auth: Session | null, request: NextRequest) {
  const { nextUrl } = request;
  const isLoggedIn = auth?.user;

  if (nextUrl.pathname.startsWith('/images')) {
    return true;
  }
  if (isLoggedIn) {
    const isRedirectPath = ['/login', '/register'].includes(nextUrl.pathname);
    if (isRedirectPath) {
      return Response.redirect(new URL('/', nextUrl));
    }
    return true;
  } else {
    return ['/forgot-password', '/reset-password', '/register'].some((path) =>
      nextUrl.pathname.startsWith(path)
    );
  }
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log(credentials);
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
    authorized({ auth, request }) {
      return handleRedirection(auth, request);
    },
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
} satisfies NextAuthConfig;
