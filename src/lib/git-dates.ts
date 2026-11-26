import 'server-only';
import { execFileSync } from 'node:child_process';

export interface LastUpdatedInfo {
  iso: string;
  label: string;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
});

const cache = new Map<string, LastUpdatedInfo | null>();

export function getLastUpdated(paths: readonly string[]): LastUpdatedInfo | null {
  const key = paths.join('|');
  if (cache.has(key)) {
    return cache.get(key) ?? null;
  }

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();

    if (!output) {
      cache.set(key, null);
      return null;
    }

    const parsed = new Date(output);
    if (Number.isNaN(parsed.getTime())) {
      cache.set(key, null);
      return null;
    }

    const info: LastUpdatedInfo = {
      iso: output,
      label: dateFormatter.format(parsed)
    };
    cache.set(key, info);
    return info;
  } catch {
    cache.set(key, null);
    return null;
  }
}
