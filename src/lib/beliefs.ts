import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '@/lib/frontmatter';
import type { LastUpdatedInfo } from '@/lib/git-dates';
import { renderMarkdownToHtml } from '@/lib/markdown';
import { formatMonthYear, loadContent } from '@/lib/md-content';

export type BeliefsPageData = {
  title: string;
  description: string;
  updated: LastUpdatedInfo | null;
  quote: string;
  quoteAuthor: string;
  quoteSource: string;
  contentHtml: string;
};

const BELIEFS_FILE = path.join(process.cwd(), 'src', 'content', 'beliefs.md');

function parseUpdated(value?: string): LastUpdatedInfo | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return {
    iso: value,
    label: formatMonthYear(value)
  };
}

export const getBeliefsPage = loadContent((): BeliefsPageData => {
  const raw = fs.readFileSync(BELIEFS_FILE, 'utf8');
  const { attributes, content } = parseFrontmatter(raw);

  return {
    title: attributes.title || 'What I believe',
    description:
      attributes.description ||
      'Values and principles I try to live and work by. Updated whenever I learn something worth keeping.',
    updated: parseUpdated(attributes.updated),
    quote: attributes.quote || '',
    quoteAuthor: attributes.quoteAuthor || '',
    quoteSource: attributes.quoteSource || '',
    contentHtml: renderMarkdownToHtml(content)
  };
});
