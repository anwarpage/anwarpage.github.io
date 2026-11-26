import type { Metadata } from 'next';
import { BackBar } from '@/components/back-bar';
import { profile, technicalNotes } from '@/content/site';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getLastUpdated } from '@/lib/git-dates';

export const metadata: Metadata = {
  title: "What I've written",
  description: `Essays and technical notes by ${profile.name}.`
};

export default function WritingPage() {
  const posts = getPublishedBlogPosts();
  const updated = getLastUpdated(['src/content/blog', 'src/content/site.ts']);

  return (
    <article className="reading-column">
      <BackBar updated={updated} />
      <header className="mb-8">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          What I&apos;ve written
        </h1>
        <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
          Longer stories published on Medium and shorter field notes from building things.
        </p>
      </header>

      <section>
        <h2 className="section-heading mb-3">Essays on Medium</h2>
        <ul className="space-y-2">
          {posts.map((post, index) => {
            const showYear = index === 0 || posts[index - 1].year !== post.year;
            return (
              <li key={post.slug} className="group">
                <a
                  href={post.mediumUrl ?? 'https://medium.com/@mkaspulanwar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start py-2.5 no-underline ${
                    showYear ? '' : 'ml-10 md:ml-14'
                  }`}
                >
                  {showYear && (
                    <time
                      dateTime={post.date}
                      className="mt-1.5 inline-block w-10 shrink-0 self-start font-body text-xs tabular-nums text-[var(--text-nav)] md:w-14"
                    >
                      {post.year}
                    </time>
                  )}
                  <div className="grow pr-3">
                    <span className="soft-link text-pretty text-[17px] leading-[1.4] font-medium text-[var(--text-heading)]">
                      {post.title}
                    </span>
                    <p className="mt-1 text-pretty text-[15px] leading-[1.62] text-[var(--text-secondary)]">
                      {post.description}
                    </p>
                  </div>
                  <span className="mt-1.5 shrink-0 self-start font-body text-xs text-[var(--text-nav)]">
                    {post.shortType} ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="section-heading mb-4">Short field notes</h2>
        <div className="space-y-5">
          {technicalNotes.map((item) => (
            <div key={item.title}>
              <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">
                {item.title}
              </h3>
              <p className="mt-1 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
