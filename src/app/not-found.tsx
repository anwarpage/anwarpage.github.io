import Link from 'next/link';
import { DinoOfflineVignette } from '@/components/dino-mark';
import { profile } from '@/content/site';

export default function NotFound() {
  return (
    <div className="reading-column py-16">
      <DinoOfflineVignette />
      <h1 className="mt-5 text-[24px] font-medium text-[var(--text-heading)]">
        Page not found.
      </h1>
      <p className="mt-2 text-[16px] text-[var(--text-nav)]">
        The link may have moved, or the dino unplugged the cable.
      </p>
      <Link href="/" className="soft-link mt-5 inline-block font-sans text-[13.5px]">
        ← Back to @{profile.handle}
      </Link>
    </div>
  );
}
