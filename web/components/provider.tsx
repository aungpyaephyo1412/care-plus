import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const Provider = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <ThemeProvider
      disableTransitionOnChange
      storageKey='theme'
      attribute='class'
      defaultTheme='system'
      enableSystem
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
