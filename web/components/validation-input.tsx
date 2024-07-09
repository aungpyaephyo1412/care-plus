'use client';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface ValidationInputProps extends InputProps {
  startItem?: ReactNode;
  errorMessage?: string;
}
const ValidationInput = ({
  id,
  title,
  startItem,
  className,
  errorMessage,
  ...props
}: ValidationInputProps) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <div className='w-full h-auto flex flex-col justify-center items-center'>
      {title && (
        <label htmlFor={id} className='w-full text-sm font-semibold mb-2'>
          {title}
        </label>
      )}
      <div className='w-full relative'>
        <div className='absolute inset-y-0 flex flex-col justify-center items-center px-4'>
          {startItem}
        </div>
        <Input
          id={id}
          {...props}
          className={cn(
            className,
            startItem && 'pl-[45px]',
            props.type === 'password' && 'pr-[45px]',
            errorMessage && 'border-red-500 ring-red-500'
          )}
          type={togglePassword ? 'text' : props.type}
        />
        {props.type === 'password' && (
          <button
            type={'button'}
            onClick={() => setTogglePassword((p) => !p)}
            className='absolute right-0 inset-y-0 flex flex-col justify-center items-center px-3'
          >
            {togglePassword ? (
              <EyeOff className='size-5' />
            ) : (
              <Eye className='size-5' />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <p className='text-sm text-red-500 w-full mt-2'>{errorMessage}</p>
      )}
    </div>
  );
};

export default ValidationInput;
