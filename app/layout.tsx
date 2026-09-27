import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Lora, Great_Vibes } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-display',
  display: 'swap',
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'Cambria', 'serif'],
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif-body',
  display: 'swap',
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'Cambria', 'serif'],
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-signature',
  weight: ['400'],
  display: 'swap',
  fallback: ['cursive', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Vibe Affair | Premium Event Planners',
  description: 'Breaking free from the ordinary to create extraordinary, deeply personal event experiences.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfairDisplay.variable} ${lora.variable} ${greatVibes.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
