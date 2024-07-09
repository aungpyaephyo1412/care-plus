'use client';
import { register } from '@/app/(auth)/register/register.action';
import DatePicker from '@/components/date-picker';
import SubmitButton from '@/components/submit-button';
import ValidationInput from '@/components/validation-input';
import { Leaf, Lock, MapPin, Phone, User } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Image from 'next/image';
import { useState } from 'react';

const Page = () => {
  const [date, setDate] = useState<Date | null>(null);
  const {
    result: { data, serverError, validationErrors, fetchError },
    execute,
    isExecuting,
  } = useAction(register);
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const body = {
            name: e.currentTarget.fullName.value,
            phone: e.currentTarget.phone.value,
            password: e.currentTarget.password.value,
            address: e.currentTarget.address.value,
            age: parseInt(e.currentTarget.age.value),
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
            placeholder='Your name'
            name={'fullName'}
            errorMessage={validationErrors?.name?._errors[0]}
          />
          <ValidationInput
            title={'Phone Number'}
            startItem={<Phone className={'size-4'} />}
            placeholder={'Phone Number'}
            name={'phone'}
            errorMessage={validationErrors?.phone?._errors[0]}
          />
        </div>
        <div className='grid gap-5 grid-cols-2'>
          <ValidationInput
            title={'Address'}
            startItem={<MapPin className={'size-4'} />}
            placeholder='Your address'
            name={'address'}
            errorMessage={validationErrors?.address?._errors[0]}
          />
          <ValidationInput
            title={'Your age'}
            startItem={<Leaf className={'size-4'} />}
            placeholder={'Age'}
            name={'age'}
            min={0}
            type={'number'}
            errorMessage={validationErrors?.age?._errors[0]}
          />
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <DatePicker
            title={'Your birthday date'}
            onChange={setDate}
            date={date}
            errorMessage={validationErrors?.dateOfBirth?._errors[0]}
          />
          <ValidationInput
            title={'Password'}
            startItem={<Lock className='size-4' />}
            placeholder={'Password'}
            type={'password'}
            name={'password'}
            errorMessage={validationErrors?.password?._errors[0]}
          />
        </div>
        <SubmitButton
          isSubmitting={isExecuting}
          className='w-full'
          name={'Get Started'}
        />
      </form>
    </div>
  );
};

export default Page;
