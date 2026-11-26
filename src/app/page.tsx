import Link from 'next/link';
import { LighthousePainting } from '@/components/lighthouse-painting';
import { ThemeToggle } from '@/components/theme-toggle';
import { bioCopy, contentNavLinks, profile } from '@/content/site';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getPublishedProjects();
  const posts = getPublishedBlogPosts();
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

          <div className="px-5 py-3.5">
            <h2 id="content-heading" className="section-heading mb-1.5">
              Contents
            </h2>
            <ul className="square-list grid grid-cols-1 gap-x-6 gap-y-1 min-[460px]:grid-cols-2 sm:grid-cols-3 sm:gap-x-5">
              {contentNavLinks.map((item) => (
                <li key={item.slug} className="pl-0.5 leading-[1.45]">
                  <Link href={`/${item.slug}`} className="soft-link text-[15.5px]">
                    {item.label}
                  </Link>
                </li>
              ))}
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
        <section aria-label="About" className="mt-6">
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
            {bioCopy.shortParagraphs.map((text, index) => (
              <p key={index} className="text-pretty">
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* Selected work */}
        <section aria-labelledby="project-heading" className="mt-11">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="project-heading" className="section-heading">
              Selected work
            </h2>
            <Link
              href="/work"
              className="font-body text-xs text-[var(--text-nav)] transition-colors hover:text-[var(--text-heading)]"
            >
              All {projects.length}
            </Link>
          </div>
          <ul>
            {recentProjects.map((project, index) => {
              const showYear = index === 0 || recentProjects[index - 1].year !== project.year;
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
                        className="mt-1 inline-block w-10 shrink-0 self-start font-body text-xs tabular-nums text-[var(--text-nav)] md:w-14"
                      >
                        {project.year}
                      </time>
                    )}
                    <span className="grow pr-3 text-[15.5px] leading-[1.45] text-[var(--text-heading)]">
                      <span className="soft-link transition-colors">{project.shortTitle}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 self-start font-body text-xs text-[var(--text-nav)] transition-colors group-hover:text-[var(--text-heading)]"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Recent writing */}
        <section aria-labelledby="writing-heading" className="mt-11">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="writing-heading" className="section-heading">
              Recent writing
            </h2>
            <Link
              href="/writing"
              className="font-body text-xs text-[var(--text-nav)] transition-colors hover:text-[var(--text-heading)]"
            >
              More
            </Link>
          </div>
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
                        className="mt-1 inline-block w-10 shrink-0 self-start font-body text-xs tabular-nums text-[var(--text-nav)] md:w-14"
                      >
                        {post.year}
                      </time>
                    )}
                    <span className="grow pr-3 text-[15.5px] leading-[1.45] text-[var(--text-heading)]">
                      <span className="soft-link transition-colors">{post.title}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 self-start font-body text-xs text-[var(--text-nav)] transition-colors group-hover:text-[var(--text-heading)]"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </article>
  );
}
