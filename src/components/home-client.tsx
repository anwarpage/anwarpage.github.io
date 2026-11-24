'use client';

import Link from 'next/link';
import { BioSwitcher } from '@/components/bio-switcher';
import { LighthousePainting } from '@/components/lighthouse-painting';
import { ThemeToggle } from '@/components/theme-toggle';
import { contentNavLinks } from '@/content/notes';
import { profile, socialLinks } from '@/content/site';
import type { BlogEntry } from '@/lib/blog';
import type { ProjectSummary } from '@/lib/projects';

const SHORT_PROJECT_NAMES: Record<string, string> = {
  sikopling: 'Sikopling',
  silira: 'Silira',
  'childfall-detection': 'Child Fall Detection',
  'rupiah-denomination': 'Rupiah Denomination'
};

function getProjectName(project: ProjectSummary): string {
  if (SHORT_PROJECT_NAMES[project.slug]) return SHORT_PROJECT_NAMES[project.slug];
  const separatorIndex = project.title.indexOf(' - ');
  return separatorIndex < 0 ? project.title : project.title.slice(0, separatorIndex).trim();
}

export function HomeView({
  projects,
  posts
}: {
  projects: ProjectSummary[];
  posts: BlogEntry[];
}) {
  const recentProjects = projects.slice(0, 7);

  return (
    <article className="w-full">
      <div className="reading-column">
        {/* Unified minimalist hero card: Gouache Banner + Content index */}
        <section
          aria-labelledby="content-heading"
          className="overflow-hidden rounded-2xl border border-[var(--line-subtle)] bg-[var(--bg)]"
        >
          <div className="border-b border-[var(--line-subtle)]">
            <LighthousePainting />
          </div>

          <div className="px-5 py-4">
            <h2 id="content-heading" className="section-heading mb-2.5">
              Content
            </h2>
            <ul className="square-list grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-[repeat(3,max-content)] sm:justify-between">
              {contentNavLinks.map((item) => (
                <li key={item.slug} className="pl-0.5">
                  <Link href={`/${item.slug}`} className="soft-link text-[16px]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pl-0.5">
                <a
                  href={profile.resumeHref}
                  download="resume-m-kaspul-anwar.pdf"
                  className="soft-link text-[16px]"
                >
                  Read my resume
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Identity header */}
        <header className="mt-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="site-title">
              <span className="site-title-at">@</span>
              {profile.handle}
            </h1>
            <p className="mt-1 font-script text-[21px] leading-[1.3] text-[var(--text-secondary)]">
              {profile.name}
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Story */}
        <BioSwitcher />

        {/* Project */}
        <section aria-labelledby="project-heading" className="mt-11">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="project-heading" className="section-heading">
              Project
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs text-[var(--text-nav)] transition-colors hover:text-[var(--text-heading)]"
            >
              All {projects.length}
            </Link>
          </div>
          <ul>
            {recentProjects.map((project, index) => {
              const showYear = index === 0 || recentProjects[index - 1].year !== project.year;
              const name = getProjectName(project);
              return (
                <li key={project.slug} className="group">
                  <Link
                    href={`/${project.slug}`}
                    className={`flex items-center py-2 no-underline ${
                      showYear ? '' : 'ml-10 md:ml-14'
                    }`}
                  >
                    {showYear && (
                      <time
                        dateTime={project.date}
                        className="mt-1 inline-block w-10 shrink-0 self-start font-mono text-xs tabular-nums text-[var(--text-nav)] md:w-14"
                      >
                        {project.year}
                      </time>
                    )}
                    <span className="grow pr-3 text-[16px] leading-[1.45] text-[var(--text-heading)]">
                      <span className="soft-link transition-colors">{name}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 self-start font-mono text-xs text-[var(--text-nav)] transition-colors group-hover:text-[var(--text-heading)]"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Writing */}
        <section aria-labelledby="writing-heading" className="mt-11">
          <h2 id="writing-heading" className="section-heading mb-3">
            Writing
          </h2>
          <ul>
            {posts.map((post, index) => {
              const showYear = index === 0 || posts[index - 1].year !== post.year;
              return (
                <li key={post.slug} className="group">
                  <a
                    href={post.mediumUrl ?? 'https://medium.com/@mkaspulanwar'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center py-2 no-underline ${
                      showYear ? '' : 'ml-10 md:ml-14'
                    }`}
                  >
                    {showYear && (
                      <time
                        dateTime={post.date}
                        className="mt-1 inline-block w-10 shrink-0 self-start font-mono text-xs tabular-nums text-[var(--text-nav)] md:w-14"
                      >
                        {post.year}
                      </time>
                    )}
                    <span className="grow pr-3 text-[16px] leading-[1.45] text-[var(--text-heading)]">
                      <span className="soft-link transition-colors">{post.title}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 self-start font-mono text-xs text-[var(--text-nav)] transition-colors group-hover:text-[var(--text-heading)]"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Quiet minimal links at the end */}
        <footer className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[12px] text-[var(--text-nav)]">
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-[var(--text-heading)]"
          >
            Email
          </a>
          {socialLinks.slice(0, 3).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--text-heading)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeHref}
            download="resume-m-kaspul-anwar.pdf"
            className="transition-colors hover:text-[var(--text-heading)]"
          >
            Resume
          </a>
        </footer>
      </div>
    </article>
  );
}
