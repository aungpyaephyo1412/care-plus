import { Button } from '@/components/ui/button';
import { SunIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), {
  loading: () => (
    <button className='flex size-10 items-center justify-center rounded-full opacity-80 outline-none transition-opacity hover:opacity-100'>
      <SunIcon />
    </button>
  ),
  ssr: false,
});
const Page = () => {
  return (
    <div className='flex-1 w-full flex flex-col justify-center items-center gap-5 '>
      <ThemeToggle />
      <div className='space-x-5'>
        <Button asChild variant='outline'>
          <Link href={'/dashboard'}>Appointment History</Link>
        </Button>
        <Button asChild variant='outline'>
          <Link href={'/new-appointment'}>New Appointment</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
