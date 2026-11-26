import fs from 'node:fs';
import path from 'node:path';

const [, , kind, ...titleParts] = process.argv;
const rawTitle = titleParts.join(' ').trim();

if (!['project', 'post'].includes(kind) || !rawTitle) {
  console.error('Usage:');
  console.error('  npm run new:project -- "Project Title"');
  console.error('  npm run new:post -- "Post Title"');
  process.exit(1);
}

const slug = rawTitle
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error('Could not generate a valid slug from title.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const root = process.cwd();

if (kind === 'project') {
  const mdPath = path.join(root, 'src', 'content', 'projects', `${slug}.md`);
  const assetDir = path.join(root, 'public', 'projects', slug);

  if (fs.existsSync(mdPath)) {
    console.error(`File already exists: ${mdPath}`);
    process.exit(1);
  }

  fs.mkdirSync(assetDir, { recursive: true });

  const template = `---
title: ${rawTitle}
shortTitle: ${rawTitle}
description: One-sentence summary of what this project solves and how it works.
date: ${today}
category: Software Engineering
tags: Tag1, Tag2
projectType: Personal
image: /projects/${slug}/cover.avif
githubUrl: https://github.com/anwarpage/${slug}
techStack: TypeScript, Next.js
draft: true
---

Write a concise overview of **${rawTitle}** here.

## Problem to Solve

- Point 1
- Point 2

## Solution Approach

Explain the architecture and key engineering decisions.
`;

  fs.writeFileSync(mdPath, template, 'utf8');
  console.log(`Created project: src/content/projects/${slug}.md`);
  console.log(`Created asset folder: public/projects/${slug}/`);
  console.log(`Next: drop cover image at public/projects/${slug}/cover.avif, then remove "draft: true" when ready.`);
} else {
  const mdPath = path.join(root, 'src', 'content', 'blog', `${slug}.md`);

  if (fs.existsSync(mdPath)) {
    console.error(`File already exists: ${mdPath}`);
    process.exit(1);
  }

  const template = `---
title: ${rawTitle}
description: Short summary of the essay.
date: ${today}
category: Machine Learning
mediumUrl: https://medium.com/@mkaspulanwar/
draft: true
---

Short excerpt or notes for **${rawTitle}**.
`;

  fs.writeFileSync(mdPath, template, 'utf8');
  console.log(`Created post: src/content/blog/${slug}.md`);
  console.log(`Next: fill in mediumUrl and remove "draft: true" when ready.`);
}
