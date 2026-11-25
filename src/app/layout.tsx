import type { Metadata, Viewport } from 'next';
import {
  Atkinson_Hyperlegible_Next,
  La_Belle_Aurore,
  Schibsted_Grotesk
} from 'next/font/google';
import { Providers } from '@/components/providers';
import { SiteFooter } from '@/components/site-footer';
import { profile, socialLinks } from '@/content/site';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-schibsted-grotesk',
  display: 'swap'
});

const atkinsonHyperlegibleNext = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-atkinson-hyperlegible-next',
  display: 'swap'
});

const laBelleAurore = La_Belle_Aurore({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-la-belle-aurore',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s — ${profile.name}`
  },
  description:
    'M. Kaspul Anwar — Engineer and writer working across machine learning, data, and software.',
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
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schibstedGrotesk.variable} ${atkinsonHyperlegibleNext.variable} ${laBelleAurore.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="site-shell">
            <main>{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
