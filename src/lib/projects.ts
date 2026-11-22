import 'server-only';

import {
  coerceFrontmatter,
  sanitizeSafeUrl,
  type CoercedFrontmatter,
  type FrontmatterFieldType
} from '@/lib/frontmatter';
import {
  extractDescription,
  formatMonthYear,
  formatYear,
  loadContent,
  normalizeSlug,
  readContentFiles,
  titleFromFileStem
} from '@/lib/md-content';
import { renderMarkdownToHtml } from '@/lib/markdown';

const PROJECT_SCHEMA = {
  title: 'string',
  description: 'string',
  description_id: 'string',
  date: 'string',
  category: 'string',
  tags: 'list',
  projectType: 'string',
  team: 'team',
  image: 'string',
  liveUrl: 'string',
  githubUrl: 'list',
  techStack: 'list',
  featured: 'boolean',
  institution: 'list',
  institution_id: 'list'
} as const satisfies Record<string, FrontmatterFieldType>;

export type ProjectGithubLink = {
  url: string;
  label: string | null;
};

export type ProjectMember = {
  name: string;
  githubUrl: string | null;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  year: string;
  category: string;
  tags: string[];
  projectType: string;
  team: ProjectMember[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubLinks: ProjectGithubLink[];
  techStack: string[];
  description: string;
  descriptionId: string;
  institution: string[];
  institutionId: string[];
};

export type ProjectDetail = ProjectSummary & {
  contentHtml: string;
};

function asString(value: CoercedFrontmatter[keyof CoercedFrontmatter]) {
  return typeof value === 'string' ? value.trim() : '';
}

function asList(value: CoercedFrontmatter[keyof CoercedFrontmatter]) {
  return Array.isArray(value) ? value.filter((item) => item && item !== '-') : [];
}

function asGithubLinks(value: CoercedFrontmatter[keyof CoercedFrontmatter]): ProjectGithubLink[] {
  return asList(value).flatMap((entry) => {
    const pipeIndex = entry.indexOf('|');
    const rawLabel = pipeIndex >= 0 ? entry.slice(0, pipeIndex).trim() : '';
    const rawUrl = pipeIndex >= 0 ? entry.slice(pipeIndex + 1).trim() : entry;
    const url = sanitizeSafeUrl(rawUrl);
    return url ? [{ url, label: rawLabel || null }] : [];
  });
}

function asTeam(value: CoercedFrontmatter[keyof CoercedFrontmatter]): ProjectMember[] {
  return asList(value).map((entry) => {
    const pipeIndex = entry.indexOf('|');
    if (pipeIndex < 0) return { name: entry.trim(), githubUrl: null };
    return {
      name: entry.slice(0, pipeIndex).trim(),
      githubUrl: sanitizeSafeUrl(entry.slice(pipeIndex + 1))
    };
  });
}

const getAllProjects = loadContent((): ProjectDetail[] =>
  readContentFiles('projects')
    .map((file) => {
      const fm = coerceFrontmatter(file.attributes, PROJECT_SCHEMA);
      const date = asString(fm.date) || '2024-01-01';
      const title = asString(fm.title) || titleFromFileStem(file.slug);
      const description =
        asString(fm.description) ||
        extractDescription(file.body, 'Project notes and implementation details.');
      const institution = asList(fm.institution);
      const rawInstitutionId = asList(fm.institution_id);

      return {
        slug: file.slug,
        title,
        date,
        dateLabel: formatMonthYear(date),
        year: formatYear(date),
        category: asString(fm.category) || 'Software',
        tags: asList(fm.tags),
        projectType: asString(fm.projectType) || 'Personal',
        team: asTeam(fm.team),
        imageUrl: sanitizeSafeUrl(fm.image),
        liveUrl: sanitizeSafeUrl(fm.liveUrl),
        githubLinks: asGithubLinks(fm.githubUrl),
        techStack: asList(fm.techStack),
        description,
        descriptionId: asString(fm.description_id) || description,
        institution,
        institutionId: rawInstitutionId.length > 0 ? rawInstitutionId : institution,
        contentHtml: renderMarkdownToHtml(file.body)
      };
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
);

export function getPublishedProjects(): ProjectSummary[] {
  return getAllProjects().map(({ contentHtml: _omit, ...summary }) => {
    void _omit;
    return summary;
  });
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  const normalized = normalizeSlug(slug);
  return getAllProjects().find((project) => project.slug === normalized) ?? null;
}

export function getAdjacentProjects(slug: string) {
  const all = getPublishedProjects();
  const index = all.findIndex((item) => item.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null
  };
}
