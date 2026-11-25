import Link from 'next/link';
import { profile, socialLinks } from '@/content/site';

const footerSocialMap = new Map(socialLinks.map((item) => [item.label, item]));

const footerItems = [
  { label: 'GitHub', href: footerSocialMap.get('GitHub')?.href ?? 'https://github.com/anwarpage', external: true },
  { label: 'LinkedIn', href: footerSocialMap.get('LinkedIn')?.href ?? 'https://linkedin.com/in/mkaspulanwar', external: true },
  { label: 'Medium', href: footerSocialMap.get('Medium')?.href ?? 'https://medium.com/@mkaspulanwar', external: true },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
  { label: 'Instagram', href: footerSocialMap.get('Instagram')?.href ?? 'https://instagram.com/mkaspulanwar', external: true }
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="reading-column mt-20">
      <nav
        aria-label="Footer links"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[15px] text-[var(--text-nav)] sm:justify-between sm:gap-x-8 sm:text-[15.5px]"
      >
        {footerItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="decoration-[var(--line-strong)] underline-offset-[0.22em] transition-colors duration-200 hover:text-[var(--text-heading)] hover:underline"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex flex-col items-center gap-2 text-center sm:mt-9 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:text-left">
        <p className="font-serif italic text-[14px] leading-snug tracking-[-0.005em] text-[var(--text-secondary)]">
          Keep it simple, deliver faster.
        </p>

        <p className="font-mono text-[11.5px] leading-snug tracking-[0.01em] tabular-nums text-[var(--text-nav)]/80">
          © {year} ·{' '}
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-[var(--text-heading)]"
          >
            @{profile.handle}
          </Link>
        </p>
      </div>
    </footer>
  );
}
