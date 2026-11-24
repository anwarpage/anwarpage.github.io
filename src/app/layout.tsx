import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, La_Belle_Aurore, Newsreader } from 'next/font/google';
import { Providers } from '@/components/providers';
import { profile, socialLinks } from '@/content/site';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
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
      className={`${newsreader.variable} ${ibmPlexMono.variable} ${laBelleAurore.variable}`}
    >
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
