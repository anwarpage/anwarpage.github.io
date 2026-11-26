import type { Metadata } from 'next';
import { BackBar } from '@/components/back-bar';
import { profile, socialLinks } from '@/content/site';

export const metadata: Metadata = {
  title: 'How to reach me',
  description: `Get in touch with ${profile.name}.`
};

const CONTACT_ORDER = ['GitHub', 'LinkedIn', 'Medium', 'Instagram'] as const;

export default function ContactPage() {
  const contactSocialLinks = CONTACT_ORDER.map((label) =>
    socialLinks.find((item) => item.label === label)
  ).filter((item): item is (typeof socialLinks)[number] => Boolean(item));

  return (
    <article className="reading-column">
      <BackBar />
      <header className="mb-8">
        <h1 className="font-heading text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[38px]">
          How to reach me
        </h1>
        <p className="mt-3 text-[16.5px] leading-[1.72] text-[var(--text-copy)]">
          Have a project in mind, a question about my work, or an opportunity in machine learning
          and software engineering? Feel free to write directly — a short note with a bit of context
          is always welcome.
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
