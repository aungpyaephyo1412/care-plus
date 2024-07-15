import Provider from '@/components/provider';
import { cn } from '@/lib/utils';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

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
    url: 'https://care-plus.vercel.app',
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
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(GeistSans.variable, GeistMono.variable)}
        suppressHydrationWarning
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
