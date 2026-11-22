'use client';

import { useState } from 'react';
import Image from 'next/image';
import { bioCopy } from '@/content/site';

export function BioSwitcher() {
  const [mode, setMode] = useState<'short' | 'long'>('short');
  const copy = bioCopy.en;
  const paragraphs = mode === 'short' ? copy.shortParagraphs : copy.longParagraphs;

  return (
    <section aria-label="Biography" className="mt-6">
      <div className="mb-3 flex items-center justify-between font-sans text-[13px] text-[var(--text-nav)]">
        <span>Bio</span>
        <div className="flex items-center gap-3" role="group" aria-label="Bio length">
          <button
            type="button"
            aria-pressed={mode === 'short'}
            onClick={() => setMode('short')}
            className={`cursor-pointer transition-colors ${
              mode === 'short'
                ? 'text-[var(--text-heading)] underline decoration-[var(--line-strong)] underline-offset-4'
                : 'text-[var(--text-nav)] hover:text-[var(--text-heading)]'
            }`}
          >
            Default
          </button>
          <button
            type="button"
            aria-pressed={mode === 'long'}
            onClick={() => setMode('long')}
            className={`cursor-pointer transition-colors ${
              mode === 'long'
                ? 'text-[var(--text-heading)] underline decoration-[var(--line-strong)] underline-offset-4'
                : 'text-[var(--text-nav)] hover:text-[var(--text-heading)]'
            }`}
          >
            Long
          </button>
        </div>
      </div>

      <div className="space-y-4 text-[16.5px] leading-[1.72] text-[var(--text-copy)]">
        {paragraphs.map((text, index) => (
          <p key={index} className="text-pretty">
            {text}
          </p>
        ))}
      </div>

      {mode === 'long' && (
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {copy.portraits.map((photo) => (
            <div
              key={photo.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--line-subtle)] bg-[var(--surface-subtle)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 30vw, 190px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
