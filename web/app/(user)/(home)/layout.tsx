import Image from 'next/image';
import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='flex-1 w-full min-h-dvh grid lg:grid-cols-2'>
      <div className='w-full px-4 lg:px-8 py-8 flex flex-col h-full bg-register bg-no-repeat bg-cover lg:bg-none'>
        {children}
      </div>
      <div className='hidden lg:block size-full relative'>
        <Image
          src={'/images/auth.png'}
          alt={'Auth Layout Image'}
          fill
          priority
          className='object-cover'
          sizes={'500'}
        />
      </div>
    </section>
  );
};

export default HomeLayout;
