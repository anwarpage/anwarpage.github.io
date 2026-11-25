import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="reading-column py-16">
      <h1 className="font-heading text-[24px] font-medium text-[var(--text-heading)]">
        Page not found.
      </h1>
      <p className="mt-2 text-[15px] text-[var(--text-nav)]">
        The link may have moved or no longer exists.
      </p>
      <Link
        href="/"
        className="group mt-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--line-subtle)] bg-[var(--bg)] px-3 py-1.5 font-body text-[13px] font-medium text-[var(--text-secondary)] no-underline transition-all duration-200 hover:border-[var(--line-strong)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-heading)]"
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
    </div>
  );
}
