import type { Metadata } from 'next';
import { BackBar } from '@/components/back-bar';
import { experiences, honors, organizations, profile } from '@/content/site';
import { getLastUpdated } from '@/lib/git-dates';

export const metadata: Metadata = {
  title: "Where I've contributed",
  description: `Work experience, organizations, and honors of ${profile.name}.`
};

export default function ContributionsPage() {
  const updated = getLastUpdated(['src/content/site.ts']);

  return (
    <article className="reading-column">
      <BackBar updated={updated} />
      <header className="mb-8">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          Where I&apos;ve contributed
        </h1>
        <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
          Work experience, organizations, and honors — small ways I refuse to sit still and try to
          leave things a little brighter.
        </p>
      </header>

      <figure className="mb-11 rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-subtle)] px-6 py-7 sm:px-8 sm:py-8">
        <blockquote className="font-script text-[25px] leading-[1.48] text-[var(--text-heading)] sm:text-[29px]">
          <p className="text-pretty">
            &ldquo;Do not go gentle into that good night.
            <br className="hidden sm:inline" /> Rage, rage against the dying of the light.&rdquo;
          </p>
        </blockquote>

        <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-body text-[11.5px] text-[var(--text-nav)]">
          <span>— Dylan Thomas</span>
          <span className="text-[var(--text-nav)]/70">Do Not Go Gentle into That Good Night</span>
        </figcaption>
      </figure>

      <section className="space-y-5">
        <h2 className="section-heading">Experience</h2>
        {experiences.map((item) => (
          <div key={`${item.org}-${item.period}`}>
            <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
              <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">{item.role}</h3>
              <span className="font-body text-[13px] text-[var(--text-nav)]">{item.period}</span>
            </div>
            <p className="font-body text-[13.5px] text-[var(--text-nav)]">
              {item.org} · {item.location}
            </p>
            <ul className="square-list mt-2 space-y-1 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {organizations.length > 0 && (
        <section className="mt-10 space-y-5">
          <h2 className="section-heading">Organizations &amp; Community</h2>
          {organizations.map((item) => (
            <div key={`${item.org}-${item.period}`}>
              <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
                <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">
                  {item.role}
                </h3>
                <span className="font-body text-[13px] text-[var(--text-nav)]">{item.period}</span>
              </div>
              <p className="font-body text-[13.5px] text-[var(--text-nav)]">
                {item.location ? `${item.org} · ${item.location}` : item.org}
              </p>
              {item.points.length > 0 && (
                <ul className="square-list mt-2 space-y-1 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {honors.length > 0 && (
        <section className="mt-10 space-y-4">
          <h2 className="section-heading">Honors &amp; Awards</h2>
          {honors.map((item) => (
            <div key={`${item.title}-${item.year}`}>
              <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
                <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">
                  {item.title}
                </h3>
                <span className="font-body text-[13px] text-[var(--text-nav)]">{item.year}</span>
              </div>
              <p className="font-body text-[13.5px] text-[var(--text-nav)]">{item.issuer}</p>
              {item.note && (
                <p className="mt-1.5 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
