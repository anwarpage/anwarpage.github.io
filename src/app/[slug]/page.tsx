import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BackBar } from '@/components/back-bar';
import { MarkdownArticle } from '@/components/markdown-article';
import { getProjectBySlug, getPublishedProjects } from '@/lib/projects';

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Not Found' };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="reading-column">
      <BackBar />

      <header className="mb-7">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          {project.title}
        </h1>
        <p className="mt-1.5 font-body text-[13px] text-[var(--text-nav)]">
          <time dateTime={project.date}>{project.dateLabel}</time> · {project.category}
          {project.liveUrl && (
            <>
              {' · '}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="soft-link"
              >
                Live ↗
              </a>
            </>
          )}
          {project.githubLinks.map((link) => (
            <span key={link.url}>
              {' · '}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="soft-link"
              >
                {link.label ?? 'GitHub'} ↗
              </a>
            </span>
          ))}
        </p>
      </header>

      {project.imageUrl && (
        <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-subtle)]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      )}

      <MarkdownArticle html={project.contentHtml} />
    </article>
  );
}
