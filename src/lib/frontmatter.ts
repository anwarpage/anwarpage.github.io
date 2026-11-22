export type ParsedFrontmatter = {
  attributes: Record<string, string>;
  content: string;
};

export function stripQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

const KNOWN_TITLE_ACRONYMS = new Set([
  'sp',
  'mt',
  'st',
  'se',
  'mm',
  'mp',
  'sh',
  'mh',
  'ssi',
  'msi',
  'spd',
  'mpd',
  'skom',
  'mkom',
  'phd',
  'bsc',
  'msc',
  'dr',
  'ir',
  'prof',
  'strkom',
  'mtrkom'
]);

function isSingleAcademicTitle(rawToken: string): boolean {
  const token = rawToken.trim();
  if (!token) return false;

  const normalized = token.replace(/[\s.]/g, '').toLowerCase();
  if (KNOWN_TITLE_ACRONYMS.has(normalized)) return true;

  if (/^(s|m|d|b|dr|prof|ir|sp|str|mtr)[a-z]{1,6}$/i.test(normalized)) {
    if (token.includes('.')) return true;
    if (/^[A-Z]{2,6}$/.test(token)) return true;
  }

  return false;
}

function isAcademicTitle(rawToken: string): boolean {
  const token = rawToken.trim();
  if (!token) return false;
  if (token.includes(' ')) {
    const subTokens = token.split(/\s+/).filter(Boolean);
    if (subTokens.length > 1 && subTokens.every(isSingleAcademicTitle)) {
      return true;
    }
  }
  return isSingleAcademicTitle(token);
}

export function splitRespectingQuotes(input: string): string[] {
  const trimmed = input.trim().replace(/^\[(.*)]$/, '$1');

  let inQuotes = false;
  let quoteChar = '';
  let hasSemicolonOutsideQuotes = false;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if ((ch === '"' || ch === "'") && (i === 0 || trimmed[i - 1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = ch;
      } else if (quoteChar === ch) {
        inQuotes = false;
      }
    } else if (ch === ';' && !inQuotes) {
      hasSemicolonOutsideQuotes = true;
      break;
    }
  }

  const delimiter = hasSemicolonOutsideQuotes ? ';' : ',';
  const tokens: string[] = [];
  let current = '';
  inQuotes = false;
  quoteChar = '';

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if ((ch === '"' || ch === "'") && (i === 0 || trimmed[i - 1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = ch;
      } else if (quoteChar === ch) {
        inQuotes = false;
      }
      current += ch;
    } else if (ch === delimiter && !inQuotes) {
      const item = stripQuotes(current.trim());
      if (item) tokens.push(item);
      current = '';
    } else {
      current += ch;
    }
  }

  const lastItem = stripQuotes(current.trim());
  if (lastItem) tokens.push(lastItem);

  return tokens;
}

export function parseCommaSeparatedList(value: string) {
  const items = splitRespectingQuotes(value);
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function parseTeamList(value: string): string[] {
  const rawTokens = splitRespectingQuotes(value);
  const merged: string[] = [];

  for (const token of rawTokens) {
    if (merged.length > 0 && isAcademicTitle(token.split('|')[0])) {
      merged[merged.length - 1] += `, ${token}`;
    } else {
      merged.push(token);
    }
  }

  const seen = new Set<string>();
  return merged.filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function parseFrontmatter(rawMarkdown: string): ParsedFrontmatter {
  const markdown = rawMarkdown.replace(/^\uFEFF/, '');
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) return { attributes: {}, content: markdown };

  const attributes: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const delimiterIndex = trimmed.indexOf(':');
    if (delimiterIndex < 0) continue;

    const key = trimmed.slice(0, delimiterIndex).trim();
    const value = stripQuotes(trimmed.slice(delimiterIndex + 1).trim());
    if (key && value) attributes[key] = value;
  }

  return { attributes, content: markdown.slice(match[0].length) };
}

export type FrontmatterFieldType = 'string' | 'list' | 'team' | 'boolean';
export type CoercedFrontmatter = Record<string, string | string[] | boolean | undefined>;

export function coerceFrontmatter(
  attributes: Record<string, string>,
  schema: Record<string, FrontmatterFieldType>
): CoercedFrontmatter {
  const result: CoercedFrontmatter = {};

  for (const [key, type] of Object.entries(schema)) {
    const value = attributes[key];
    if (value === undefined) continue;

    if (type === 'list') {
      result[key] = parseCommaSeparatedList(value);
    } else if (type === 'team') {
      result[key] = parseTeamList(value);
    } else if (type === 'boolean') {
      result[key] = !['false', '0', 'no'].includes(value.toLowerCase());
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function sanitizeSafeUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('/')) {
    if (trimmed.startsWith('//') || trimmed.startsWith('/\\')) return null;
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}
