'use client';

import Link from 'next/link';
import { BioSwitcher } from '@/components/bio-switcher';
import { DinoMark } from '@/components/dino-mark';
import { DinoScene } from '@/components/dino-scene';
import { ThemeToggle } from '@/components/theme-toggle';
import { contentNavLinks, favoritePoemQuote } from '@/content/notes';
import { profile, socialLinks } from '@/content/site';
import type { BlogEntry } from '@/lib/blog';
import type { ProjectSummary } from '@/lib/projects';

export function HomeView({
  projects,
  posts
}: {
  projects: ProjectSummary[];
  posts: BlogEntry[];
}) {
  const recentProjects = projects.slice(0, 6);

  return (
    <article className="w-full">
      {/* Top panoramic Lineless Editorial Gouache Dino plate */}
      <div className="mb-10">
        <DinoScene />
      </div>

      {/* Centered 600px reading column — zero navbar */}
      <div className="reading-column">
        <header className="flex items-center justify-between gap-4">
          <h1 className="flex items-center gap-2 text-[22px] font-medium tracking-[-0.015em] text-[var(--text-heading)]">
            <DinoMark variant="stand" size={18} />
            <span>
              <span className="text-[var(--text-nav)]">@</span>
              {profile.handle}
            </span>
          </h1>
          <ThemeToggle />
        </header>

        <BioSwitcher />

        {/* Content — conversational editorial index replacing "Notes" */}
        <section aria-labelledby="content-heading" className="mt-11">
          <h2
            id="content-heading"
            className="mb-3 font-sans text-[13px] font-normal text-[var(--text-nav)]"
          >
            Content
          </h2>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {contentNavLinks.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`} className="soft-link text-[16px]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Writing (Medium essays) */}
        <section aria-labelledby="writing-heading" className="mt-11">
          <h2
            id="writing-heading"
            className="mb-3 font-sans text-[13px] font-normal text-[var(--text-nav)]"
          >
            Writing
          </h2>
          <div className="space-y-2.5">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={post.mediumUrl ?? 'https://medium.com/@mkaspulanwar'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-0.5 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="soft-link text-[16px] leading-[1.45]">{post.title}</span>
                <span className="shrink-0 font-sans text-[13px] text-[var(--text-nav)]">
                  Medium ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section aria-labelledby="work-heading" className="mt-11">
          <div className="mb-3 flex items-baseline justify-between font-sans text-[13px] text-[var(--text-nav)]">
            <h2 id="work-heading" className="font-normal">
              Selected Work
            </h2>
            <Link
              href="/work"
              className="transition-colors hover:text-[var(--text-heading)]"
            >
              All {projects.length} →
            </Link>
          </div>
          <div className="space-y-2.5">
            {recentProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                className="group flex flex-col gap-0.5 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="soft-link text-[16px] leading-[1.45]">{project.title}</span>
                <time
                  dateTime={project.date}
                  className="shrink-0 font-sans text-[13px] tabular-nums text-[var(--text-nav)]"
                >
                  {project.dateLabel}
                </time>
              </Link>
            ))}
          </div>
        </section>

        {/* Favorite verse — Tupac Shakur, The Rose That Grew from Concrete */}
        <figure className="mt-12 border-l-2 border-[var(--line-strong)] pl-4">
          <blockquote className="italic text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
            {favoritePoemQuote.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
          <figcaption className="mt-2 font-sans text-[12.5px] text-[var(--text-nav)]">
            — {favoritePoemQuote.author},{' '}
            <cite className="not-italic">{favoritePoemQuote.title}</cite>
          </figcaption>
        </figure>

        {/* Quiet minimal links at the end */}
        <footer className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[var(--line-subtle)] pt-5 font-sans text-[13px] text-[var(--text-nav)]">
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
