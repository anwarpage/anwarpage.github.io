import Link from 'next/link';
import { profile } from '@/content/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="reading-column mt-20">
      <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:text-left">
        <p className="font-script text-[18px] leading-snug text-[var(--text-secondary)]">
          Keep it simple, deliver faster.
        </p>

        <p className="font-body text-[11.5px] leading-snug tracking-[0.01em] tabular-nums text-[var(--text-nav)]/80">
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
