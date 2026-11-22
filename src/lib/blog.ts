import 'server-only';

import { coerceFrontmatter, sanitizeSafeUrl, type CoercedFrontmatter } from '@/lib/frontmatter';
import {
  extractDescription,
  formatMonthYear,
  loadContent,
  readContentFiles,
  titleFromFileStem
} from '@/lib/md-content';

const BLOG_SCHEMA = {
  title: 'string',
  description: 'string',
  date: 'string',
  category: 'string',
  mediumUrl: 'string'
} as const;

export type BlogEntry = {
  slug: string;
  title: string;
  dateLabel: string | null;
  category: string;
  description: string;
  mediumUrl: string | null;
};

function asString(value: CoercedFrontmatter[keyof CoercedFrontmatter]) {
  return typeof value === 'string' ? value.trim() : '';
}

const getAllPosts = loadContent((): BlogEntry[] =>
  readContentFiles('blog').map((file) => {
    const fm = coerceFrontmatter(file.attributes, BLOG_SCHEMA);
    const date = asString(fm.date);
    return {
      slug: file.slug,
      title: asString(fm.title) || titleFromFileStem(file.slug),
      dateLabel: date ? formatMonthYear(date) : null,
      category: asString(fm.category) || 'Essay',
      description:
        asString(fm.description) || extractDescription(file.body, 'Read the full essay on Medium.'),
      mediumUrl: sanitizeSafeUrl(fm.mediumUrl)
    };
  })
);

export function getPublishedBlogPosts(): BlogEntry[] {
  return getAllPosts().map((post) => ({ ...post }));
}
