import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MarkdownArticle } from '@/components/markdown-article';
import { beliefsSections, contentNavLinks } from '@/content/notes';
import {
  bioCopy,
  education,
  experiences,
  expertiseAreas,
  honors,
  organizations,
  profile,
  socialLinks,
  technicalNotes,
  toolkitGroups
} from '@/content/site';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getProjectBySlug, getPublishedProjects } from '@/lib/projects';

const CORE_SLUGS = contentNavLinks.map((item) => item.slug);

export function generateStaticParams() {
  const core = CORE_SLUGS.map((slug) => ({ slug }));
  const projects = getPublishedProjects().map((project) => ({ slug: project.slug }));
  return [...core, ...projects];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'about') {
    return { title: 'Who I am', description: `Background, education, and focus of ${profile.name}.` };
  }
  if (slug === 'contributions') {
    return {
      title: "Where I've contributed",
      description: `Work experience, organizations, and honors of ${profile.name}.`
    };
  }
  if (slug === 'work') {
    return { title: "What I've built", description: `Selected projects built by ${profile.name}.` };
  }
  if (slug === 'writing') {
    return { title: "What I've written", description: `Essays and technical notes by ${profile.name}.` };
  }
  if (slug === 'beliefs') {
    return { title: 'What I believe', description: `Values and principles ${profile.name} lives by.` };
  }
  if (slug === 'contact') {
    return { title: 'How to reach me', description: `Get in touch with ${profile.name}.` };
  }

  const project = getProjectBySlug(slug);
  if (project) {
    return { title: project.title, description: project.description };
  }

  return { title: 'Not Found' };
}

function BackBar() {
  return (
    <nav aria-label="Page navigation" className="mb-8">
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line-subtle)] bg-[var(--bg)] px-3 py-1.5 font-body text-[13px] font-medium text-[var(--text-secondary)] no-underline transition-all duration-200 hover:border-[var(--line-strong)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-heading)]"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        <span>Home</span>
      </Link>
    </nav>
  );
}

export default async function EntryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* ── 1. Know me better (/about) ── */
  if (slug === 'about') {
    const bio = bioCopy.en;
    return (
      <article className="reading-column">
        <BackBar />
        <header className="mb-8">
          <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
            Who I am
          </h1>
        </header>

        <div className="space-y-4 text-[15.5px] leading-[1.72] text-[var(--text-copy)]">
          {bio.longParagraphs.map((paragraph, index) => (
            <p key={index} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="my-7 grid grid-cols-3 gap-2.5">
          {bio.portraits.map((photo) => (
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
          <h2 className="section-heading">
            Education
          </h2>
          {education.en.map((item) => (
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
          <h2 className="section-heading">
            Focus
          </h2>
          <ul className="square-list space-y-2.5 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
            {expertiseAreas.en.map((area) => (
              <li key={area.title}>
                <strong className="font-semibold text-[var(--text-heading)]">{area.title}:</strong>{' '}
                {area.detail}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-2.5">
          <h2 className="section-heading">
            Toolkit
          </h2>
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

  /* ── 1b. Where I've contributed (/contributions) ── */
  if (slug === 'contributions') {
    const orgList = organizations.en;
    const honorList = honors.en;
    return (
      <article className="reading-column">
        <BackBar />
        <header className="mb-8">
          <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
            Where I&apos;ve contributed
          </h1>
          <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
            Work experience, organizations, and honors — small ways I refuse to sit still and try
            to leave things a little brighter.
          </p>
        </header>

        <figure className="mb-11 rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-subtle)] px-6 py-7 sm:px-8 sm:py-8">
          <blockquote className="font-script text-[25px] leading-[1.48] text-[var(--text-heading)] sm:text-[29px]">
            <p className="text-pretty">
              &ldquo;Do not go gentle into that good night.
              <br className="hidden sm:inline" />{' '}
              Rage, rage against the dying of the light.&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-body text-[11.5px] text-[var(--text-nav)]">
            <span>— Dylan Thomas</span>
            <span className="text-[var(--text-nav)]/70">Do Not Go Gentle into That Good Night</span>
          </figcaption>
        </figure>

        <section className="space-y-5">
          <h2 className="section-heading">
            Experience
          </h2>
          {experiences.en.map((item) => (
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

        {orgList.length > 0 && (
          <section className="mt-10 space-y-5">
            <h2 className="section-heading">
              Organizations &amp; Community
            </h2>
            {orgList.map((item) => (
              <div key={`${item.org}-${item.period}`}>
                <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
                  <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">{item.role}</h3>
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

        {honorList.length > 0 && (
          <section className="mt-10 space-y-4">
            <h2 className="section-heading">
              Honors &amp; Awards
            </h2>
            {honorList.map((item) => (
              <div key={`${item.title}-${item.year}`}>
                <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
                  <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">{item.title}</h3>
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

  /* ── 2. See my work (/work) ── */
  if (slug === 'work') {
    const projects = getPublishedProjects();
    return (
      <article className="reading-column">
        <BackBar />
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
                      className="w-10 md:w-14 inline-block self-start shrink-0 font-body text-xs tabular-nums text-[var(--text-nav)] mt-1.5"
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
                  <span className="shrink-0 self-start font-body text-xs text-[var(--text-nav)] mt-1.5">
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

  /* ── 3. Things I wrote (/writing) ── */
  if (slug === 'writing') {
    const posts = getPublishedBlogPosts();
    return (
      <article className="reading-column">
        <BackBar />
        <header className="mb-8">
          <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
            What I&apos;ve written
          </h1>
          <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
            Longer stories published on Medium and shorter field notes from building things.
          </p>
        </header>

        <section>
          <h2 className="section-heading mb-3">
            Essays on Medium
          </h2>
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
                        className="w-10 md:w-14 inline-block self-start shrink-0 font-body text-xs tabular-nums text-[var(--text-nav)] mt-1.5"
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
                    <span className="shrink-0 self-start font-body text-xs text-[var(--text-nav)] mt-1.5">
                      {post.shortType} ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="section-heading mb-4">
            Short field notes
          </h2>
          <div className="space-y-5">
            {technicalNotes.en.map((item) => (
              <div key={item.title}>
                <h3 className="text-[16.5px] font-semibold text-[var(--text-heading)]">{item.title}</h3>
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

  /* ── 4. Things I believe (/beliefs) ── */
  if (slug === 'beliefs') {
    return (
      <article className="reading-column">
        <BackBar />
        <header className="mb-8">
          <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
            What I believe
          </h1>
          <p className="mt-2 text-[15.5px] leading-[1.7] text-[var(--text-secondary)]">
            Values and principles I try to live and work by. Updated whenever I learn something
            worth keeping.
          </p>
        </header>

        <figure className="mb-11 rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-subtle)] px-6 py-7 sm:px-8 sm:py-8">
          <blockquote className="font-script text-[25px] leading-[1.48] text-[var(--text-heading)] sm:text-[29px]">
            <p className="text-pretty">
              &ldquo;Long live the rose that grew from concrete
              <br className="hidden sm:inline" />{' '}
              when no one else ever cared.&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-body text-[11.5px] text-[var(--text-nav)]">
            <span>— Tupac Shakur</span>
            <span className="text-[var(--text-nav)]/70">The Rose That Grew from Concrete</span>
          </figcaption>
        </figure>

        <div className="space-y-8">
          {beliefsSections.map((section) => (
            <section key={section.heading}>
              <h2 className="section-heading">
                {section.heading}
              </h2>
              <ul className="square-list mt-2.5 space-y-1.5 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    );
  }

  /* ── 5. How to reach me (/contact) ── */
  if (slug === 'contact') {
    const contactOrder = ['GitHub', 'LinkedIn', 'Medium', 'Instagram'] as const;
    const contactSocialLinks = contactOrder
      .map((label) => socialLinks.find((item) => item.label === label))
      .filter((item): item is (typeof socialLinks)[number] => Boolean(item));

    return (
      <article className="reading-column">
        <BackBar />
        <header className="mb-8">
          <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
            How to reach me
          </h1>
          <p className="mt-3 text-[16.5px] leading-[1.72] text-[var(--text-copy)]">
            Have a project in mind, a question about my work, or an opportunity in machine learning
            and software engineering? Feel free to write directly — a short note with a bit of
            context is always welcome.
          </p>
        </header>

        <div className="space-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex flex-col justify-between gap-0.5 no-underline sm:flex-row sm:items-baseline"
          >
            <span className="soft-link text-[16px]">Email</span>
            <span className="font-body text-[13.5px] text-[var(--text-nav)]">{profile.email}</span>
          </a>
          {contactSocialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between gap-0.5 no-underline sm:flex-row sm:items-baseline"
            >
              <span className="soft-link text-[16px]">{link.label}</span>
              <span className="font-body text-[13.5px] text-[var(--text-nav)]">
                {link.handle} ↗
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 font-body text-[13px] text-[var(--text-nav)]">
          Timezone: {profile.timezone}
        </p>
      </article>
    );
  }

  /* ── 6. Project case study (/[slug]) ── */
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
