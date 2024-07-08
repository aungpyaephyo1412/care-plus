import { Button } from '@/components/ui/button';
import ValidationInput from '@/components/validation-input';
import { Lock, Phone, User } from 'lucide-react';
import Image from 'next/image';

const Page = () => {
  return (
    <div className='w-full'>
      <div className='w-full mb-7  '>
        <Image
          src={'/logo-full.svg'}
          alt={'Logo'}
          width={200}
          height={100}
          className='mb-7'
        />
        <h1 className='text-[36px] font-semibold mb-5'>Hi there 👋</h1>
        <p className='text-sm text-[#abb8c4]'>
          Register your account to Schedule your first appointment.
        </p>
      </div>
      <form action='' className='w-full space-y-7'>
        <ValidationInput
          title={'Full Name'}
          startItem={<User className={'size-4'} />}
          placeholder='Your name'
        />
        <ValidationInput
          title={'Phone Number'}
          startItem={<Phone className={'size-4'} />}
          placeholder={'Phone Number'}
        />
        <ValidationInput
          title={'Password'}
          startItem={<Lock className='size-4' />}
          placeholder={'Password'}
          type={'password'}
        />
        <Button className='w-full'>Get Started</Button>
      </form>
    </div>
  );
};

export default Page;
