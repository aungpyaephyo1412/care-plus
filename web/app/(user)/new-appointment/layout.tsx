import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user.role === 'Admin') {
    redirect('/dashboard');
  }
  return (
    <section className='w-full flex-1 min-h-dvh flex flex-col justify-center items-center max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12'>
      {children}
    </section>
  );
};

export default UserLayout;
