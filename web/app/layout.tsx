import Provider from '@/components/provider';
import { cn } from '@/lib/utils';
import { SunIcon } from 'lucide-react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), {
  loading: () => (
    <button className='flex size-10 items-center justify-center rounded-full opacity-80 outline-none transition-opacity hover:opacity-100'>
      <SunIcon />
    </button>
  ),
  ssr: false,
});
export const metadata: Metadata = {
  metadataBase: new URL('https://care-plus.vercel.app'),
  title: {
    default: 'Care Plus',
    template: '%s | Care Plus',
  },
  description:
    'Care Plus is a comprehensive web-a-1 application for booking and managing medical check-up appointments. Ensure your health and wellness with our easy-to-use scheduling system.',
  openGraph: {
    title: 'Care Plus',
    description:
      'Care Plus is a comprehensive web-a-1 application for booking and managing medical check-up appointments. Ensure your health and wellness with our easy-to-use scheduling system.',
    url: 'https://aungpyaephyo.vercel.app',
    siteName: 'Care Plus',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Care Plus',
    card: 'summary_large_image',
  },
  // verification: {
  //   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  //   yandex: '14d2e73487fa6c71',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(geistSans.variable, geistMono.variable)}
        suppressHydrationWarning
      >
        <Provider>
          <ThemeToggle />
          {children}
        </Provider>
      </body>
    </html>
  );
}
