# Content Guide

All portfolio content is managed directly in VS Code and committed to Git — no external CMS required.

## Structure

- `src/content/projects/<slug>.md` — Project case studies (rendered at `/<slug>`)
- `src/content/blog/<slug>.md` — Writing / Medium essay entries (listed on `/` and `/writing`)
- `src/content/beliefs.md` — Beliefs & principles page (rendered at `/beliefs`)
- `src/content/site.ts` — Structured profile data (bio, experiences, education, toolkit, social links, field notes)
- `public/projects/<slug>/` — All cover images (`cover.avif` / `cover.png`) and diagrams for that project

## Quick Commands

```bash
# Create a new project (.md + public/projects/<slug>/ folder)
npm run new:project -- "Project Name"

# Create a new blog entry
npm run new:post -- "Essay Title"

# Validate TypeScript + frontmatter + local image paths
npm run check
```

## Frontmatter Reference

### Project (`src/content/projects/<slug>.md`)

```yaml
---
title: Full Project Title - Subtitle
shortTitle: Short Name            # Optional: label shown on homepage
description: One-sentence summary.
date: 2026-05-01                  # Required: YYYY-MM-DD
category: Machine Learning        # Machine Learning | Mobile | Website | Software Engineering
tags: Tag 1, Tag 2
projectType: Personal             # Personal | Freelance
image: /projects/<slug>/cover.avif
liveUrl: https://example.com      # Optional
githubUrl: https://github.com/... # Supports multiple: "Label | URL, Label 2 | URL 2"
techStack: Python, PyTorch
draft: true                       # Optional: hidden in production builds, visible in dev
---
```

### Blog (`src/content/blog/<slug>.md`)

```yaml
---
title: Essay Title
description: One-sentence summary.
date: 2026-05-01                  # Required: YYYY-MM-DD
category: Machine Learning
mediumUrl: https://medium.com/@mkaspulanwar/...
draft: true                       # Optional: hidden in production builds
---
```
