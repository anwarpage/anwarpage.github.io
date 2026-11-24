import 'server-only';

import { coerceFrontmatter, sanitizeSafeUrl, type CoercedFrontmatter } from '@/lib/frontmatter';
import {
  extractDescription,
  formatMonthYear,
  formatYear,
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
  date: string;
  dateLabel: string;
  year: string;
  category: string;
  shortType: string;
  description: string;
  mediumUrl: string | null;
};

function asString(value: CoercedFrontmatter[keyof CoercedFrontmatter]) {
  return typeof value === 'string' ? value.trim() : '';
}

function formatShortBlogType(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('machine learning') || lower.includes('ai')) return 'AI';
  if (lower.includes('cloud')) return 'Cloud';
  if (lower.includes('web')) return 'Web';
  return 'Essay';
}

const getAllPosts = loadContent((): BlogEntry[] =>
  readContentFiles('blog')
    .map((file) => {
      const fm = coerceFrontmatter(file.attributes, BLOG_SCHEMA);
      const date = asString(fm.date) || '2025-01-01';
      const category = asString(fm.category) || 'Essay';
      return {
        slug: file.slug,
        title: asString(fm.title) || titleFromFileStem(file.slug),
        date,
        dateLabel: formatMonthYear(date),
        year: formatYear(date),
        category,
        shortType: formatShortBlogType(category),
        description:
          asString(fm.description) || extractDescription(file.body, 'Read the full essay on Medium.'),
        mediumUrl: sanitizeSafeUrl(fm.mediumUrl)
      };
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
);

export function getPublishedBlogPosts(): BlogEntry[] {
  return getAllPosts().map((post) => ({ ...post }));
}
