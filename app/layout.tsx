import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReadLater Weekly - Smart Article Digest Platform',
  description: 'Save articles throughout the week and receive organized weekly digest emails. Perfect for busy professionals who want to stay informed.',
  keywords: ['read later', 'article digest', 'weekly newsletter', 'content management', 'productivity'],
  authors: [{ name: 'ReadLater Weekly' }],
  creator: 'ReadLater Weekly',
  publisher: 'ReadLater Weekly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ReadLater Weekly - Smart Article Digest Platform',
    description: 'Save articles throughout the week and receive organized weekly digest emails. Perfect for busy professionals who want to stay informed.',
    url: 'https://readlater-weekly.vercel.app',
    siteName: 'ReadLater Weekly',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/ced08470-632f-11f0-a051-23c10f41277a-photo-1521791136064-7986c2920216-1752771743051.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'ReadLater Weekly - Smart Article Digest Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReadLater Weekly - Smart Article Digest Platform',
    description: 'Save articles throughout the week and receive organized weekly digest emails. Perfect for busy professionals who want to stay informed.',
    images: ['https://imgix.cosmicjs.com/ced08470-632f-11f0-a051-23c10f41277a-photo-1521791136064-7986c2920216-1752771743051.jpg?w=1200&h=630&fit=crop&auto=format,compress'],
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
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}