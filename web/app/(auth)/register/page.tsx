'use client';
import { register } from '@/app/(auth)/register/register.action';
import DatePicker from '@/components/date-picker';
import LogoFull from '@/components/logo-full';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ValidationInput from '@/components/validation-input';
import { Lock, MapPin, Phone, User } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
  const [date, setDate] = useState<Date | null>(null);
  const {
    result: { data, validationErrors },
    execute,
    isExecuting,
  } = useAction(register);
  return (
    <div className='w-full'>
      <div className='w-full mb-7  '>
        <LogoFull />
        <h1 className='text-[36px] font-semibold mb-5'>Hi there 👋</h1>
        <p className='text-sm text-[#abb8c4]'>
          Register your account to Schedule your first appointment.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const body = {
            name: e.currentTarget.fullName.value,
            phone: e.currentTarget.phone.value,
            password: e.currentTarget.password.value,
            address: e.currentTarget.address.value,
            dateOfBirth: date?.toISOString(),
          };
          execute(body);
        }}
        className='w-full space-y-7'
      >
        <div className='grid gap-5 grid-cols-2'>
          <ValidationInput
            title={'Full Name'}
            startItem={<User className={'size-4'} />}
            placeholder='Mg Mg'
            name={'fullName'}
            errorMessage={validationErrors?.name?._errors[0]}
          />
          <ValidationInput
            title={'Phone Number'}
            startItem={<Phone className={'size-4'} />}
            placeholder={'09123456789'}
            name={'phone'}
            errorMessage={data?.phone || validationErrors?.phone?._errors[0]}
          />
        </div>
        <ValidationInput
          title={'Password'}
          startItem={<Lock className='size-4' />}
          type={'password'}
          name={'password'}
          errorMessage={validationErrors?.password?._errors[0]}
        />
        <div className='grid gap-5 grid-cols-2'>
          <ValidationInput
            title={'Address'}
            startItem={<MapPin className={'size-4'} />}
            placeholder='township, city, state'
            name={'address'}
            errorMessage={validationErrors?.address?._errors[0]}
          />
          <DatePicker
            title={'Your birthday date'}
            onChange={setDate}
            date={date}
            errorMessage={validationErrors?.dateOfBirth?._errors[0]}
          />
        </div>
        <SubmitButton
          isSubmitting={isExecuting}
          className='w-full'
          name={'Get Started'}
        />
        <Separator />
        <div className='w-full grid lg:grid-cols-2 gap-5'>
          <Button variant={'outline'} asChild>
            <Link href={'/forgot-password'}>Forgot Password?</Link>
          </Button>
          <Button variant={'secondary'} asChild>
            <Link href={'/login'}>Already have an account? Log in</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
