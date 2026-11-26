import Link from 'next/link';
import type { LastUpdatedInfo } from '@/lib/git-dates';

export function BackBar({ updated }: { updated?: LastUpdatedInfo | null }) {
  return (
    <nav aria-label="Page navigation" className="mb-8 flex items-center justify-between gap-4">
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line-subtle)] bg-[var(--bg)] px-3 py-1.5 font-body text-[13px] font-medium text-[var(--text-secondary)] no-underline transition-all duration-200 hover:border-[var(--line-strong)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-heading)]"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        <span>Home</span>
      </Link>

      {updated && (
        <time
          dateTime={updated.iso}
          className="font-body text-[12px] tabular-nums text-[var(--text-nav)]"
        >
          Updated {updated.label}
        </time>
      )}
    </nav>
  );
}
