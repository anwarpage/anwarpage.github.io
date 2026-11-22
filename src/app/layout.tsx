import type { Metadata, Viewport } from 'next';
import { STIX_Two_Text } from 'next/font/google';
import { Providers } from '@/components/providers';
import { profile, socialLinks } from '@/content/site';
import './globals.css';

// Matches leerob.com's reading stack: Iowan Old Style first, with STIX Two Text
// self-hosted as the cross-platform literary serif fallback for Windows & Linux.
const stixTwoText = STIX_Two_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-stix-two-text',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s — ${profile.name}`
  },
  description:
    'M. Kaspul Anwar — Engineer and writer in Banjarmasin working across machine learning, data, and software.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/favicon/apple-touch-icon.png'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1a19' }
  ]
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  email: `mailto:${profile.email}`,
  jobTitle: 'Machine Learning & Software Engineer',
  sameAs: socialLinks.map((item) => item.href)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={stixTwoText.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <main className="site-shell">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
