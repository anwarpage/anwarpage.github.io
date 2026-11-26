import type { Metadata } from 'next';
import Link from 'next/link';
import { BackBar } from '@/components/back-bar';
import { profile } from '@/content/site';
import { getLastUpdated } from '@/lib/git-dates';
import { getPublishedProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: "What I've built",
  description: `Selected projects built by ${profile.name}.`
};

export default function WorkPage() {
  const projects = getPublishedProjects();
  const updated = getLastUpdated(['src/content/projects']);

  return (
    <article className="reading-column">
      <BackBar updated={updated} />
      <header className="mb-8">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          What I&apos;ve built
        </h1>
        <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
          Applications, computer vision models, civic portals, and experiments I have built.
        </p>
      </header>

      <ul className="space-y-2">
        {projects.map((project, index) => {
          const showYear = index === 0 || projects[index - 1].year !== project.year;
          return (
            <li key={project.slug} className="group">
              <Link
                href={`/${project.slug}`}
                className={`flex items-start py-2.5 no-underline ${
                  showYear ? '' : 'ml-10 md:ml-14'
                }`}
              >
                {showYear && (
                  <time
                    dateTime={project.date}
                    className="mt-1.5 inline-block w-10 shrink-0 self-start font-body text-xs tabular-nums text-[var(--text-nav)] md:w-14"
                  >
                    {project.year}
                  </time>
                )}
                <div className="grow pr-3">
                  <span className="soft-link text-pretty text-[17px] leading-[1.4] font-medium text-[var(--text-heading)]">
                    {project.title}
                  </span>
                  <p className="mt-1 text-pretty text-[15px] leading-[1.62] text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                </div>
                <span className="mt-1.5 shrink-0 self-start font-body text-xs text-[var(--text-nav)]">
                  {project.shortType}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
