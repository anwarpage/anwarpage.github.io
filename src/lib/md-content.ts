import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '@/lib/frontmatter';

export type MdFile = {
  slug: string;
  filePath: string;
  attributes: Record<string, string>;
  body: string;
};

export function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleFromFileStem(fileStem: string) {
  return fileStem
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: 'short',
  year: 'numeric'
});

const YEAR_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  year: 'numeric'
});

export function formatMonthYear(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return MONTH_YEAR_FORMATTER.format(parsed);
}

export function formatYear(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return YEAR_FORMATTER.format(parsed);
}

export function extractDescription(markdownContent: string, fallback: string) {
  const withoutCodeBlocks = markdownContent.replace(/```[\s\S]*?```/g, '');
  const paragraphs = withoutCodeBlocks
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(
      (paragraph) =>
        paragraph &&
        !paragraph.startsWith('#') &&
        !paragraph.startsWith('>') &&
        !paragraph.startsWith('<')
    );

  const firstParagraph = paragraphs[0];
  if (!firstParagraph) return fallback;

  return firstParagraph
    .replace(/!\[([^\]]*)]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function loadContent<T>(load: () => T): () => T {
  let cached: { value: T } | null = null;
  return () => {
    if (process.env.NODE_ENV === 'development') return load();
    cached ??= { value: load() };
    return cached.value;
  };
}

export function readContentFiles(subdirectory: string): MdFile[] {
  const directory = path.join(process.cwd(), 'src', 'content', subdirectory);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => {
      const filePath = path.join(directory, entry.name).replaceAll('\\', '/');
      const rawMarkdown = fs.readFileSync(filePath, 'utf8');
      const { attributes, content } = parseFrontmatter(rawMarkdown);
      const fileStem = entry.name.replace(/\.md$/i, '');

      return {
        slug: normalizeSlug(fileStem) || 'untitled',
        filePath,
        attributes,
        body: content
      };
    });
}
