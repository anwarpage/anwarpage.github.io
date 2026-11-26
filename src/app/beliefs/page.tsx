import type { Metadata } from 'next';
import { BackBar } from '@/components/back-bar';
import { MarkdownArticle } from '@/components/markdown-article';
import { profile } from '@/content/site';
import { getBeliefsPage } from '@/lib/beliefs';
import { getLastUpdated } from '@/lib/git-dates';

export const metadata: Metadata = {
  title: 'What I believe',
  description: `Values and principles ${profile.name} lives by.`
};

export default function BeliefsPage() {
  const beliefs = getBeliefsPage();
  const updated = beliefs.updated ?? getLastUpdated(['src/content/beliefs.md']);

  return (
    <article className="reading-column">
      <BackBar updated={updated} />
      <header className="mb-8">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          {beliefs.title}
        </h1>
        <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
          {beliefs.description}
        </p>
      </header>

      {beliefs.quote && (
        <figure className="mb-11 rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-subtle)] px-6 py-7 sm:px-8 sm:py-8">
          <blockquote className="font-script text-[25px] leading-[1.48] text-[var(--text-heading)] sm:text-[29px]">
            <p className="text-pretty">&ldquo;{beliefs.quote}&rdquo;</p>
          </blockquote>

          {(beliefs.quoteAuthor || beliefs.quoteSource) && (
            <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-body text-[11.5px] text-[var(--text-nav)]">
              {beliefs.quoteAuthor && <span>— {beliefs.quoteAuthor}</span>}
              {beliefs.quoteSource && (
                <span className="text-[var(--text-nav)]/70">{beliefs.quoteSource}</span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      <MarkdownArticle html={beliefs.contentHtml} />
    </article>
  );
}
