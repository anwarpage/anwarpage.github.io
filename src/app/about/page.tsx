import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BackBar } from '@/components/back-bar';
import { bioCopy, education, expertiseAreas, profile, toolkitGroups } from '@/content/site';
import { getLastUpdated } from '@/lib/git-dates';

export const metadata: Metadata = {
  title: 'Who I am',
  description: `Background, education, and focus of ${profile.name}.`
};

export default function AboutPage() {
  const updated = getLastUpdated(['src/content/site.ts']);

  return (
    <article className="reading-column">
      <BackBar updated={updated} />
      <header className="mb-8">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          Who I am
        </h1>
      </header>

      <div className="space-y-4 text-[15.5px] leading-[1.72] text-[var(--text-copy)]">
        {bioCopy.longParagraphs.map((paragraph, index) => (
          <p key={index} className="text-pretty">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="my-7 grid grid-cols-3 gap-2.5">
        {bioCopy.portraits.map((photo) => (
          <div
            key={photo.src}
            className="group relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--line-subtle)] bg-[var(--surface-subtle)]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 30vw, 190px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
        For work experience, organizations, and honors, see{' '}
        <Link href="/contributions" className="soft-link text-[var(--text-heading)]">
          Where I&apos;ve contributed
        </Link>
        .
      </p>

      <section className="mt-10 space-y-5">
        <h2 className="section-heading">Education</h2>
        {education.map((item) => (
          <div key={item.school}>
            <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
              <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">
                {item.school}
              </h3>
              <span className="font-body text-[13px] text-[var(--text-nav)]">{item.period}</span>
            </div>
            <p className="font-body text-[13.5px] text-[var(--text-nav)]">
              {item.degree} · {item.meta}
            </p>
            {item.notes && (
              <p className="mt-1.5 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
                {item.notes}
              </p>
            )}
          </div>
        ))}
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="section-heading">Focus</h2>
        <ul className="square-list space-y-2.5 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
          {expertiseAreas.map((area) => (
            <li key={area.title}>
              <strong className="font-semibold text-[var(--text-heading)]">{area.title}:</strong>{' '}
              {area.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-2.5">
        <h2 className="section-heading">Toolkit</h2>
        {toolkitGroups.map((group) => (
          <p key={group.label} className="text-[15.5px] leading-[1.68] text-[var(--text-copy)]">
            <strong className="font-medium text-[var(--text-heading)]">{group.label}:</strong>{' '}
            {group.items.join(', ')}.
          </p>
        ))}
      </section>
    </article>
  );
}
