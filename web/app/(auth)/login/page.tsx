'use client';
import { login } from '@/app/(auth)/login/login.action';
import LogoFull from '@/components/logo-full';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import ValidationInput from '@/components/validation-input';
import { Lock, Phone, TriangleAlert } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';

const Page = () => {
  const {
    result: { serverError, validationErrors },
    execute,
    isExecuting,
  } = useAction(login);
  return (
    <div className='w-full'>
      <div className='w-full mb-7  '>
        <LogoFull />
        <h1 className='text-[36px] font-semibold mb-5'>Hi there 👋</h1>
        <p className='text-sm text-[#abb8c4]'>
          Login your account to Schedule your appointment and show your
          appointment histories.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const body = {
            phone: e.currentTarget.phone.value,
            password: e.currentTarget.password.value,
          };
          execute(body);
        }}
        className='w-full space-y-7'
      >
        {serverError && (
          <Alert variant='destructive'>
            <TriangleAlert className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Invalid credentials. Please log in again.
            </AlertDescription>
          </Alert>
        )}
        <ValidationInput
          title={'Phone Number'}
          startItem={<Phone className={'size-4'} />}
          placeholder={'09123456789'}
          name={'phone'}
          errorMessage={validationErrors?.phone?._errors[0]}
        />
        <ValidationInput
          title={'Password'}
          startItem={<Lock className='size-4' />}
          type={'password'}
          name={'password'}
          errorMessage={validationErrors?.password?._errors[0]}
        />
        <SubmitButton
          isSubmitting={isExecuting}
          className='w-full'
          name={'Login'}
        />
        <Separator />
        <div className='w-full flex justify-end items-center'>
          <p className='text-sm font-medium'>
            New patient in care plus?
            <Link
              href={'/register'}
              className='text-blue-500 hover:underline pl-2'
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Page;
