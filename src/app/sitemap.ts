import type { MetadataRoute } from 'next';
import { contentNavLinks } from '@/content/notes';
import { getPublishedProjects } from '@/lib/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://anwarpage.github.io';
  const home = [{ url: base, lastModified: new Date() }];
  const core = contentNavLinks.map((item) => ({
    url: `${base}/${item.slug}`,
    lastModified: new Date()
  }));
  const projects = getPublishedProjects().map((project) => ({
    url: `${base}/${project.slug}`,
    lastModified: new Date(project.date)
  }));

  return [...home, ...core, ...projects];
}
