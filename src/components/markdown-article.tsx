'use client';

import { useEffect, useRef } from 'react';

export function MarkdownArticle({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>('button[data-copy-code="true"]');
      if (!button) return;

      const block = button.closest('.code-block');
      const code = block?.querySelector('pre code')?.textContent ?? '';
      if (!code) return;

      navigator.clipboard?.writeText(code).then(() => {
        const previous = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => {
          button.textContent = previous || 'Copy';
        }, 1600);
      });
    }

    root.addEventListener('click', handleClick);
    return () => root.removeEventListener('click', handleClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="editorial-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
