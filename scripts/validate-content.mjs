import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const RESERVED_SLUGS = new Set([
  'about',
  'work',
  'writing',
  'beliefs',
  'contributions',
  'contact',
  'sitemap.xml',
  'robots.txt'
]);

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '');
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { attributes: {}, body: normalized };

  const attributes = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf(':');
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed
      .slice(idx + 1)
      .trim()
      .replace(/^["'](.*)["']$/, '$1');
    if (key && val) attributes[key] = val;
  }

  return { attributes, body: normalized.slice(match[0].length) };
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

const errors = [];

function checkLocalAsset(assetPath, sourceFile, fieldLabel) {
  if (!assetPath || !assetPath.startsWith('/')) return;
  const fullPath = path.join(publicDir, assetPath.slice(1));
  if (!fs.existsSync(fullPath)) {
    errors.push(`${sourceFile}: ${fieldLabel} "${assetPath}" does not exist in public/`);
  }
}

function validateCollection(subdir, { checkReservedSlug = false } = {}) {
  const dir = path.join(root, 'src', 'content', subdir);
  if (!fs.existsSync(dir)) return 0;

  const seenSlugs = new Set();
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const rel = `src/content/${subdir}/${file}`;
    const slug = file.replace(/\.md$/i, '').toLowerCase();
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { attributes, body } = parseFrontmatter(raw);

    if (seenSlugs.has(slug)) {
      errors.push(`${rel}: duplicate slug "${slug}"`);
    }
    seenSlugs.add(slug);

    if (checkReservedSlug && RESERVED_SLUGS.has(slug)) {
      errors.push(`${rel}: slug "${slug}" conflicts with a reserved static route`);
    }

    if (!attributes.title) {
      errors.push(`${rel}: missing required frontmatter field "title"`);
    }

    if (!attributes.date) {
      errors.push(`${rel}: missing required frontmatter field "date"`);
    } else if (!isValidIsoDate(attributes.date)) {
      errors.push(`${rel}: invalid date "${attributes.date}" (expected YYYY-MM-DD)`);
    }

    if (attributes.image) {
      checkLocalAsset(attributes.image, rel, 'frontmatter image');
    }

    // Check local markdown image references ![alt](/projects/...)
    for (const match of body.matchAll(/!\[[^\]]*]\((\/[^)\s]+)\)/g)) {
      checkLocalAsset(match[1], rel, 'markdown image');
    }
  }

  return files.length;
}

// Validate beliefs.md
const beliefsPath = path.join(root, 'src', 'content', 'beliefs.md');
if (!fs.existsSync(beliefsPath)) {
  errors.push('src/content/beliefs.md: file is missing');
} else {
  const { attributes } = parseFrontmatter(fs.readFileSync(beliefsPath, 'utf8'));
  if (!attributes.title) {
    errors.push('src/content/beliefs.md: missing required frontmatter field "title"');
  }
  if (attributes.updated && !isValidIsoDate(attributes.updated)) {
    errors.push(`src/content/beliefs.md: invalid updated date "${attributes.updated}" (expected YYYY-MM-DD)`);
  }
}

const projectCount = validateCollection('projects', { checkReservedSlug: true });
const blogCount = validateCollection('blog');

if (errors.length > 0) {
  console.error('Content validation failed:\n');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(`Content OK: ${projectCount} projects, ${blogCount} blog posts, and beliefs.md verified.`);
