'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon'}
          variant={'secondary'}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className='flex size-10 items-center justify-center rounded-full opacity-80 outline-none transition-opacity hover:opacity-100'
        >
          {theme === 'light' ? (
            <SunIcon className='size-5' />
          ) : (
            <MoonIcon className='size-5' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-fit' align='center' side='top'>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value='system'>Auto</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ThemeToggle;
